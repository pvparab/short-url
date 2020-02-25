import { Component, ViewChild } from '@angular/core';
import { InvoiceService } from '../../../services';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice.view.component.html'
})

export class InvoiceViewComponent {
  public invoices: any = [];
  spinner = false;
  constructor(private service: InvoiceService) {
    this.service.getAll().subscribe((invoices: any) => {
      this.invoices = invoices.data;
    });
  }
}
