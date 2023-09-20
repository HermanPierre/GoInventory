package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux"
	"goinventory/products"
	"net/http"
	"os"
)

// Mise en place du CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		next.ServeHTTP(w, r)
	})
}

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
	if err != nil {
		fmt.Println("Impossible de se connecter à la base de données")
	}

	router := mux.NewRouter()
	router.Use(corsMiddleware)

	router.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
		products.ProductRoutesGet(db, w, r)
	}).Methods("GET")

	fmt.Println("Server is running on :8080")
	http.Handle("/", router)
	http.ListenAndServe(":8080", nil)
}
