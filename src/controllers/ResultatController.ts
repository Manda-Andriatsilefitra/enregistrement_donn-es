import { Resultat } from "../entity/Resultat";
import { ResultatService } from "../services/ResultatService";

export class ResultatController {
    private resultatService: ResultatService;

    // Construncteur de la classe
    constructor(resultatService: ResultatService) {
        this.resultatService = resultatService;
    }

    // Methode pour appeler la méthode lireData dans resultatService
    public async importData(fichier: string) {
        return this.resultatService.lireImportDonnee(fichier);
    }

    public async lireDonnee(): Promise<Resultat[]> {
        return this.resultatService.getAllResultats();
    }
}