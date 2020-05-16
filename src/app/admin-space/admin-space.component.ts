import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {BookingService} from '../services/booking.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss']
})
export class AdminSpaceComponent implements OnInit {

  bookings: any[];
  bookingsSubscription: Subscription;

  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private bookingService: BookingService, private router: Router) {
  }

  ngOnInit() {
    this.bookingService.getAllBookings();
    this.bookingsSubscription = this.bookingService.allBookingsSubscription.subscribe(
      (bookings: any[]) => {
        this.bookings = bookings;
      }
    );
  }

}
