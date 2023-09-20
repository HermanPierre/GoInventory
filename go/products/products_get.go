package products

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// Structure d'un produit
type Product struct {
	ProductID    int    `json:"product_id"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	CategoryID   int    `json:"category_id"`
	CategoryName string `json:"category_name"`
	Quantity     int    `json:"quantity"`
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
}

func getProductByID(productID int, db *sql.DB) (Product, error) {
	query := `
		SELECT 
			p.product_id, 
			p.name, 
			p.description, 
			p.category_id, 
			p.quantity, 
			p.created_at, 
			p.updated_at,
			c.name AS category_name
		FROM products p
		LEFT JOIN categories c ON p.category_id = c.category_id
		WHERE product_id = ?
	`

	row := db.QueryRow(query, productID)

	var product Product

	err := row.Scan(
		&product.ProductID,
		&product.Name,
		&product.Description,
		&product.CategoryID,
		&product.Quantity,
		&product.CreatedAt,
		&product.UpdatedAt,
		&product.CategoryName,
	)

	if err != nil {
		return Product{}, err
	}

	return product, nil
}

func getAllProducts(db *sql.DB, categoryParam string) ([]Product, error) {
	query := `
		SELECT 
			p.product_id, 
			p.name, 
			p.description, 
			p.category_id, 
			p.quantity, 
			p.created_at, 
			p.updated_at,
			c.name AS category_name
		FROM products p
		LEFT JOIN categories c ON p.category_id = c.category_id
	`

	var args []interface{}
	if categoryParam != "" {
		// Si un filtre de catégorie est spécifié, on ajoute une clause WHERE à la requête SQL
		query += " WHERE category_id = ?"
		categoryID, _ := strconv.Atoi(categoryParam)
		args = append(args, categoryID)
	}

	rows, err := db.Query(query, args...)
	fmt.Println(err)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []Product

	for rows.Next() {
		var product Product
		err := rows.Scan(
			&product.ProductID,
			&product.Name,
			&product.Description,
			&product.CategoryID,
			&product.Quantity,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.CategoryName,
		)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	return products, nil
}

// ProductRoutes Initialisation des routes liées aux produits.
func ProductRoutesGet(db *sql.DB, w http.ResponseWriter, r *http.Request) {
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
