import { Resultat } from "../entity/Resultat";
import * as fs from 'fs';

export class FichierLectureService  {

    // Parser un fichier contenant les données.
    /**
    * @param fichier chemin vers le fichier
    * @return  Liste d'objet Resultat correspondant aux données
    */

    // Méthode pour parser un fichier
    public parseFichier(fichier: string): Resultat[] {
        // LEcture du fichier avec l'encodage utf-8 => Pour accepter les caractères spéciaux
        const contenus = fs.readFileSync(fichier, "utf-8");

        //Découpage par lignes avec split et suppréssion des lignes vides avec filter, trim 
        const lignes = contenus.split('\n').filter(ligne => ligne.trim() !== '');

        // Suppréssion de la première ligne (Titres des colones) et créer une copie des restes des lignes avec slice()
        const ligneVraies = lignes.slice(1)

        //Un tableau resultats vide 
        const resultats: Resultat[] = []

        let ligne: any;
        // Boucle pour lire toutes les lignes dans ligneVraies;
        for (ligne of ligneVraies) {
            // Si la ligne n'est pas filtrée, on continue
            if (!ligne.trim()) continue;

            try {
                // Dans le script, les données sont séparées par des tabulations
                const colones = ligne.trim().split('\t')

                // Les données sont avec 5 données (nom, somme, moyenne, date, heure) et on va ajouter une nouvelle colone dans la base de données: extension
                if (colones.length >= 5) {
                    const resultat = new Resultat();
                     //Colonne 0
                     resultat.nom = colones[0].trim();

                    //  Colonne 1
                    resultat.somme = parseInt(colones[1].trim(), 10);

                    // Colonne 2 
                    resultat.moyenne = parseFloat(colones[2].trim());

                    // Colonne 3
                    resultat.date = new Date(colones[3].trim());

                    // Colonne 4
                    resultat.heure = colones[4].trim();

                    // Colonne 5 : récupération de l'extension des fichiers avec lastIndexOf()
                    const index =resultat.nom.lastIndexOf('.');

                    if (index > 0) {
                        resultat.extention = resultat.nom.slice(index + 1);
                    } else {
                        resultat.extention = '';
                    }

                    // pusher résultats à la liste des données
                    resultats.push(resultat);
                }
            }catch (error: any) {
                console.error('Erreur lors de la lecture : ' + ligne, error);
            }
        }

        return resultats;
        
    }

}

// Importer la classe vers ResultatService pour parser le fichier