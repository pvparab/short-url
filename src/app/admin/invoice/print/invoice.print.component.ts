import { Component, OnInit } from '@angular/core';
import { ClientsService, ToastService, InvoiceService, } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice.print.component.html',
  styleUrls: ['./invoice.print.component.css']
})

export class InvoicePrintComponent implements OnInit {
  public items: any;
  public invoiceid;
  public totalCost = 0;
  public spinner = false;
  public invoiceData: any;
  public clientData: any;
  public ghostRow = [];
  constructor(public clientService: ClientsService,
    public toast: ToastService,
    private route: ActivatedRoute,
    private service: InvoiceService) {
  }
  ngOnInit() {
    this.invoiceid = this.route.snapshot.paramMap.get('id');
    if (this.invoiceid) {
      this.service.getAllChallanInvoice(this.invoiceid).subscribe((data: any) => {
        this.items = data.items;
        this.clientData = data.data[0].clientsId;
        this.invoiceData =  data.items[0].invoices;
        this.items.forEach(item => {
          item.items = [];
          data.data.forEach(element => {
            if (element.fchallanId === item.challanId) {
              item.items.push(element);
            }
          });
        });
        data.data.forEach(element => {
          element.total = (+element.clientPrice) * (+element.quantity);
          this.totalCost = this.totalCost + element.total;
        });
        console.log(this.items);
        const length = 24 - this.items.length;
        if (length > 0) {
          this.ghostRow = new Array(length);
          this.ghostRow.forEach(element => {
            this.ghostRow.push({ default: true });
          });
        }
        this.spinOff();
      });
    } else {
      this.spinOff();
    }
  }
  spinOff() {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
}
