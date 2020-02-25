import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastService, appConst, DecorationItemService, CommonURL } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './decoration.items.form.component.html'
})

export class DecorationItemsFormComponent implements OnInit {

  public item: any;
  public decorationItemForm: FormGroup;
  public submitted = false;
  public imageUrl: any;
  public commonURL = new CommonURL();
  public spinner = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public service: DecorationItemService,
    public toast: ToastService) {
    this.decorationItemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      qty: new FormControl('', [Validators.required]),
    });

  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getEntity(id).subscribe((data: any) => {
        this.item = data.item;
        this.decorationItemForm.patchValue(this.item);
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

  getError(fieldName: string) {
    if (typeof (fieldName) !== 'string') {
      return '';
    }
    return this.errorText(this.decorationItemForm.get(fieldName));
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
    if (!this.decorationItemForm.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    const formData = this.decorationItemForm.value;
    formData.itemUrl = this.imageUrl;
    this.service.updateEntity(this.decorationItemForm.value, this.item).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('You are now registered', 'welcome to club');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/decoration/item']);
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  addItem() {
    this.submitted = true;
    if (!this.decorationItemForm.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    const formData = this.decorationItemForm.value;
    formData.itemUrl = this.imageUrl;
    this.service.createEntity(formData).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('New User has been registered');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/decoration/item']);
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  handleImageUpload(data) {
    console.log(data);
    this.imageUrl = this.commonURL.apiURL + 'upload/' + data;
  }
  handleImageError(data) {
    console.log(data);
  }
}
