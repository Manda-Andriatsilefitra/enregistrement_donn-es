import { AppDataSource } from "../configs/base";
import { Resultat } from "../entity/Resultat";
import { ClearDonnees } from "./ClearDonnees";
import { FichierLectureService } from "./FichierLectureService";

export class ResultatService {
    private fichierParser: FichierLectureService;
    private suppr = new ClearDonnees();
    
    constructor(fichierParser: FichierLectureService) {
        this.fichierParser = fichierParser;
        this.initialize(); // Initialisation au constructeur
    }

    private async initialize() {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    }

    public async lireImportDonnee(fichier: string): Promise<Resultat[]> {
        try {
            // 1. Parser le fichier
            const resultats = this.fichierParser.parseFichier(fichier);
            console.log(`Données récupérées :`, resultats);

            if (resultats.length === 0) {
                throw new Error("Aucune donnée valide trouvée !");
            }

            // 2. Vérification de la connexion
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize();
            }

            // 3. Création du repository
            const repository = AppDataSource.getRepository(Resultat);

            // 4. Sauvegarde transactionnelle
            return await AppDataSource.transaction(async (transactionalEntityManager) => {
                
                // Sauvegarde des résultats
                const sauvegarde = await transactionalEntityManager.save(Resultat, resultats);
                
                // Vider le fichier après sauvegarde réussie
                this.suppr.entete(fichier);
                
                return sauvegarde;
            });
            
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error);
            throw error;
        }
    }

    // Récupération de tous les résultats dans la base de données pour vérification de l'enrégistrement
    public async getAllResultats(): Promise<Resultat[]> {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        return AppDataSource.getRepository(Resultat).find();
    }
}
