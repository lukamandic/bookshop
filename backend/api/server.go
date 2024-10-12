package api

import (
	"bookshop/util"
	"encoding/json"
	"net/http"
)

func GetBooksHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Query().Get("title")

    bookResponse, err := util.FetchBooks(title)
        
    if err != nil {
        http.Error(w, "Failed to fetch books", http.StatusInternalServerError)
        return
    }

    withRevisions := util.FetchBooksAndRevisions(bookResponse)

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(withRevisions)
}
