package products

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func AddProduct(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	// Lecture des données du corps de la requête
	var newProduct Product
	err := json.NewDecoder(r.Body).Decode(&newProduct)

	if err != nil {
		http.Error(w, "Erreur lors de la lecture des données du produit à ajouter", http.StatusBadRequest)
		return
	}

	// Insertion du nouveau produit dans la base de données
	insertQuery := `
		INSERT INTO products (name, description, category_id, quantity, created_at, updated_at)
		VALUES (?, ?, ?, ?, NOW(), NOW())
	`

	result, err := db.Exec(
		insertQuery,
		newProduct.Name,
		newProduct.Description,
		newProduct.CategoryID,
		newProduct.Quantity,
	)

	if err != nil {
		http.Error(w, "Erreur lors de l'ajout du produit à la base de données", http.StatusInternalServerError)
		return
	}

	// Récupération de l'ID du nouveau produit
	productID, _ := result.LastInsertId()

	// Mettre à jour l'ID du produit nouvellement ajouté
	newProduct.ProductID = int(productID)

	// Répondre avec le nouveau produit créé
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(newProduct); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON du nouveau produit", http.StatusInternalServerError)
		return
	}
}

func UpdateProduct(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	var updatedProduct Product
	err := json.NewDecoder(r.Body).Decode(&updatedProduct)

	if err != nil {
		http.Error(w, "Erreur lors de la lecture des données du produit à mettre à jour", http.StatusBadRequest)
		return
	}

	// Vérifier si l'ID du produit à mettre à jour est spécifié
	if updatedProduct.ProductID == 0 {
		http.Error(w, "L'ID du produit à mettre à jour doit être spécifié dans le corps de la requête", http.StatusBadRequest)
		return
	}

	updateQuery := `
		UPDATE products
		SET name = ?, description = ?, category_id = ?, quantity = ?, updated_at = NOW()
		WHERE product_id = ?
	`

	result, err := db.Exec(
		updateQuery,
		updatedProduct.Name,
		updatedProduct.Description,
		updatedProduct.CategoryID,
		updatedProduct.Quantity,
		updatedProduct.ProductID,
	)

	if err != nil {
		http.Error(w, "Erreur lors de la mise à jour du produit dans la base de données", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Aucun produit trouvé avec l'ID spécifié", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updatedProduct); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON du produit mis à jour", http.StatusInternalServerError)
		return
	}
}
