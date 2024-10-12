import { useEffect, useState } from "react";
import { fetchBooks } from "../../services";
import { Book } from "../../types";
import { generateRandomPrice } from "../../util/price";

export const useGetBooks = (title: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [titleSearch, setTitleSearch] = useState<string>(title || "nosql");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks(titleSearch);

        if (fetchedBooks) {
          fetchedBooks?.items.map((book) => {
            book.volumeInfo.price = generateRandomPrice();
          });
          setBooks(fetchedBooks.items);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (title) {
      getBooks();
    }
  }, [title, titleSearch]);

  return { books, setTitleSearch };
};
