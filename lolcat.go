package test

import (
	"context"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

func bad01(w http.ResponseWriter, req *http.Request) {
	url := req.FormValue("url")
	// ruleid: taint-backend-ssrf-nethttp
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	_, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
}
