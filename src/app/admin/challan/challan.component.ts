import { Component, ViewChild, OnInit } from '@angular/core';
import { ClientsService, ChallanService, ToastService, appConst, ClientItemPriceService } from '../../services';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html'
})

export class ChallanComponent implements OnInit {
  @ViewChild('decorationItemsRef') decorationItemsRef;
  public clients: any;
  public clientId = '';
  public description = '';
  public decorationItems = [];
  public challanForm: FormGroup;
  public keyword = 'sitemName';
  public spinner = false;
  public selectItemForm: FormGroup;
  public tdecorationItems: any = [];
  constructor(public clientService: ClientsService,
    public clientItemPriceService: ClientItemPriceService,
    private formBuilder: FormBuilder,
    public toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private challanService: ChallanService) {
    clientService.getAll().subscribe((clients: any) => {
      this.clients = clients.data;
    });
  }
  ngOnInit() {
    this.challanForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.selectItemForm = this.formBuilder.group({
      currentItem: this.formBuilder.control('')
    });
  }
  createItem(data: any): FormGroup {
    console.log(this.clientId);
    return this.formBuilder.group({
      fdecorationItemsId: this.formBuilder.control(data.fdecorationItemsId, Validators.required),
      fclientsId: this.formBuilder.control(data.fclientsId, Validators.required),
      clientPrice: this.formBuilder.control(data.clientPrice, Validators.required),
      quantity: this.formBuilder.control(1, Validators.required),
      currentData: data
    });
  }
  get itemsArray() {
    return this.challanForm.get('items') as FormArray;
  }
  clientOnChange() {
    this.clientItemPriceService.getAllEntityByClient(this.clientId).subscribe((decorationItem: any) => {
      this.decorationItems = decorationItem.data;
      this.decorationItems.forEach(element => {
        element.sdecorationItemsId = element.decorationItemsId.decorationItemsId;
        element.sdescription = element.decorationItemsId.description;
        element.sitemName = element.decorationItemsId.itemName;
        element.sitemUrl = element.decorationItemsId.itemUrl;
        element.sprice = element.decorationItemsId.price;
        element.sqty = element.decorationItemsId.qty;
      });
    });
  }
  createChallan() {
    this.spinner = true;
    console.log(this.challanForm.value);
    if (this.clientId === '' || this.description === '' || this.challanForm.invalid || this.challanForm.value.items.length === 0) {
      this.toast.error('Please enter  description, clientid and all data', 'Error Occured');
      this.spinOff();
      return false;
    }
    const sendBody: any = this.challanForm.value;
    sendBody.clientId = this.clientId;
    sendBody.description = this.description;
    this.challanService.create(sendBody).subscribe((data: any) => {
      this.spinOff();
      if (data.success) {
        this.toast.success('You are now registered', 'welcome to club');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/challan/view']);
    });
  }
  spinOff() {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
  addInventory() {
    if (this.selectItemForm.value.currentItem) {
      this.tdecorationItems.push(this.selectItemForm.value.currentItem);
      this.itemsArray.push(this.createItem(this.selectItemForm.value.currentItem));
      this.decorationItemsRef.clear();
    } else {
      this.toast.error('Please Select Item from the list ', 'Error Occured');
    }
  }
  removeItem(data, index) {
    this.itemsArray.removeAt(index);
    this.tdecorationItems.splice(index);
  }
  selectEvent(item) {
    // do something with selected item
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e) {
    // do something when input is focused
  }
}
