import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { checkIfPasswordsMatchValidator, CheckIfEmailExistsValidator } from '../validators/CheckIfEmailExistsValidator';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // model:any = {};
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private emailValidator: CheckIfEmailExistsValidator,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: new FormControl(
        '',
        [Validators.email, Validators.required, Validators.pattern("[^ @]*@[^ @]*")],
        this.isEmailExists.bind(this)
      ),
      password: new FormControl('',
        [Validators.required]),
      retypepassword: new FormControl('',
        [Validators.required,])
    }, { validators: checkIfPasswordsMatchValidator });
  }

  signup() {
    console.log(this.signupForm.value);
    this.auth.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res);
    })
  }

  isEmailExists(control: AbstractControl) {
    return this.emailValidator.checkIfEmailAlreadyTaken(control.value)
    .pipe(map((res: boolean) => res ? null : { isEmailAlreadyExists: true }));
  }

  get isEmailAlreadyExists() {
    let emailCtrl: AbstractControl = this.signupForm.get('email');
    console.log(emailCtrl.errors);
    return emailCtrl.hasError('isEmailAlreadyExists') && this.isEmailDirty;
  }

  get isInvalidEmail() {
    let emailCtrl: AbstractControl = this.signupForm.get('email');
    return emailCtrl.invalid && this.isEmailDirty;
  }

  get isEmailDirty() {
    let emailCtrl: AbstractControl = this.signupForm.get('email');
    return emailCtrl.dirty;
  }

  get isInvalidPassword() {
    let pwdCtrl: AbstractControl = this.signupForm.get('password');
    return pwdCtrl.invalid && pwdCtrl.dirty;
  }

  get isInequalPasswords() {
    let pwd = this.signupForm.get('password');
    let rep_pwd = this.signupForm.get('retypepassword');
    return pwd.dirty && rep_pwd.dirty && pwd.value != rep_pwd.value
  }

}
