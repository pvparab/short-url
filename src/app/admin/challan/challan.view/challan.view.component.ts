import { Component, ViewChild } from '@angular/core';
import { ChallanService } from '../../../services';

@Component({
  selector: 'app-challan-view',
  templateUrl: './challan.view.component.html'
})

export class ChallanViewComponent {
  public challans: any = [];
  public spinner = false;
  constructor(private challanService: ChallanService) {
    this.challanService.getAll().subscribe((challans: any) => {
      console.log(challans);
      this.challans = challans.data;
    });
  }
}
