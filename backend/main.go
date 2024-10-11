package main

import (
	"bookshop/api"
	"bookshop/util"
	"net/http"
	"path/filepath"
)

func main() {
    mux := http.NewServeMux()

    buildPath := filepath.Join("build")
    fs := http.FileServer(http.Dir(buildPath))
    mux.Handle("/", fs)

    mux.HandleFunc("/books", api.GetBooksHandler)

    cors := util.CORSMiddleware(mux)

    loggedMux := util.LoggingMiddleware(cors)

    errorMux := util.ErrorHandlingMiddleware(loggedMux)

    err := http.ListenAndServe(":8080", errorMux)
    if err != nil {
        util.ErrorLogger.Fatalf("Server failed to start: %v", err)
    }
}
