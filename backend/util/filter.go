package util

import (
	"bookshop/types"
)

func FilterBooksByMaturity(books types.BooksResponse) types.BooksResponse {
    var filteredBooks types.BooksResponse
    for _, book := range books.Items {
        if book.VolumeInfo.MaturityRating == "NOT_MATURE" {
            filteredBooks.Items = append(filteredBooks.Items, book)
        }
    }
    return filteredBooks
}

func HasValidISBN(book types.Item) (bool, []types.IndustryIdentifier) {
	if book.VolumeInfo.IndustryIdentifiers != nil {
		return true, book.VolumeInfo.IndustryIdentifiers
	}
	return false, nil
}
