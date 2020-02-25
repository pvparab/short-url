import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastService, appConst, EmployeeService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-employee-form',
  templateUrl: './employee.form.component.html'
})

export class EmployeeFormComponent implements OnInit {

  public item: any;
  public employeeForm: FormGroup;
  public submitted = false;
  public spinner = true;
  constructor(private route: ActivatedRoute,
    private router: Router, public service: EmployeeService, public toast: ToastService) {
    this.employeeForm = new FormGroup({
      first: new FormControl('', [Validators.required]),
      middle: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      profileUrl: new FormControl('', [Validators.required]),
      aadharNo: new FormControl('', [Validators.required]),
      aadharNoPhotoFront: new FormControl('', [Validators.required]),
      aadharNoPhotoBack: new FormControl('', [Validators.required]),
      panNo: new FormControl('', [Validators.required]),
      panNoPhotoFront: new FormControl('', [Validators.required]),
      panNoPhotoBack: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      bankAccountNo: new FormControl('', [Validators.required]),
      bankAccountName: new FormControl('', [Validators.required]),
      bankIfsc: new FormControl('', [Validators.required]),
      bankMicr: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getOne(id).subscribe((data: any) => {
        this.item = data.item;
        this.employeeForm.patchValue(this.item);
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
  getError(field) {
    return this.errorText(this.employeeForm.get(field));
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
    if (!this.employeeForm.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.update(this.employeeForm.value, this.item).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('You are now registered', 'welcome to club');
        this.router.navigate(['/admin/employee']);
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  addItem() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.create(this.employeeForm.value).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('New User has been registered');
        this.router.navigate(['/admin/employee']);
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
}
