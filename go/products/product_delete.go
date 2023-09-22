package products

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

func DeleteProduct(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	productID := r.URL.Query().Get("product_id")
	if productID == "" {
		http.Error(w, "L'ID du produit à supprimer doit être spécifié dans les paramètres de la requête", http.StatusBadRequest)
		return
	}

	productIDInt, err := strconv.Atoi(productID)
	if err != nil {
		http.Error(w, "L'ID du produit doit être un nombre entier valide", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("DELETE FROM product_versions WHERE product_id = ?", productIDInt)
	if err != nil {
		http.Error(w, "Erreur lors de la suppression des versions du produit dans la base de données", http.StatusInternalServerError)
		return
	}

	deleteQuery := `
		DELETE FROM products
		WHERE product_id = ?
	`

	result, err := db.Exec(deleteQuery, productIDInt)
	if err != nil {
		http.Error(w, "Erreur lors de la suppression du produit dans la base de données", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Aucun produit trouvé avec l'ID spécifié", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{"message": "Produit supprimé avec succès"}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON de la réponse de suppression", http.StatusInternalServerError)
		return
	}
}
