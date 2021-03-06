import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Book} from '../models/book.model';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class BookService {

  endpoint: string =  environment.APIEndpoint;
  bookSubject = new Subject<any[]>();

  private books = [] ;

  emitBookSubject() {
    this.bookSubject.next(this.books.slice());
  }
  addBook(book: Book) {
  this.saveBooks(book);
  }

  getBooks(memberId: number) {
    this.httpClient
      .post<any[]>(this.endpoint + '/books', {memberId})
      .subscribe(
        (response) => {
          this.books = response;
          this.emitBookSubject();
        },
        (error) => {
            console.log('Erreur ! : ' + error);
        }
      );
  }

  saveBooks(book: Book) {
    this.httpClient
      .post(this.endpoint + '/saveBook', book)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  constructor(private httpClient: HttpClient) {
  }
}
