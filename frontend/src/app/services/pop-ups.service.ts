import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpsService {

  constructor() { }

  handleApiError(err: any): void {
    console.log(err);
  }
}
