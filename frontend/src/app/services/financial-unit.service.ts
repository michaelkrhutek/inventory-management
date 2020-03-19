import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PopUpsService } from './pop-ups.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialUnitService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private popUpsService: PopUpsService
  ) { }

  getFinancialUnits$(): Observable<IFinancialUnit[]> {
    return this.http.get<IFinancialUnit[]>(`${this.baseUrl}financialunit/getallfinancialunits`).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  createFinancialUnit(name: string): void {
    const params: HttpParams = new HttpParams().append('name', name);
    this.http.post<any>(`${this.baseUrl}financialunit/createfinancialunit`, null, { params }).pipe(
      catchError((err) => {
        this.popUpsService.handleApiError(err);
        return of(null);
      }),
      filter((res) => !!res)
    ).subscribe();
  }
}
