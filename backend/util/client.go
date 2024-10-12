package util

import (
	"bookshop/types"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"sync"
)
func FetchBooks(title string) (types.BooksResponse, error) {
    var booksResponse types.BooksResponse

    url := fmt.Sprintf("https://www.googleapis.com/books/v1/volumes?q=%s", url.QueryEscape(title))
    resp, err := http.Get(url)
    if err != nil {
        fmt.Println("Error fetching data:", err)
        return booksResponse, err
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response body:", err)
        return booksResponse, err
    }

    err = json.Unmarshal(body, &booksResponse)
    if err != nil {
        fmt.Println("Error parsing JSON:", err)
        return booksResponse, err
    }

    filteredBooks := FilterBooksByMaturity(booksResponse)

    return filteredBooks, nil
}

func FetchBooksAndRevisions(booksResponse types.BooksResponse) types.BooksResponse {
    isbnChan := make(chan string, len(booksResponse.Items))
    resultsChan := make(chan map[string]int, len(booksResponse.Items))
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go worker(isbnChan, resultsChan, &wg)
    }

    for _, item := range booksResponse.Items {
        if len(item.VolumeInfo.IndustryIdentifiers) > 0 {
            isbnChan <- item.VolumeInfo.IndustryIdentifiers[0].Identifier
        }
    }
    close(isbnChan)

    wg.Wait()
    close(resultsChan)

    revisionsMap := make(map[string]int)
    for result := range resultsChan {
        for isbn, revisions := range result {
            revisionsMap[isbn] = revisions
        }
    }

    for i, item := range booksResponse.Items {
        if len(item.VolumeInfo.IndustryIdentifiers) > 0 {
            isbn := item.VolumeInfo.IndustryIdentifiers[0].Identifier
            if revision, exists := revisionsMap[isbn]; exists && revision > 1 {
                booksResponse.Items[i].VolumeInfo.Revision = revision
            }
        }
    }

    return booksResponse
}

func worker(isbnChan <-chan string, resultsChan chan<-map[string]int, wg *sync.WaitGroup) {
    defer wg.Done()
    for isbn := range isbnChan {
        revision := FetchOpenLibraryData(isbn)
        resultsChan <- map[string]int{isbn: revision}
    }
}

func FetchOpenLibraryData(isbn string) int {
    url := fmt.Sprintf("http://localhost:3000/isbn=%s", isbn)
    resp, err := http.Get(url)
    if err != nil {
        fmt.Printf("Error fetching data for ISBN %s: %v\n", isbn, err)
        return 0
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Printf("Error reading response body for ISBN %s: %v\n", isbn, err)
        return 0
    }

    var bookResponse types.OpenLibraryResponse
    err = json.Unmarshal(body, &bookResponse)
    if err != nil {
        fmt.Printf("Error parsing JSON for ISBN %s: %v\n", isbn, err)
        return 0
    }

    if len(bookResponse) == 0 {
        return 0
    }
    
    for _, book := range bookResponse {
        return book
    }

    return 0
}