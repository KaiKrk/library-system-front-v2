import { Injectable} from '@angular/core';
import {Booking} from '../models/booking.model';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';


@Injectable()
export class BookingService {

  endpoint: string =  environment.APIEndpoint;

  private booking: Booking[] = [];
  bookingSubject = new Subject<any[]>();
  allBookingsSubscription = new Subject<any[]>();

  private bookings = [] ;
  private allBookings = [];

  emitBookingSubject() {
    this.bookingSubject.next(this.bookings.slice());
  }

  emitAllBookingSubject() {
    this.allBookingsSubscription.next(this.allBookings.slice());
  }
  addBooking(booking: Booking) {
    this.saveBooking(booking);
  }

  getAllBookings() {
    this.httpClient
      .get<any[]>(this.endpoint + '/allBookings')
      .subscribe(
        (response) => {
          this.allBookings = response;
          this.emitAllBookingSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

    getBooking(memberId: number) {
    this.httpClient
      .post<any[]>(this.endpoint + '/myBookings', {memberId})
      .subscribe(
        (response) => {
          this.bookings = response;
          this.emitBookingSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveBooking(booking: Booking) {
    this.httpClient
      .post(this.endpoint + '/saveBooking', booking)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  extendBooking(booking: Booking) {
    this.httpClient
      .post( this.endpoint + '/extendBooking', booking)
      .subscribe(
        () => {
          console.log('Renouvellement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  constructor(private httpClient: HttpClient) {
  }
}
