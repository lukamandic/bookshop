import { useEffect, useState } from "react";
import { fetchBooks } from "../../services";
import { Book } from "../../types";
import { generateRandomPrice } from "../../util/price";
import { Location } from "react-router-dom";

export const useGetBooks = (title: string, location: Location) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [titleSearch, setTitleSearch] = useState<string>(title || "nosql");
  const queryParams = new URLSearchParams(location.search);
  const openLibrary = queryParams.has("openLibrary")
    ? queryParams.get("openLibrary")
    : "false";

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks(titleSearch, openLibrary);

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
  }, [title, titleSearch, openLibrary]);

  return { books, setTitleSearch };
};
