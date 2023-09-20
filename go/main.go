package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"goinventory/products"
	"net/http"
	"os"
)

func connectToDatabase() (*sql.DB, error) {
	// Paramètres de connexion à la base de données MySQL
	username := os.Getenv("DB_USER")
	dbUrl := os.Getenv("DB_URL")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	fmt.Printf("%s:%s@tcp(%s)/%s", username, password, dbUrl, dbname)
	// Créer la chaîne de connexion
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, dbUrl, dbname)

	// Se connecter à la base de données
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Vérifier la connexion à la base de données
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func main() {
	db, err := connectToDatabase()
	fmt.Printf("%s", err)
	db.Ping()

	products.ProductRoutes(db)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, world!")
	})

	fmt.Println("Server is running on :8080")
	http.ListenAndServe(":8080", nil)
}
