#!/bin/bash

result="/home/manda/Bureau/projet_script/resultat/resultat.txt"
dir="/home/manda/Bureau/projet_script/resultat/"
log="/home/manda/Bureau/log-automatisation-node.txt"

# Vérification de l'existance du fichier log
if [[ ! -f "$log" ]]; then
    touch "$log"
fi

npm run dev
echo -e "$heures => la lecture faite !" >> "$log"