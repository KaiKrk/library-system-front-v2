import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {WaitingPickupService} from '../services/waiting-pickup.service';
import {WaitingLine} from '../models/waiting-line.model';

@Component({
  selector: 'app-waiting-line',
  templateUrl: './waiting-line.component.html',
  styleUrls: ['./waiting-line.component.scss']
})
export class WaitingLineComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private waitingPikcupService: WaitingPickupService,
              private router: Router,
              private authService: AuthService,
              private activeRoute: ActivatedRoute) { }

  waitingLineForm: FormGroup;
  public bookName: string;
  public memberId: number;
  public bookId: string;
  public positionInWaitingLine: number;
  public waitingLineMaxSize: number;

  private
  ngOnInit(): void {
    this.bookName = this.activeRoute.snapshot.paramMap.get('bookName');
    this.bookId  = this.activeRoute.snapshot.paramMap.get('bookId');
    this.initForm();
    this.getWaitingLine();
  }

  getWaitingLine() {
  this.waitingPikcupService.getWaitingLineForBook(Number(this.bookId));
  }

  initForm() {
    this.waitingLineForm = this.formBuilder.group(
      {
        book : [this.bookName, Validators.required],
      }
    );
  }
  onSubmitForm() {
    const formValue =  this.waitingLineForm.value;
    const newMemberInWaitingLine: WaitingLine = {
      bookId: formValue.book,
      memberId: formValue.member
    };
    this.waitingPikcupService.addInWaitingLine(newMemberInWaitingLine);
    this.router.navigate(['/']);
  }
}
