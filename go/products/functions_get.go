package products

import (
	"database/sql"
	"strconv"
)

func getProductByID(productID int, db *sql.DB) (Product, error) {
	query := "SELECT product_id, name, description, category_id, quantity, created_at, updated_at FROM products WHERE product_id = ?"

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
	)

	if err != nil {
		return Product{}, err
	}

	return product, nil
}

func getAllProducts(db *sql.DB, categoryParam string) ([]Product, error) {
	query := "SELECT product_id, name, description, category_id, quantity, created_at, updated_at FROM products"

	var args []interface{}
	if categoryParam != "" {
		// Si un filtre de catégorie est spécifié, on ajoute une clause WHERE à la requête SQL
		query += " WHERE category_id = ?"
		categoryID, _ := strconv.Atoi(categoryParam)
		args = append(args, categoryID)
	}

	rows, err := db.Query(query, args...)
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
		)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	return products, nil
}
