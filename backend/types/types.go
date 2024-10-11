package types

type BooksResponse struct {
	Kind       string `json:"kind"`
	TotalItems int    `json:"totalItems"`
	Items      []Item `json:"items"`
}

type Item struct {
	Kind       string     `json:"kind"`
	ID         string     `json:"id"`
	VolumeInfo VolumeInfo `json:"volumeInfo"`
}

type VolumeInfo struct {
	Title               string               `json:"title"`
	Authors             []string             `json:"authors"`
	Description         string               `json:"description"`
	PageCount           int                  `json:"pageCount"`
	ImageLinks          ImageLinks           `json:"imageLinks"`
	MaturityRating      string               `json:"maturityRating"`
	IndustryIdentifiers []IndustryIdentifier `json:"industryIdentifiers"`
	Revision            int                  `json:"revision"`
}

type IndustryIdentifier struct {
	Type       string `json:"type"`
	Identifier string `json:"identifier"`
}

type ImageLinks struct {
	SmallThumbnail string `json:"smallThumbnail"`
	Thumbnail      string `json:"thumbnail"`
}

type OpenLibraryResponse map[string]struct {
	Details BookDetails `json:"details"`
}

type BookDetails struct {
	Revision int `json:"revision"`
}

type BookWithOpenLibraryData struct {
	Item                Item
	OpenLibraryResponse OpenLibraryResponse
}

type ErrorResponse struct {
	Message string `json:"message"`
}