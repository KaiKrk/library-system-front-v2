import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AuthModel} from '../models/auth.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm() {
    this.authForm = this.formBuilder.group(
      {
        email: [ '', Validators.email],
        password: ['', Validators.required]
      }
    );
  }

  onSubmitAuthForm() {
    const formValue = this.authForm.value;
    this.authService.login(  formValue.email, formValue.password );
  }
}
