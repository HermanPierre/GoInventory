package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux"
	"goinventory/categories"
	"goinventory/products"
	"net/http"
	"os"
	"time"
)

// Mise en place du CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func connectToDatabase() (*sql.DB, error) {
	// Paramètres de connexion à la base de données MySQL
	username := os.Getenv("DB_USER")
	dbUrl := os.Getenv("DB_URL")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	var db *sql.DB
	var err error
	maxAttempts := 15
	attempts := 0

	for attempts < maxAttempts {
		fmt.Printf("%s:%s@tcp(%s)/%s", username, password, dbUrl, dbname)
		// Créer la chaîne de connexion
		dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, dbUrl, dbname)

		// Se connecter à la base de données
		db, err = sql.Open("mysql", dsn)
		if err != nil {
			attempts++
			fmt.Println("Impossible de se connecter à la base de données. Réessai dans 2 secondes...")
			time.Sleep(2 * time.Second) // Pause de 2 secondes avant la prochaine tentative
			continue
		}

		// Vérifier la connexion à la base de données
		if err := db.Ping(); err != nil {
			attempts++
			fmt.Println("Échec de la vérification de la connexion à la base de données. Réessai dans 2 secondes...")
			db.Close()
			time.Sleep(2 * time.Second) // Pause de 2 secondes avant la prochaine tentative
			continue
		}

		fmt.Println("Connecté à la base de données :) ")
		break
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
		if r.Method == http.MethodGet {
			products.ProductRoutesGet(db, w, r)
		} else if r.Method == http.MethodPost {
			products.AddProduct(db, w, r)
		} else if r.Method == http.MethodPut {
			products.UpdateProduct(db, w, r)
		} else if r.Method == http.MethodDelete {
			products.DeleteProduct(db, w, r)
		}
	})

	router.HandleFunc("/categories", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			categories.GetAllCategories(db, w)
		} else if r.Method == http.MethodPost {
			categories.CreateCategory(db, w, r)
		} else if r.Method == http.MethodDelete {
			categories.DeleteCategory(db, w, r)
		}
	})

	router.HandleFunc("/versions", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			products.GetProductVersions(db, w, r)
		}
	})

	fmt.Println("Server is running on :8080")
	http.Handle("/", router)
	http.ListenAndServe(":8080", nil)
}
