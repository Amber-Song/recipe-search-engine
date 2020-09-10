package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func printErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func getIngredientsList(data string) []string {
	replacer := strings.NewReplacer(`.`, ",", `/`, ",", `;`, ",")
	newData := replacer.Replace(data)

	ingredients := strings.Split(newData, ",")
	for index, ingredient := range ingredients {
		ingredients[index] = strings.TrimSpace(ingredient)
	}

	return ingredients
}

func addInResults(recipeResult map[int]RecipeDB, result RecipeDB) map[int]RecipeDB {
	id := result.Id
	if value, ok := recipeResult[id]; ok {
		value.Importance = value.Importance + 1
		recipeResult[id] = value
	} else {
		recipeResult[id] = result
	}

	return recipeResult
}

func searchingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	data := r.URL.Query()["ingredients"]
	ingredients := getIngredientsList(data[0])

	recipeResult := make(map[int]RecipeDB, 0)
	for _, ingredient := range ingredients {
		results, err := getRecipeBasedOnIngredients(ingredient)
		printErr(err)

		for _, result := range results {
			recipeResult = addInResults(recipeResult, result)
		}
	}

	b, err := json.Marshal(recipeResult)
	printErr(err)
	w.Write(b)
}

func main() {
	createDB()

	/* Read in files and Parse, Save dictionary in DB */
	err := walkThroughFiles()
	printErr(err)

	http.HandleFunc("/", searchingHandler)
	fmt.Println(http.ListenAndServe(":8080", nil))
}
