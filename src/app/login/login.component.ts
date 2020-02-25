import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService, BroadcastSubject, ToastService, appConst } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginInfo: FormGroup;
  submitted = false;
  constructor(
    private service: UserService,
    private router: Router,
    public broadcastSubject: BroadcastSubject,
    public toast: ToastService) {
    this.loginInfo = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get emailError() {
    return this.errorText(this.loginInfo.get('email'));
  }
  get passwordError() {
    return this.errorText(this.loginInfo.get('password'));

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
  login() {
    this.submitted = true;
    if (this.loginInfo.valid) {
      this.service.login(this.loginInfo.value).subscribe((data: any) => {
        if (data.success) {
          this.toast.success('', 'Welcome back');
          localStorage.setItem('token', data.token);
          this.broadcastSubject.sendMessage(data);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.toast.error(data.error, 'Error Occured');
        }

      }, (err) => {
        this.toast.error('Error', 'Something went wrong');
      });
    } else {
      this.toast.error('Please enter correct details', 'Validation Error');
    }
  }
  forgot() {

  }
}
