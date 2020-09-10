package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

type RecipeDB struct {
	Id          int
	Link        string
	Name        string
	Ingredients string
	Importance  int
}

func createDB() {
	db, _ = sql.Open("sqlite3", "./recipes.db")
	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, link TEXT, name TEXT, ingredients TEXT)")
	if err != nil {
		printErr(err)
		return
	}
	statement.Exec()
}

func insertRecipeInDB(recipe RecipeDB) error {
	statement, err := db.Prepare("INSERT INTO recipes (link, name, ingredients) VALUES (?,?,?)")
	if err != nil {
		return err
	}
	_, err = statement.Exec(recipe.Link, recipe.Name, recipe.Ingredients)
	return err
}

func getRecipeBasedOnIngredients(ingredient string) ([]RecipeDB, error) {
	recipeList := make([]RecipeDB, 0)

	rows, err := db.Query("SELECT * FROM recipes WHERE ingredients LIKE '%" + ingredient + "%'")
	if err != nil {
		return recipeList, err
	}

	for rows.Next() {
		var recipe RecipeDB
		rows.Scan(&recipe.Id, &recipe.Link, &recipe.Name, &recipe.Ingredients)
		recipeList = append(recipeList, recipe)
	}
	return recipeList, nil
}
