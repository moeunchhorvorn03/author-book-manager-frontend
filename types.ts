import { Book } from "./models/Book.type";

export enum Category {
  ALL = 'All',
  FICTION = 'Fiction',
  NON_FICTION = 'Non-Fiction',
  SCI_FI = 'Sci-Fi',
  MYSTERY = 'Mystery',
  CLASSICS = 'Classics',
  BIOGRAPHY = 'Biography'
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export type View = 'home' | 'shop' | 'details' | 'cart';
