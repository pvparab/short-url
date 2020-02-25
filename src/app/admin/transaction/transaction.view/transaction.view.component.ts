import { Component, ViewChild } from '@angular/core';
import { ChallanService } from '../../../services';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction.view.component.html'
})

export class TransactionViewComponent {
  public challans: any = [];
  public spinner = false;
  constructor(private challanService: ChallanService) {
    this.challanService.getAll().subscribe((challans: any) => {
      console.log(challans);
      this.challans = challans.data;
    });
  }
}
