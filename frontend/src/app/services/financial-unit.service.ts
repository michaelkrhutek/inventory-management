import { Injectable, Inject } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, filter, finalize } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PopUpsService } from './pop-ups.service';
import { SnackbarType } from '../models/snackbar-data';

@Injectable({
  providedIn: 'root'
})
export class FinancialUnitService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private popUpsService: PopUpsService
  ) { }

  private reloadFinancialUnitsSource: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  reloadFinancialUnits$: Observable<void> = this.reloadFinancialUnitsSource.asObservable();

  getFinancialUnits$(): Observable<IFinancialUnit[]> {
    return this.http.get<IFinancialUnit[]>(`${this.baseUrl}api/financialunit/getallfinancialunits`).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getFinancialUnit$(id: string): Observable<IFinancialUnit> {
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.get<IFinancialUnit[]>(`${this.baseUrl}api/financialunit/getfinancialunit`, { params }).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  createFinancialUnit(name: string): void {
    this.popUpsService.openLoadingModal({ message: 'Creating a financial unit' });
    const params: HttpParams = new HttpParams().append('name', name);
    this.http.post<any>(`${this.baseUrl}api/financialunit/createfinancialunit`, null, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of(null);
      }),
      filter((res) => !!res),
      finalize(() => this.popUpsService.closeLoadingModal())
    ).subscribe(() => {
      this.popUpsService.showSnackbar({ message: 'Financial unit was created', type: SnackbarType.Success });
      this.reloadFinancialUnitsSource.next();
    });
  }
}
