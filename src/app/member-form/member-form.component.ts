import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MemberService} from '../services/member.service';
import {Member} from '../models/member.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.memberForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', Validators.required]
      }
    );
  }
  onSubmitForm() {
    const formValue =  this.memberForm.value;
    const member: Member = {
      name: formValue.name,
      surname: formValue.surname,
      email:  formValue.email,
      password: formValue.password
    };
    this.memberService.addMember(member);
  }

}
