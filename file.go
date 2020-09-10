package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

func checkIsRegular(path string) bool {
	fi, err := os.Stat(path)
	if err != nil {
		fmt.Println(err)
		return false
	}

	mode := fi.Mode()
	if mode.IsRegular() {
		return true
	}
	return false
}

func readInFile(path string) (string, error) {
	data, err := ioutil.ReadFile(path)

	if err != nil {
		return "", err
	}

	return string(data), nil
}

func walkThroughFiles() error {
	err := filepath.Walk("./lovingitvegan.com",
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}

			if !checkIsRegular(path) {
				return nil
			}

			file, err := readInFile(path)
			if err != nil {
				return err
			}

			// Parse file and save in DB
			name, ingredients, link := parseRawHTML(file, path)
			recipe := RecipeDB{
				Link:        link,
				Name:        name,
				Ingredients: ingredients,
			}
			err = insertRecipeInDB(recipe)
			return err
		})

	return err
}
