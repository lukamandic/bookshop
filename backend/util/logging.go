package util

import (
	"bookshop/types"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

var (
    InfoLogger  *log.Logger
    ErrorLogger *log.Logger
)

func init() {
    InfoLogger = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
    ErrorLogger = log.New(os.Stderr, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        next.ServeHTTP(w, r)

        query := r.URL.Query().Encode()

        InfoLogger.Printf("Method: %s, URL: %s, Query: %s, \n",
            r.Method, r.URL.Path, query)
    })
}



func ErrorHandlingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                ErrorLogger.Printf("Recovered from panic: %v", err)
                w.Header().Set("Content-Type", "application/json")
                w.WriteHeader(http.StatusInternalServerError)
                json.NewEncoder(w).Encode(types.ErrorResponse{Message: "An unexpected error occurred. Please try again later."})
            }
        }()
        next.ServeHTTP(w, r)
    })
}