import { ResultatService } from "../services/ResultatService";

export class ResultatController {
    private resultatService: ResultatService;

    // Construncteur de la classe
    constructor(resultatService: ResultatService) {
        this.resultatService = resultatService;
    }

    // Methode pour appeler la méthode lireData dans resultatService
    public async lireData(fichierPath: string) {
        return this.resultatService.lireData(fichierPath);
    }
}