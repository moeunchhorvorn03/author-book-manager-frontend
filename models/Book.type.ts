import { Category } from "@/types";

export interface BookRequestBody {
    category: Category | "All",
    searchValue: string;
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
    isBestseller: boolean;
    review: number;
  }