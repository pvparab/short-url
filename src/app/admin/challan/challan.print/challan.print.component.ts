import { Component, ViewChild, OnInit } from '@angular/core';
import { ClientsService, ClientItemPriceService, ToastService, ChallanService } from '../../../services';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challan-print',
  templateUrl: './challan.print.component.html',
  styleUrls: ['./challan.print.component.css']
})

export class ChallanPrintComponent implements OnInit {
  public items: any;
  public spinner = false;
  public challanData: any;
  public clientData: any;
  public ghostRow = [];
  constructor(public clientService: ClientsService,
    public clientItemPriceService: ClientItemPriceService,
    private formBuilder: FormBuilder,
    public toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private service: ChallanService) {
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getChallanItem(id).subscribe((data: any) => {
        this.items = data.data;
        const length = 25 - this.items.length;
        if (length > 0) {
          this.ghostRow = new Array(length);
          this.ghostRow.forEach(element => {
            this.ghostRow.push({ default: true });
          });
        }

        this.challanData = this.items[0].challanId;
        this.clientData = this.items[0].clientsId;
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
