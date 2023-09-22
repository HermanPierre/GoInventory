package products

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

func AddProductVersion(db *sql.DB, productID int) error {
	// Récupére les informations actuelles du produit
	var existingProduct Product
	err := db.QueryRow("SELECT name, description, category_id, quantity FROM products WHERE product_id = ?", productID).Scan(
		&existingProduct.Name,
		&existingProduct.Description,
		&existingProduct.CategoryID,
		&existingProduct.Quantity,
	)

	if err != nil {
		return err
	}

	// Insère une nouvelle version du produit dans la table product_versions
	insertQuery := `
		INSERT INTO product_versions (product_id, name, description, category_id, quantity, created_at)
		VALUES (?, ?, ?, ?, ?, NOW())
	`

	_, err = db.Exec(
		insertQuery,
		productID,
		existingProduct.Name,
		existingProduct.Description,
		existingProduct.CategoryID,
		existingProduct.Quantity,
	)

	if err != nil {
		return err
	}

	return nil
}

func GetProductVersions(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	productID := r.URL.Query().Get("product_id")
	if productID == "" {
		http.Error(w, "L'ID du produit doit être spécifié dans les paramètres de requête", http.StatusBadRequest)
		return
	}

	productIDInt, err := strconv.Atoi(productID)
	if err != nil {
		http.Error(w, "L'ID du produit doit être un entier valide", http.StatusBadRequest)
		return
	}

	// Récupération des versions du produit
	rows, err := db.Query("SELECT version_id, name, description, category_id, quantity, created_at FROM product_versions WHERE product_id = ? ORDER BY created_at DESC", productIDInt)
	if err != nil {
		http.Error(w, "Erreur lors de la récupération des versions du produit", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	productVersions := []Product{}

	// Lecture des versions
	for rows.Next() {
		var version Product
		err := rows.Scan(
			&version.ProductID,
			&version.Name,
			&version.Description,
			&version.CategoryID,
			&version.Quantity,
			&version.CreatedAt,
		)
		if err != nil {
			http.Error(w, "Erreur lors de la lecture des versions du produit", http.StatusInternalServerError)
			return
		}
		productVersions = append(productVersions, version)
	}

	if len(productVersions) == 0 {
		productVersions = []Product{}
	}

	// Répondre avec les versions du produit
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(productVersions); err != nil {
		http.Error(w, "Erreur lors de la sérialisation en JSON des versions du produit", http.StatusInternalServerError)
		return
	}
}
