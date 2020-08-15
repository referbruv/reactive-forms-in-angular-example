import { AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export function checkIfPasswordsMatchValidator(c: AbstractControl) {
    if (c.get('password').value === c.get('retypepassword').value)
        return null;
    else
        return { 'passwordsMatch': false };
}

@Injectable({ providedIn: "root" })
export class CheckIfEmailExistsValidator {
    constructor(private authService: AuthService) { }

    checkIfEmailAlreadyTaken(email: string): Observable<boolean> {
        return this.authService.checkIfEmailAlreadyTaken(email);
    }
}