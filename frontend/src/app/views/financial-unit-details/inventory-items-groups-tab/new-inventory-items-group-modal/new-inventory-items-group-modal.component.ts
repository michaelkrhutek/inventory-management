import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FinancialUnitDetailsService } from 'src/app/services/financial-unit-details.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-inventory-items-group-modal',
  templateUrl: './new-inventory-items-group-modal.component.html',
  styleUrls: ['./new-inventory-items-group-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInventoryItemsGroupModalComponent {

  constructor(
    private financialUnitDetailsService: FinancialUnitDetailsService
  ) { }

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  nameFC: FormControl = new FormControl(null);
  
  isCreateButtonDisabled$: Observable<boolean> = this.nameFC.valueChanges.pipe(
    startWith(this.nameFC.value),
    map((name: string) => !name)
  );

  createInventoryItemsGroup(): void {
    const name: string = this.nameFC.value;
    this.financialUnitDetailsService.createInventoryItemsGroup(name);
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }

}
