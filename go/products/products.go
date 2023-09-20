package products

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

// Structure d'un produit
type Product struct {
	ProductID   int    `json:"product_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CategoryID  int    `json:"category_id"`
	Quantity    int    `json:"quantity"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

// ProductRoutes Initialisation des routes liées aux produits.
func ProductRoutes(db *sql.DB) {

	http.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			// Extraction des paramètres de la requête URL
			queryValues := r.URL.Query()
			param := queryValues.Get("productId")
			categoryParam := queryValues.Get("categoryId")

			if param != "" {
				productId, _ := strconv.Atoi(param)
				// On récupère le produit par son ID depuis la base de données
				product, err := getProductByID(productId, db)
				if product.Name == "" {
					http.Error(w, "Le produit n'existe pas", http.StatusNotFound)
					return
				}
				if err != nil {
					http.Error(w, "Erreur lors de la récupération du produit", http.StatusInternalServerError)
					return
				}

				w.Header().Set("Content-Type", "application/json")
				if err := json.NewEncoder(w).Encode(product); err != nil {
					http.Error(w, "Erreur lors de la sérialisation en JSON du produit", http.StatusInternalServerError)
					return
				}
			} else {
				// On récupère la liste de tous les produits (éventuellement filtrée par catégorie)
				products, err := getAllProducts(db, categoryParam)
				if err != nil {
					http.Error(w, "Erreur lors de la récupération de la liste des produits", http.StatusInternalServerError)
					return
				}

				w.Header().Set("Content-Type", "application/json")
				if err := json.NewEncoder(w).Encode(products); err != nil {
					http.Error(w, "Erreur lors de la sérialisation en JSON des produits", http.StatusInternalServerError)
					return
				}
			}

		}
	})
}
