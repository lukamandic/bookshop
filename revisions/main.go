package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		isbn := r.URL.Query().Get("isbn")
		isbnResponse := make(map[string]int)
		
		isbnResponse[isbn] = 0 + rand.Intn(5)

		time.Sleep(600 * time.Millisecond)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(isbnResponse)
	})

	http.ListenAndServe(":3000", mux)
}