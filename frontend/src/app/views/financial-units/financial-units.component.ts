import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FinancialUnitService } from 'src/app/services/financial-unit.service';
import { Observable } from 'rxjs';
import { ListItem, IListItem } from 'src/app/models/list-item';
import { map, tap, switchMap } from 'rxjs/operators';
import { IIconItem } from 'src/app/models/icon-item';
import { PopUpsService } from 'src/app/services/pop-ups.service';
import { SnackbarType } from 'src/app/models/snackbar-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-units',
  templateUrl: './financial-units.component.html',
  styleUrls: ['./financial-units.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialUnitsComponent {

  constructor(
    private financialUnitsService: FinancialUnitService,
    private popUpsService: PopUpsService,
    private router: Router
  ) { }

  isNewFinancialUnitModalOpened: boolean = false;

  isLoadingData: boolean = true;

  openNewFinancialUnitModalIconItem: IIconItem = {
    description: 'New financial unit',
    iconName: 'add',
    action: () => this.openNewFinancialUnitModal()
  };

  financialUnits$: Observable<IFinancialUnit[]> = this.financialUnitsService.reloadFinancialUnits$.pipe(
    tap(() => (this.isLoadingData = true)),
    switchMap(() => this.financialUnitsService.getFinancialUnits$())
  );

  listItems$: Observable<ListItem[]> = this.financialUnits$.pipe(
    map((financialUnits: IFinancialUnit[]) => financialUnits.map((unit) => this.getListItemFromFinancialUnit(unit))),
    tap(() => (this.isLoadingData = false))
  );

  private getListItemFromFinancialUnit(financialUnit: IFinancialUnit): ListItem {
    const data: IListItem = {
      textItems: [
        { label: 'Name', value: financialUnit.name, width: 12 }
      ],
      iconItemsEnd: [
        {
          iconName: 'launch',
          description: 'Open',
          action: () => {
            console.log(financialUnit._id);
            this.popUpsService.openLoadingModal({ message: 'Opening a financial unit' });
            this.router.navigate(['financial-unit', financialUnit._id]).finally(() => this.popUpsService.closeLoadingModal())
          }
        }
      ],
      iconItemsEndContainerWidth: 2
    };
    return new ListItem(data);
  }

  openNewFinancialUnitModal(): void {
    this.isNewFinancialUnitModalOpened = true;
  }

  closeNewFinancialUnitModal(): void {
    this.isNewFinancialUnitModalOpened = false;
  }

  showSnackbar(): void {
    this.popUpsService.showSnackbar({ message: 'Snackbar works', type: SnackbarType.Success });
  }
}
