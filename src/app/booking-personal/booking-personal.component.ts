import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Booking} from '../models/booking.model';
import {BookingService} from '../services/booking.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {WaitingPickupService} from '../services/waiting-pickup.service';
import {WaitingLine} from '../models/waiting-line.model';
import {WaitingLineReservation} from '../models/waiting-line-reservation.model';

@Component({
  selector: 'app-booking-personnal',
  templateUrl: './booking-personal.component.html',
  styleUrls: ['./booking-personal.component.scss']
})
export class BookingPersonalComponent implements OnInit {
  bookings: any[];
  bookingsSubscription: Subscription;
  waitingLines: any[];
  waitingLineSubsciption: Subscription;

  private name: string;

  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private bookingService: BookingService, private authenticationService: AuthService, private waitingLineService: WaitingPickupService , private router: Router) {
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
    this.waitingLineService.getWaitingLineByMember(this.currentUser.id);
    this.waitingLineSubsciption = this.waitingLineService.waitingLineReservationSubject.subscribe(
      (waitingLines: any[]) => {
        this.waitingLines = waitingLines;
      }
    );

  }

  onSave(booking: Booking) {
    this.bookingService.saveBooking(booking);
  }

  extend(booking: Booking) {
    this.bookingService.extendBooking(booking);
    window.location.reload();
  }

  endReservation(waitingLine: WaitingLineReservation) {
    this.waitingLineService.endReservation(waitingLine);
    window.location.reload();
  }


}
