import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nomDansComment(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const nom = control.get('nom')?.value;
        const comment = control.get('comment')?.value;

        if (!nom || !comment) {
            return null;
        }

        // Vérifier si le nom (en minuscules) est présent dans le commentaire (en minuscules)
        const nomEnMinuscules = nom.toLowerCase().trim();
        const commentEnMinuscules = comment.toLowerCase();

        const nomDansComment = commentEnMinuscules.includes(nomEnMinuscules);

        return nomDansComment ? { nomDansCommentaire: true } : null;
    };
}