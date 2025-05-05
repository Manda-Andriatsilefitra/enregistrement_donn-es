import 'reflect-metadata';
import * as fs from "fs";
import { ResultatService } from "./services/ResultatService";
import { ResultatController } from "./controllers/ResultatController";
import { FichierLectureService } from "./services/FichierLectureService";

const FICHIER_PATH = "/home/manda/Bureau/projet_script/resultat/resultat.txt";

async function main() {
    try {
        // Vérification de l'existance du fichier
        if (!fs.existsSync(FICHIER_PATH)) {
            throw new Error("Fichier introuvable : " + FICHIER_PATH);
        }
        const fichierLectureService = new FichierLectureService();
        const resultatService = new ResultatService(fichierLectureService);
        const controller = new ResultatController(resultatService)
        

        // Test parser
        const testParse = controller.lireData(FICHIER_PATH)
    }catch (error: any) {
        console.error("Erreur !", error);
        process.exit(1)
    }
}

main();