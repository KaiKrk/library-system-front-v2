import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Booking} from '../models/booking.model';
import {BookingService} from '../services/booking.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking-personnal',
  templateUrl: './booking-personal.component.html',
  styleUrls: ['./booking-personal.component.scss']
})
export class BookingPersonalComponent implements OnInit {
  bookings: any[];
  bookingsSubscription: Subscription;

  private name: string;

  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private bookingService: BookingService, private authenticationService: AuthService, private router: Router) {
  }

  currentUser = this.authenticationService.currentUserValue;

  ngOnInit() {
    this.bookingService.getBooking(this.currentUser.id);
    this.bookingsSubscription = this.bookingService.bookingSubject.subscribe(
      (bookings: any[]) => {
        this.bookings = bookings;
      }
    );
    this.bookingService.emitBookingSubject();
  }

  onSave(booking: Booking) {
    this.bookingService.saveBooking(booking);
  }

  extend(booking: Booking) {
    this.bookingService.extendBooking(booking);
    window.location.reload();
  }


}
