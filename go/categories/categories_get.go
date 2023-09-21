package categories

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

// Structure d'une catégorie
type Category struct {
	CategoryID   int    `json:"category_id"`
	CategoryName string `json:"category_name"`
}

func GetAllCategories(db *sql.DB, w http.ResponseWriter) {
	rows, err := db.Query("SELECT category_id, name FROM categories")
	if err != nil {
		http.Error(w, "Erreur lors de la requête à la base de données", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var categories []Category

	for rows.Next() {
		var category Category
		if err := rows.Scan(&category.CategoryID, &category.CategoryName); err != nil {
			http.Error(w, "Erreur lors de la lecture des données de la base de données", http.StatusInternalServerError)
			return
		}
		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Erreur lors de la lecture des données de la base de données", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(categories); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON des catégories", http.StatusInternalServerError)
		return
	}

}
