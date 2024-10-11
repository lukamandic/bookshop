package api

import (
	"bookshop/util"
	"encoding/json"
	"net/http"
)

func GetBooksHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Query().Get("title")
    openLibrary := r.URL.Query().Get("openLibrary")

    bookResponse, err := util.FetchBooks(title)
        
    if err != nil {
        http.Error(w, "Failed to fetch books", http.StatusInternalServerError)
        return
    }

    if openLibrary == "true" {
        withRevisions := util.FetchBooksAndRevisions(bookResponse)
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(withRevisions)
        return
    }


    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(bookResponse)
}
