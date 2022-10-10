# TennisCLI
Application en ligne de commande permettant de simuler un match de tennis en 3 sets (2 sets gagnants).

## Prérequis
Avoir node d'installer sur votre poste (pour l'utilisation de npm install)

### Étape 1 : l'installation
Pour installer le projet, il faudra aller dans le dossier que vous venez de cloner, et entrer la commande suivante 
```bash
npm install
```
Cela va installer toutes les dépendances nécessaire au projet.

### Étape 2 : Le lancement du projet
Dans la même console, faite 
```bash
node index.js
```
Vous devriez voir apparaitre une question vous demandant le nom du premier tennisman.

#### Explication des commandes
Une fois que vous aurez rempli le nom de vos 2 tennisman, 5 choix s'offrent à vous :
1. <strong>score</strong> : affiche le score actuel
2. <strong>p1</strong> : Le joueur 1 marque 1 point
3. <strong>p2</strong> : le joueur 2 marque 1 point
4. <strong>reset</strong> : la partie se réinitialise
5. <strong>quitter</strong> : l'application s'arrete
