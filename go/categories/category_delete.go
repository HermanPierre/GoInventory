package categories

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

func DeleteCategory(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	// Récupère l'ID de catégorie dans l'URL
	categoryIDStr := r.URL.Query().Get("category_id")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		http.Error(w, "ID de catégorie invalide", http.StatusBadRequest)
		return
	}

	// Supprime les versions de produits liées à la catégorie
	_, err = db.Exec("DELETE FROM product_versions WHERE product_id IN (SELECT product_id FROM products WHERE category_id = ?)", categoryID)
	if err != nil {
		http.Error(w, "Erreur lors de la suppression des versions de produits liés à la catégorie", http.StatusInternalServerError)
		return
	}

	// Supprime les produits liés à la catégorie
	_, err = db.Exec("DELETE FROM products WHERE category_id = ?", categoryID)
	if err != nil {
		http.Error(w, "Erreur lors de la suppression des produits liés à la catégorie", http.StatusInternalServerError)
		return
	}

	// Suppression de la catégorie
	_, err = db.Exec("DELETE FROM categories WHERE category_id = ?", categoryID)
	if err != nil {
		http.Error(w, "Erreur lors de la suppression de la catégorie", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	//Renvoie un message de confirmation
	response := map[string]string{"message": "Catégorie et produits liés supprimés avec succès"}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON de la réponse", http.StatusInternalServerError)
		return
	}
}
