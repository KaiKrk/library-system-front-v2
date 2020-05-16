import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../services/book.service';
import {Book} from '../models/book.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        author: ['', Validators.required],
        category: ['', Validators.required],
        copies: ''
      }
    );
  }
  onSubmitBookForm() {
    const formValue =  this.bookForm.value;
    const book: Book = {
      author: formValue.author,
      category: formValue.category,
      copies: formValue.copies,
      name: formValue.name
    }
    this.bookService.addBook(book);
    this.router.navigate(['/bookList']);
  }
}
