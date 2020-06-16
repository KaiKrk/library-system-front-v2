import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {WaitingPickupService} from '../services/waiting-pickup.service';
import {WaitingLine} from '../models/waiting-line.model';
import {any} from 'codelyzer/util/function';
import {Subscription} from 'rxjs';
import {WaitingPosition} from '../models/waiting-postion.model';

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
  public bookId: number;
  waitingPosition: WaitingPosition;
  waitingPositionSubscription: Subscription;
  currentUser = this.authService.currentUserValue;

  ngOnInit(): void {
    this.bookName = this.activeRoute.snapshot.paramMap.get('bookName');
    this.bookId  = Number(this.activeRoute.snapshot.paramMap.get('bookId'));
    this.memberId = this.currentUser.id;
    this.initForm();
    this.getWaitingLine();
    this.waitingPositionSubscription = this.waitingPikcupService.waitingPostionObservable().subscribe(
      (waitingPosition: WaitingPosition) => {
        this.waitingPosition = waitingPosition;
    }
    );
  }

  getWaitingLine() {
  this.waitingPikcupService.getWaitingLineForBook(Number(this.bookId));
  }

  initForm() {
    this.waitingLineForm = this.formBuilder.group(
      {
        book : [this.bookName, Validators.required],
        member : [this.memberId, Validators.required]
      }
    );
  }
  onSubmitForm() {
    const formValue =  this.waitingLineForm.value;
    console.log(formValue);
    const newMemberInWaitingLine: WaitingLine = {
      bookId: this.bookId,
      memberId: formValue.member
    };
    this.waitingPikcupService.addInWaitingLine(newMemberInWaitingLine);
    this.router.navigate(['/']);
  }
}
