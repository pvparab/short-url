import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastService, appConst, CommonURL, GalleryService, ClientsService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-gallery-image-form',
  templateUrl: './gallery.images.form.component.html'
})

export class GalleryImagesFormComponent implements OnInit {

  public item: any;
  public galleryImageForm: FormGroup;
  public submitted = false;
  public tempClientData: any;
  public imageUrl: any;
  public commonURL = new CommonURL();
  public spinner = true;
  public clientData: any;
  public searchText = '';
  public keyword = 'clientName';
  constructor(private route: ActivatedRoute,
    private router: Router,
    public service: GalleryService,
    public clientService: ClientsService,
    public toast: ToastService) {
    this.galleryImageForm = new FormGroup({
      galleryImagesId: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(''),
      fclientsId: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getAll().subscribe((clientData: any) => {
      this.clientData = clientData.data;
      if (id) {
        this.service.getOne(id).subscribe((data: any) => {
          this.spinOff();
          this.tempClientData = this.item.clientsId;
          this.item = data.item;
          this.item.fclientsId = this.item.clientsId.clientName;
          this.galleryImageForm.patchValue(this.item);
        }, (err) => {
          this.spinOff();
        });
      } else {
        this.spinOff();
      }
    });
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
    return this.errorText(this.galleryImageForm.get(fieldName));
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
    if (!this.galleryImageForm.valid || this.imageUrl == '') {
      this.toast.error('Validation Error', 'Please enter all data and Upload an image');
      return;
    }
    const formData = this.galleryImageForm.value;
    formData.itemUrl = this.imageUrl;
    this.service.update(this.galleryImageForm.value, this.item).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('Data has been updated successfully', 'welcome to club');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/gallery/images']);
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  addItem() {
    this.submitted = true;
    this.galleryImageForm.patchValue({ imageUrl: this.imageUrl });
    if (!this.galleryImageForm.valid || this.imageUrl == '') {
      this.toast.error('Validation Error', 'Please enter all data and Upload an image');
      return;
    }
    const formData = this.galleryImageForm.value;
    formData.fclientsId = formData.fclientsId.clientsId;
    this.service.create(formData).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('Data has been recorded successfully', 'welcome to club');
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
      this.router.navigate(['/admin/gallery/images']);
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  handleImageUpload(data) {
    this.spinner = true;
    this.imageUrl = this.commonURL.apiURL + 'upload/' + data;
    this.spinOff();
  }
  handleImageError(data) {
    console.log(data);
  }
  copytoclipboard() {
    this.toast.success('Copied to clipboard', '');
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
