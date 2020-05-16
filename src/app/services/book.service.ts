import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Book} from '../models/book.model';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class BookService {

  endpoint: string =  environment.APIEndpoint;
  private book: Book[] = [];
  bookSubject = new Subject<any[]>();

  private books = [] ;

  emitBookSubject() {
    this.bookSubject.next(this.books.slice());
  }
  addBook(book: Book) {
  // this.book.push(book);
  this.saveBooks(book);
  // this.emitBookSubject();
  }

  getBooks() {
    this.httpClient
      .get<any[]>(this.endpoint + '/books')
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
