package categories

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func CreateCategory(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	var newCategory Category
	err := json.NewDecoder(r.Body).Decode(&newCategory)
	if err != nil {
		http.Error(w, "Erreur lors de la lecture des données de la requête JSON", http.StatusBadRequest)
		return
	}

	// Ajoute la nouvelle catégorie dans la bdd
	_, err = db.Exec("INSERT INTO categories (name) VALUES (?)", newCategory.CategoryName)
	if err != nil {
		http.Error(w, "Erreur lors de l'insertion de la nouvelle catégorie dans la base de données", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(newCategory); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON de la nouvelle catégorie", http.StatusInternalServerError)
		return
	}
}
