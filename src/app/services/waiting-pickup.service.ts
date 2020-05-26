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
  waitingPosition: WaitingPosition;
  waitingPostionSubject = new Subject<WaitingPosition>();

  waitingPostionObservable() {
    return this.waitingPostionSubject.asObservable();
  }
  emitWaitingPositionSubject() {
    this.waitingPostionSubject.next(this.waitingPosition);
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
      .post(this.endpoint + '/saveInWaitingList', waitingLine)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
