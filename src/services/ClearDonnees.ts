import { promises as fs } from 'fs';

export class ClearDonnees {
    public async entete(fichier: string) {
        try {
            // Lecture du fichier (retourne une Promise<string>)
            const donnees = await fs.readFile(fichier, 'utf-8');
            
            // Extraction de la première ligne
            const entete = donnees.split(/\n/)[0];
            
            // Écriture du fichier(fichier, insertion)
            fs.writeFile(fichier, `${entete}\n`);
            
            console.log('Les données supprimées à part l\'entête.');
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
}