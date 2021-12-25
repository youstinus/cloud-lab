package controller

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/tcentric/cloud-lab/internal/hashes"
)

func Sha256Handler(w http.ResponseWriter, r *http.Request) {
	// to get the username, use the following:
	username := mux.Vars(r)["username"]

	// to calculate sha256 hash of a string, use internal/hashes package and function GetHash
	h, err := hashes.GetHash("Sha256", username)
	if err != nil {
		fmt.Println(err)
	}
	// to send the response, use the following:
	fmt.Fprint(w, h)

	w.WriteHeader(http.StatusOK)
}

func Sha256Handler2(w http.ResponseWriter, r *http.Request) {
	// to get the username, use the following:
	//username := mux.Vars(r)["username"]

	// to calculate sha256 hash of a string, use internal/hashes package and function GetHash
	//h, err := hashes.GetHash("Sha256", username)
	//if err != nil {
	//	fmt.Println(err)
	//}
	// to send the response, use the following:
	fmt.Fprint(w, "checked")

	w.WriteHeader(http.StatusOK)
}

func GithubUsernameHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, os.Getenv("GITHUB_USERNAME"))
}

func GithubUsernameHandler2(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "youstinus")
}
