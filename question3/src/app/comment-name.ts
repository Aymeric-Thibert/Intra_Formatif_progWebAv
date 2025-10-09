import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nomDansComment(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const comment = control.get('comment');
        const nom = control.get('nom');

        if (!comment) return null;
        if (!nom) return null;

        const estValide = !comment.value.includes(nom.value);

        if (!estValide) {
            comment.setErrors({ ...comment.errors, nomDansComment: true });
        } else {
            if (comment.errors) {
                const { nomDansComment, ...others } = comment.errors;
                comment.setErrors(Object.keys(others).length ? others : null);
            }
        }

        return estValide ? null : { nomDansComment: true };
    };
}