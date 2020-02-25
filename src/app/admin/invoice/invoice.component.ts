import { Component, ViewChild, OnInit } from '@angular/core';
import { ClientsService, ClientItemPriceService, InvoiceService, ToastService, ChallanService } from '../../services';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html'
})

export class InvoiceComponent implements OnInit {
  public items: any = [];
  public spinner = false;
  public challanData = {};
  public clientData = {};
  public challans: any = [];
  selectItemForm: FormGroup;
  constructor(public clientService: ClientsService,
    public clientItemPriceService: ClientItemPriceService,
    public challanService: ChallanService,
    private formBuilder: FormBuilder,
    public toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private service: InvoiceService) {
  }
  ngOnInit() {
    this.selectItemForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.spinner = true;
    this.challanService.getAll().subscribe((data: any) => {
      this.challans = data.data;
      this.challans.forEach(element => {
        this.itemsArray.push(this.createItem(element));
      });
      this.spinner = false;
    });

  }
  createItem(data: any): FormGroup {
    return this.formBuilder.group({
      ischecked: false,
      challanId: data.challanId,
    });
  }
  createInvoice() {
    const body = this.selectItemForm.value;
    this.fetchAllChallanData(this.selectItemForm.value);
  }
  get itemsArray() {
    return this.selectItemForm.get('items') as FormArray;
  }
  fetchAllChallanData(data: any) {
    this.spinner = true;
    this.service.create(this.selectItemForm.value).subscribe((challanData: any) => {
      this.items = challanData.data;
      this.toast.success('', 'Your invoice Has been created.');
      this.spinOff();
      this.router.navigate(['/admin/invoice/view']);
    });
  }
  spinOff() {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
}
