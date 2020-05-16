import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Booking} from '../models/booking.model';
import {BookingService} from '../services/booking.service';
import {Book} from '../models/book.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private bookingService: BookingService,
              private router: Router,
              private authService: AuthService,
              private activeRoute: ActivatedRoute) { }

  private id: number;
  private memberId: number;
  public bookName: string;

  currentUser = this.authService.currentUserValue;
  bookingForm: FormGroup;


  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('bookId'));
    this.bookName = this.activeRoute.snapshot.paramMap.get('bookName');
    this.memberId = this.currentUser.id;
    this.initForm();
  }

  initForm() {
    this.bookingForm = this.formBuilder.group(
      {
        book: [this.id, Validators.required],
        member: [this.memberId, Validators.required],
      }
    );
  }
  onSubmitForm() {
    const formValue =  this.bookingForm.value;
    const newBooking: Booking = {
      bookId: formValue.book,
      memberId: formValue.member
    };
    this.bookingService.addBooking(newBooking);
    this.router.navigate(['/']);
  }

}
