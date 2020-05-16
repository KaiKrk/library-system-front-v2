import { Component, OnInit } from '@angular/core';
import {BookService} from '../services/book.service';
import {Subscription} from 'rxjs';
import {Book} from '../models/book.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: any[];
  booksSubscription: Subscription;

  constructor(private bookService: BookService, private authenticationService: AuthService) { }

  currentUser = this.authenticationService.currentUserValue;
  ngOnInit() {
    this.bookService.getBooks();
    this.booksSubscription = this.bookService.bookSubject.subscribe(
      (books: any[]) => {
        this.books = books;
      }
    );
    this.bookService.emitBookSubject();
  }

  reservateBook(bookId: number) {

  }


}
