import { FichierLectureService } from "./FichierLectureService";

export class ResultatService {
    private fichierParser = new FichierLectureService();
    
    constructor(fichierParser: FichierLectureService) {
        this.fichierParser = fichierParser;
    }

    // Methode pour lire le fichier
    public async lireData(fichierPath: string) {
        // Parser le fichier avec la méthode dans FichierLectureService
        const resultats = this.fichierParser.parseFichier(fichierPath);
        console.log(`Les données : ${JSON.stringify(resultats, null, 2)}`);

        
    }
}