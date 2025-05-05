import 'reflect-metadata';
import * as fs from "fs";
import { ResultatService } from "./services/ResultatService";
import { ResultatController } from "./controllers/ResultatController";
import { FichierLectureService } from "./services/FichierLectureService";
import { AppDataSource } from './configs/base';

const FICHIER_PATH = "/home/manda/Bureau/projet_script/resultat/resultat.txt";

async function main() {
    try {
        // Vérification de l'existance du fichier
        if (!fs.existsSync(FICHIER_PATH)) {
            throw new Error("Fichier introuvable : " + FICHIER_PATH);
        }

        await AppDataSource.initialize();
        console.log("Connecté à la base de données !");
        
        const fichierLectureService = new FichierLectureService();
        const resultatService = new ResultatService(fichierLectureService);
        const controller = new ResultatController(resultatService)
        

        // Import données
        const importDonnee = controller.importData(FICHIER_PATH)

        // Récupérer toutes les données
        const all = await controller.lireDonnee();
        console.log("Les données dans la base : ", all);

    }catch (error: any) {
        console.error("Erreur !", error);
        process.exit(1)
    }
}

main();