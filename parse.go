package main

import (
	"strings"
)

func isMeaningfulTag(tag string) bool {
	switch tag {
	case "a":
		return true
	case "em":
		return true
	case "h1":
		return true
	case "h2":
		return true
	case "h3":
		return true
	case "h4":
		return true
	case "h5":
		return true
	case "h6":
		return true
	case "i":
		return true
	case "li":
		return true
	case "p":
		return true
	case "span":
		return true
	case "strong":
		return true
	case "td":
		return true
	default:
		return false
	}
}

func getIndex(word string, words []string) int {
	length := len(words)
	for i := 0; i < length; i++ {
		if words[i] == word {
			return i
		}
	}
	return -1
}

func removeTag(words []string) []string {
	newWords := []string{}
	length := len(words)

	for i := 0; i < length; i++ {
		if isMeaningfulTag(words[i]) {
			if words[i] == "li" {
				newWords = append(newWords, ",")
			}
			continue
		}
		newWords = append(newWords, words[i])
	}

	return newWords
}

func removeMetacharacters(data string) string {
	replacer := strings.NewReplacer(`\n`, "", `\t`, "", `\u003c`, ` < `, `\u003e`, ` > `, `\u0026`, "", `#8217;`, `'`, `nbsp;`, " ", `#8211;`, "", `#9733;`, "", `#8230;`, "", `"`, " ")
	newData := replacer.Replace(data)
	return newData
}

func breakStringIntoArray(data string) []string {
	dataArray := strings.Fields(data)
	return dataArray
}

func extractLink(words []string) string {
	for i, word := range words {
		if word == "Link" {
			return words[i+2]
		}
	}

	return ""
}

func extractContent(words []string) []string {
	newWords := []string{}
	length := len(words)

	for i := 0; i < length; i++ {
		// Find the tag in HTML
		if words[i] == "<" && isMeaningfulTag(words[i+1]) {
			tagIndex := i + 1
			tag := words[tagIndex]
			newWords = append(newWords, tag)

			// Find closing tag
			closingTag := "/" + tag
			closingTagIndex := getIndex(closingTag, words[i:]) + i

			endOfBracketIndex := getIndex(">", words[i:closingTagIndex]) + i

			// Go through the content
			// if it is words outside sub tag, save
			// if it is tag, define the position and extract content inside, and jump over
			// 		but not meaningful, directly jump over
			content := words[endOfBracketIndex+1 : closingTagIndex-1]
			contentLength := len(content)
			for j := 0; j < contentLength; j++ {
				if content[j] != "<" {
					newWords = append(newWords, content[j])
				} else {
					if isMeaningfulTag(content[j+1]) {
						subTag := content[j+1]
						newWords = append(newWords, subTag)
						subClosingTag := "/" + subTag
						subClosingTagIndex := getIndex(subClosingTag, content[j:]) + j
						newWords = append(newWords, extractContent(content[j:subClosingTagIndex+1])...)
						j = subClosingTagIndex + 1
					} else {
						subEndOfBracket := getIndex(">", content[j:]) + j
						j = subEndOfBracket
					}
				}
			}
			i = closingTagIndex + 1
		}
	}
	return newWords
}

// The ingredients is in h3
func extractIngredients(words []string) []string {
	length := len(words)
	for i := 0; i < length; i++ {
		// Find Ingredients
		if words[i] == "Ingredients" && words[i-1] == "h3" {
			// Find the end of Ingredients (the next h3)
			endOfIngredientsIndex := getIndex("h3", words[i:]) + i
			ingredients := words[i+1 : endOfIngredientsIndex]
			// Remove tag and replace li with ,
			ingredients = removeTag(ingredients)
			return ingredients
		}
	}

	return []string{}
}

func extractName(path string) string {
	arr := strings.Split(path, "/")
	lastItemIndex := len(arr) - 1
	name := arr[lastItemIndex]
	name = strings.TrimSuffix(name, ".json")
	name = strings.ReplaceAll(name, "-", " ")
	return name
}

func parseRawHTML(data string, path string) (string, string, string) {
	newData := removeMetacharacters(data)
	dataArray := breakStringIntoArray(newData)

	link := extractLink(dataArray)
	contentArray := extractContent(dataArray)
	ingredientsArray := extractIngredients(contentArray)
	name := extractName(path)

	ingredients := strings.Join(ingredientsArray, " ")
	ingredients = strings.ToLower(ingredients)
	name = strings.ToLower(name)

	return name, ingredients, link
}
