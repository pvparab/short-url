import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService, ToastService, appConst } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  registerInfo: FormGroup;
  submitted = false;
  constructor(public service: UserService, public toast: ToastService, public router: Router) {
    this.registerInfo = new FormGroup({
      first: new FormControl('', [Validators.required]),
      middle: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    });
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
      return 'Enter password minimum length of 7 and max of 20 characters';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
  }
  submit() {
    this.submitted = true;
    if (!this.registerInfo.valid) {
      this.toast.error('Validation Error', 'Please enter correct details');
      return;
    }
    this.service.register(this.registerInfo.value).subscribe((data: any) => {
      if (data.success) {
        this.registerInfo.reset();
        this.router.navigate(['/login']);
        this.toast.success('You are now registered', 'You are registered');
      } else {
        this.toast.error(data.error, 'Error Occurred');
      }
    }, (err) => {
      this.toast.error('Error', 'Something went wrong.');
    });
  }
}
