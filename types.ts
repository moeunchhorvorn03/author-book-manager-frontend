
export enum Category {
  FICTION = 'Fiction',
  NON_FICTION = 'Non-Fiction',
  SCI_FI = 'Sci-Fi',
  MYSTERY = 'Mystery',
  CLASSICS = 'Classics',
  BIOGRAPHY = 'Biography'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  description: string;
  category: Category;
  coverImage: string;
  isBestseller?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export type View = 'home' | 'shop' | 'details' | 'cart';
