import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTooltipModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { InventoryItemsComponent } from './views/inventory-items/inventory-items.component';
import { BasicListComponent } from './components/basic-list/basic-list.component';
import { PaginatedListComponent } from './components/paginated-list/paginated-list.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { IconItemComponent } from './components/icon-item/icon-item.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewInventoryItemComponent } from './views/new-inventory-item/new-inventory-item.component';
import { InventoryTransactionsComponent } from './views/inventory-transactions/inventory-transactions.component';
import { NewInventoryTransactionComponent } from './views/new-inventory-transaction/new-inventory-transaction.component';
import { FinancialUnitsComponent } from './views/financial-units/financial-units.component';
import { NewFinancialUnitComponent } from './views/new-financial-unit/new-financial-unit.component';
import { FinancialAccountsComponent } from './views/financial-accounts/financial-accounts.component';
import { NewFinancialAccountComponent } from './views/new-financial-account/new-financial-account.component';
import { NewFinancialPeriodComponent } from './views/new-financial-period/new-financial-period.component';
import { NewInventoryGroupItemsComponent } from './views/new-inventory-group-items/new-inventory-group-items.component';
import { environment } from 'src/environments/environment';

export const getBaseUrl = () => {
  if (environment.production) {
    console.log(document.getElementsByTagName('base')[0].href);
    return document.getElementsByTagName('base')[0].href;
  } else {
    return 'http://localhost:8080/';
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryItemsComponent,
    BasicListComponent,
    PaginatedListComponent,
    LoadingModalComponent,
    ListItemComponent,
    IconItemComponent,
    NewInventoryItemComponent,
    InventoryTransactionsComponent,
    NewInventoryTransactionComponent,
    FinancialUnitsComponent,
    NewFinancialUnitComponent,
    FinancialAccountsComponent,
    NewFinancialAccountComponent,
    NewFinancialPeriodComponent,
    NewInventoryGroupItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
