# 🚀 GoInventory

Bienvenue dans le projet GoInventory ! Ce projet vous permet de gérer votre inventaire avec facilité.

## 🏁 Lancement du Projet

Pour démarrer l'application, suivez ces étapes simples :

1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre système.

2. Clonez ce dépôt sur votre machine en utilisant la commande suivante :

`git clone https://github.com/HermanPierre/GoInventory.git`

3. Accédez au répertoire du projet :

`cd GoInventory`

4. Vous pouvez lancer l'application en utilisant la commande suivante :

`./start`


Cette commande va construire les conteneurs Docker nécessaires, initialiser la base de données et lancer l'application.

5. Rendez-vous dans votre navigateur et accédez à l'adresse [http://localhost:3000](http://localhost:3000) pour utiliser GoInventory.

6. Pour accéder à l'application, utilisez les identifiants suivants :
- Nom d'utilisateur : admin
- Mot de passe : admin

## 🧪 Exécution des Tests Frontend
Pour exécuter les tests du frontend, suivez ces étapes supplémentaires :

Accédez au répertoire du frontend :


`cd frontend`

Installez les dépendances npm en utilisant la commande suivante :

`npm install`

Lancez les tests avec la commande :

`npm test`

Cela exécutera les tests du frontend de l'application.

## 📂 Structure du Projet

Voici un aperçu de la structure du projet GoInventory :

- L'appli en react se trouve dans `/frontend`
- L'API en Go se trouve dans `/go`
- Le script d'initialisation de la bdd dans `/mysql`
- La config de keycloak se trouve dans `/keycloack`


N'hésitez pas à explorer le code source !