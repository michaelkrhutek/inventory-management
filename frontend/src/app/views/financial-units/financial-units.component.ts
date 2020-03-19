import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FinancialUnitService } from 'src/app/services/financial-unit.service';
import { Observable } from 'rxjs';
import { ListItem, IListItem } from 'src/app/models/list-item';
import { map, tap } from 'rxjs/operators';
import { IIconItem } from 'src/app/models/icon-item';

@Component({
  selector: 'app-financial-units',
  templateUrl: './financial-units.component.html',
  styleUrls: ['./financial-units.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialUnitsComponent {

  constructor(
    private financialUnitsService: FinancialUnitService
  ) { }

  isNewFinancialUnitModalOpened: boolean = false;

  isLoadingData: boolean = true;

  openNewFinancialUnitModalIconItem: IIconItem = {
    description: 'New financial unit',
    iconName: 'add',
    action: () => this.openNewFinancialUnitModal()
  };

  financialUnits$: Observable<IFinancialUnit[]> = this.financialUnitsService.getFinancialUnits$().pipe(
    tap(() => (this.isLoadingData = true))
  );

  listItems$: Observable<ListItem[]> = this.financialUnits$.pipe(
    map((financialUnits: IFinancialUnit[]) => financialUnits.map((unit) => this.getListItemFromFinancialUnit(unit))),
    tap(() => (this.isLoadingData = false))
  );

  private getListItemFromFinancialUnit(financialUnit: IFinancialUnit): ListItem {
    const data: IListItem = {
      textItems: [
        { label: 'Name', value: financialUnit.name, width: 12 }
      ]
    };
    return new ListItem(data);
  }

  openNewFinancialUnitModal(): void {
    this.isNewFinancialUnitModalOpened = true;
  }

  closeNewFinancialUnitModal(): void {
    this.isNewFinancialUnitModalOpened = false;
  }
}
