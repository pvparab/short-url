import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArrayName, FormArray } from '@angular/forms';
import { ToastService, appConst, ClientsService, DecorationItemService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-clients-form',
  templateUrl: './clients.form.component.html'
})

export class ClientsFormComponent implements OnInit {

  public item: any;
  public clientsForm: FormGroup;
  public submitted = false;
  public spinner = true;
  public decorationItems: any = [];
  public decorationItemForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public service: ClientsService,
    public decorationItemService: DecorationItemService,
    public toast: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.clientsForm = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      contactPerson: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.maxLength(10)]),
      contactEmail: new FormControl('', [Validators.required, Validators.email]),
      contactWhatsappNo: new FormControl(''),
      contactRole: new FormControl(''),
      officeAddress: new FormControl(''),
      officePersonName: new FormControl('', [Validators.required]),
      officePhone: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.maxLength(10)]),
      officeEmail: new FormControl('', [Validators.required, Validators.email]),
      officeFax: new FormControl(''),
      officeWhatsappNo: new FormControl(''),
      profileUrl: new FormControl(''),
      gstNo: new FormControl('', [Validators.required]),
      panNo: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      contractEndDate: new FormControl('', [Validators.required]),
      contractStartDate: new FormControl('', [Validators.required]),
      websiteUrl: new FormControl(''),
      bankName: new FormControl(''),
      bankAccountNo: new FormControl(''),
      bankAccountName: new FormControl(''),
      bankIfsc: new FormControl(''),
      bankMicr: new FormControl(''),
      itemsCost: this.formBuilder.array([])
    });
    this.decorationItemService.getAllEntity().subscribe((decorationItem: any) => {
      decorationItem.data.forEach(element => {
        this.itemsArray.push(this.createItem(element));
      });
      this.decorationItems = decorationItem.data;
    });

  }
  createItem(data: any): FormGroup {
    return this.formBuilder.group({
      fdecorationItemsId: data.decorationItemsId,
      fclientsId: '',
      clientPrice: data.price
    });
  }
  get itemsArray() {
    return this.clientsForm.get('itemsCost') as FormArray;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getOne(id).subscribe((data: any) => {
        this.item = data.item;
        this.clientsForm.patchValue(this.item);
        this.spinOff();
      });
    } else {
      this.spinOff();
    }
  }
  get form() { return this.clientsForm.controls; }
  spinOff() {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
  getError(field) {
    return this.errorText(this.clientsForm.get(field));
  }

  errorText(control: AbstractControl) {
    if (!control.errors || !this.submitted) {
      return '';
    }
    if (control.hasError('required')) {
      return appConst.errorsMsg.requiredError;
    }
    if (control.hasError('minlength')) {
      return 'Enter password minimum length of 10 and max of 12 characters';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
  }
  updateItem() {
    this.submitted = true;
    if (!this.clientsForm.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.update(this.clientsForm.value, this.item).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('You are now registered', 'welcome to club');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/clients']);
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  addItem() {
    this.submitted = true;
    if (!this.clientsForm.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.create(this.clientsForm.value).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('New clients has been created');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/clients']);
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
}
