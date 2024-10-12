import { BooksResponse } from "../../types";

export const fetchBooks = async (title: string): Promise<BooksResponse> => {
  try {
    const res = await fetch(`http://localhost:8080/books?title=${title}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const jsonRes: BooksResponse = await res.json();
    return jsonRes;
  } catch (e) {
    console.error(e);
    return { items: [] };
  }
};
