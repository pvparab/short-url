import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService, ToastService, appConst } from '../../../services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin.user.form.component.html'
})

export class AdminUserFormComponent implements OnInit {

  public user: any;
  public registerInfo: FormGroup;
  public submitted = false;
  public spinner = true;
  constructor(private route: ActivatedRoute,
    private router: Router, public service: UserService, public toast: ToastService) {
    this.registerInfo = new FormGroup({
      first: new FormControl('', [Validators.required]),
      middle: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      password: new FormControl(''),
    });

  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getUser(id).subscribe((data: any) => {
        this.user = data.user;
        this.registerInfo.patchValue(this.user);
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
  get firstError() {
    return this.errorText(this.registerInfo.get('first'));
  }
  get middleError() {
    return this.errorText(this.registerInfo.get('middle'));
  }
  get lastError() {
    return this.errorText(this.registerInfo.get('last'));
  }
  get emailError() {
    return this.errorText(this.registerInfo.get('email'));
  }
  get phoneError() {
    return this.errorText(this.registerInfo.get('phone'));
  }
  get passwordError() {
    return this.errorText(this.registerInfo.get('password'));
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
  updateUser() {
    this.submitted = true;
    if (!this.registerInfo.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.updateUser(this.registerInfo.value, this.user).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('You are now registered', 'welcome to club');
        this.router.navigate(['/admin/user']);
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
  addUser() {
    this.submitted = true;
    if (!this.registerInfo.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.register(this.registerInfo.value).subscribe((data: any) => {
      if (data.success) {
        this.toast.success('New User has been registered');
        this.router.navigate(['/admin/user']);
      } else {
        this.toast.error(data.error, 'Error Occured');
      }
    }, (err) => {
      this.toast.error('Error', 'Something went wrong');
    });
  }
}
