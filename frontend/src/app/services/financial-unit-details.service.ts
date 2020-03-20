import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { FinancialAccount, IFinancialAccount } from '../models/financial-account';
import { switchMap, catchError, map, filter, finalize, shareReplay, share, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PopUpsService } from './pop-ups.service';
import { IFinancialPeriod, FinancialPeriod } from '../models/financial-period';
import { FinancialAccountType } from '../../../../interfaces/financial-account-type';
import { SnackbarType } from '../models/snackbar-data';
import { InventoryItemsGroup, IInventoryItemsGroup } from '../models/inventory-items-group';
import { InventoryItem, IInventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class FinancialUnitDetailsService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private popUpsService: PopUpsService
  ) { }

  /*
  Financial unit
  */

  private financialUnitSource: BehaviorSubject<IFinancialUnit> = new BehaviorSubject<IFinancialUnit>(null);
  financialUnit$: Observable<IFinancialUnit> = this.financialUnitSource.asObservable().pipe(
    shareReplay(1)
  );
  financialUnitId$: Observable<string> = this.financialUnit$.pipe(
    map((financialUnit: IFinancialUnit) => financialUnit ? financialUnit._id : null),
    shareReplay(1)
  );

  getFinancialUnitId(): string {
    const financialUnit: IFinancialUnit = this.financialUnitSource.getValue();
    return financialUnit ? financialUnit._id : null;
  }

  setFinancialUnit(financialUnit: IFinancialUnit): void {
    this.financialUnitSource.next(financialUnit);
  }

  /*
  Financial accounts
  */

  reloadFinancialAccountsSource: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  reloadFinancialAccounts$: Observable<void> = this.reloadFinancialAccountsSource.asObservable();

  financialAccounts$: Observable<FinancialAccount[]> = combineLatest(this.financialUnitId$, this.reloadFinancialAccounts$).pipe(
    switchMap(([financialUnitId]) => financialUnitId ? this.getFinancialAccounts$(financialUnitId) : of([])),
    shareReplay(1)
  );

  getFinancialAccounts$(financialUnitId: string): Observable<FinancialAccount[]> {
    const params: HttpParams = new HttpParams().append('financialUnitId', financialUnitId);
    return this.http.get<IFinancialAccount[]>(`${this.baseUrl}api/financialaccount/getallfinancialaccounts`, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of([]);
      }),
      map((accounts: IFinancialAccount[]) => accounts.map(account => new FinancialAccount(account))),
      tap(v => console.log(v))
    );
  }

  createFinancialAccount(name: string, code: string, type: FinancialAccountType): void {
    const financialUnitId: string = this.getFinancialUnitId();
    if (!financialUnitId) {
      return null;
    }
    this.popUpsService.openLoadingModal({ message: 'Creating a financial account' });
    const params: HttpParams = new HttpParams()
      .append('name', name)
      .append('code', code)
      .append('accountType', type)
      .append('financialUnitId', financialUnitId)
    this.http.post<any>(`${this.baseUrl}api/financialaccount/createfinancialaccount`, null, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of(null);
      }),
      filter((res: any) => !!res),
      finalize(() => this.popUpsService.closeLoadingModal())
    ).subscribe(() => {
      this.popUpsService.showSnackbar({ message: 'Financial account was created', type: SnackbarType.Success });
      this.reloadFinancialAccountsSource.next();
    });
  }

  /*
  Financial periods
  */

  reloadFinancialPeriodsSource: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  reloadFinancialPeriods$: Observable<void> = this.reloadFinancialPeriodsSource.asObservable().pipe(
    shareReplay(1)
  );

  financialPeriods$: Observable<FinancialPeriod[]> = combineLatest(this.financialUnitId$, this.reloadFinancialPeriods$).pipe(
    switchMap(([financialUnitId]) => financialUnitId ? this.getFinancialPeriods$(financialUnitId) : of([])),
    shareReplay(1)
  );

  getFinancialPeriods$(financialUnitId: string): Observable<FinancialPeriod[]> {
    const params: HttpParams = new HttpParams().append('financialUnitId', financialUnitId);
    return this.http.get<IFinancialPeriod[]>(`${this.baseUrl}api/financialperiod/getallfinancialperiods`, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of([]);
      }),
      map((financialPeriods: IFinancialPeriod[]) => {
        const unsortedFinancialPeriods: IFinancialPeriod[] = financialPeriods.map(financialPeriod => new FinancialPeriod(financialPeriod));
        return unsortedFinancialPeriods.sort((a, b) => a.startDate.getMilliseconds() - b.startDate.getMilliseconds());
      })
    );
  }

  createFinancialPeriod(startDate: Date, endDate: Date): void {
    const financialUnitId: string = this.getFinancialUnitId();
    if (!financialUnitId) {
      return null;
    }
    this.popUpsService.openLoadingModal({ message: 'Creating a financial period' });
    const params: HttpParams = new HttpParams()
      .append('startDate', startDate.toDateString())
      .append('endDate', endDate.toDateString())
      .append('financialUnitId', financialUnitId)
    this.http.post<any>(`${this.baseUrl}api/financialperiod/createfinancialperiod`, null, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of(null);
      }),
      filter((res: any) => !!res),
      finalize(() => this.popUpsService.closeLoadingModal())
    ).subscribe(() => {
      this.popUpsService.showSnackbar({ message: 'Financial period was created', type: SnackbarType.Success });
      this.reloadFinancialPeriodsSource.next();
    });
  }

  /*
  Inventory items groups
  */

  reloadInventoryItemsGroupsSource: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  reloadInventoryItemsGroups$: Observable<void> = this.reloadInventoryItemsGroupsSource.asObservable();

  inventoryItemsGroups$: Observable<InventoryItemsGroup[]> = combineLatest(this.financialUnitId$, this.reloadInventoryItemsGroups$).pipe(
    switchMap(([financialUnitId]) => financialUnitId ? this.getInventoryItemsGroups$(financialUnitId) : of([])),
    shareReplay(1)
  );

  getInventoryItemsGroups$(financialUnitId: string): Observable<InventoryItemsGroup[]> {
    const params: HttpParams = new HttpParams().append('financialUnitId', financialUnitId);
    return this.http.get<IInventoryItemsGroup[]>(`${this.baseUrl}api/inventoryitemsgroup/getallinventoryitemsgroups`, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of([]);
      }),
      map((groups: IInventoryItemsGroup[]) => groups.map(group => new InventoryItemsGroup(group))),
      tap(v => console.log(v))
    );
  }

  getInventoryItemGroupName$(groupId: string): Observable<string> {
    return this.inventoryItemsGroups$.pipe(
      map((groups: InventoryItemsGroup[]) => {
        const group: InventoryItemsGroup = groups.find(group => group._id == groupId);
        return group ? group.name : 'N/A';
      })
    );
  }

  createInventoryItemsGroup(name: string): void {
    const financialUnitId: string = this.getFinancialUnitId();
    if (!financialUnitId) {
      return null;
    }
    this.popUpsService.openLoadingModal({ message: 'Creating an inventory items group' });
    const params: HttpParams = new HttpParams()
      .append('name', name)
      .append('financialUnitId', financialUnitId)
    this.http.post<any>(`${this.baseUrl}api/inventoryitemsgroup/createinventoryitemsgroup`, null, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of(null);
      }),
      filter((res: any) => !!res),
      finalize(() => this.popUpsService.closeLoadingModal())
    ).subscribe(() => {
      this.popUpsService.showSnackbar({ message: 'Inventory items group was created', type: SnackbarType.Success });
      this.reloadInventoryItemsGroupsSource.next();
    });
  }

  /*
 Inventory items groups
 */

  reloadInventoryItemsSource: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  reloadInventoryItems$: Observable<void> = this.reloadInventoryItemsSource.asObservable();

  inventoryItems$: Observable<InventoryItem[]> = combineLatest(this.financialUnitId$, this.reloadInventoryItems$).pipe(
    switchMap(([financialUnitId]) => financialUnitId ? this.getInventoryItems$(financialUnitId) : of([])),
    shareReplay(1)
  );

  getInventoryItems$(financialUnitId: string): Observable<InventoryItem[]> {
    const params: HttpParams = new HttpParams().append('financialUnitId', financialUnitId);
    return this.http.get<IInventoryItem[]>(`${this.baseUrl}api/inventoryitem/getallinventoryitems`, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of([]);
      }),
      map((groups: IInventoryItem[]) => groups.map(group => new InventoryItem(group))),
      tap(v => console.log(v))
    );
  }

  createInventoryItem(name: string): void {
    const financialUnitId: string = this.getFinancialUnitId();
    if (!financialUnitId) {
      return null;
    }
    this.popUpsService.openLoadingModal({ message: 'Creating an inventory items group' });
    const params: HttpParams = new HttpParams()
      .append('name', name)
      .append('financialUnitId', financialUnitId)
    this.http.post<any>(`${this.baseUrl}api/inventoryitem/createinventoryitem`, null, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of(null);
      }),
      filter((res: any) => !!res),
      finalize(() => this.popUpsService.closeLoadingModal())
    ).subscribe(() => {
      this.popUpsService.showSnackbar({ message: 'Inventory items group was created', type: SnackbarType.Success });
      this.reloadInventoryItemsSource.next();
    });
  }
}
