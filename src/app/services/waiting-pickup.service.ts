import {Injectable} from '@angular/core';
import {Booking} from '../models/booking.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {WaitingLine} from '../models/waiting-line.model';
import {Subject} from 'rxjs';
import {WaitingPosition} from '../models/waiting-postion.model';

@Injectable()
export class WaitingPickupService {

  endpoint: string =  environment.APIEndpoint;
  constructor(private httpClient: HttpClient) {
  }

  private allPickup = [];
  waitingPosition: WaitingPosition;
  waitingPostionSubject = new Subject<WaitingPosition>();

  allPickupSubscription = new Subject<any[]>();

  waitingPostionObservable() {
    return this.waitingPostionSubject.asObservable();
  }
  emitWaitingPositionSubject() {
    this.waitingPostionSubject.next(this.waitingPosition);
  }

  emitAllPickupSubject() {
    this.allPickupSubscription.next(this.allPickup.slice());
  }

  getWaitingLineForBook(bookId: number) {
    this.httpClient
      .post<WaitingPosition>(this.endpoint + '/waitingLinePosition', {bookId} )
      .subscribe(
        (response) => {
          this.waitingPosition = response;
          this.emitWaitingPositionSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  addInWaitingLine(waitingLine: WaitingLine) {
    this.saveInWaitingLine(waitingLine);
  }

  saveInWaitingLine(waitingLine: WaitingLine) {
    this.httpClient
      .post(this.endpoint + '/saveInWaitingLine', waitingLine)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getPickupList() {
    this.httpClient
      .get<any[]>(this.endpoint + '/activePickups')
      .subscribe(
        (response) => {
          this.allPickup = response;
          this.emitAllPickupSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
