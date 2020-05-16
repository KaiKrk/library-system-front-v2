import {Book} from './book.model';

export interface BookingDetails {
  id?: number;
  book: Book;
  borrowingDate: string;
  returnDate: string;
  renewable: string;
  status: string;
}
