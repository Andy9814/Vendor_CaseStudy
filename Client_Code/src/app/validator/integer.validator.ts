import { AbstractControl } from '@angular/forms';
export function ValidateInteger(control: AbstractControl) {
    const INTEGER_REGEXP = /^\d+$/;
    return !INTEGER_REGEXP.test(control.value) ? { invalidInteger: true } : null;
} // ValidateInteger