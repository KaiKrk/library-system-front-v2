import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {BookingService} from '../services/booking.service';
import {Router} from '@angular/router';
import {WaitingPickupService} from '../services/waiting-pickup.service';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss']
})
export class AdminSpaceComponent implements OnInit {

  bookings: any[];
  bookingsSubscription: Subscription;

  pickups: any[];
  pickupSubscription: Subscription;

  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private bookingService: BookingService, private router: Router, private pickupService: WaitingPickupService) {
  }

  ngOnInit() {
    this.bookingService.getAllBookings();
    this.bookingsSubscription = this.bookingService.allBookingsSubscription.subscribe(
      (bookings: any[]) => {
        this.bookings = bookings;
      }
    );
    this.pickupService.getPickupList();
    this.pickupSubscription = this.pickupService.allPickupSubscription.subscribe(
      (pickups: any[]) => {
        this.pickups = pickups;
      }
    );
  }

}
