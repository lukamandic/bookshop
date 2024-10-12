export interface BooksResponse {
  items: Book[];
}

export interface Book {
  id: string;
  volumeInfo: BookInfo;
}

export interface BookInfo {
  title: string;
  price: number;
  description: string;
  imageLinks: ImageLinks;
  pageCount: number;
  revision: number;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
