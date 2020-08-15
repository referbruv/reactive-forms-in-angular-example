import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class AuthService {

    logout() {
        if (localStorage.getItem(AuthService.LOCAL_STORAGE_KEY_USER) != null)
            localStorage.removeItem(AuthService.LOCAL_STORAGE_KEY_USER);
        this.userLoginSubject.next(false);
    }

    private apiUri = "http://localhost:3000/api";
    private isLoggedInUser = false;
    private userLoginSubject = new Subject<boolean>();
    private static LOCAL_STORAGE_KEY_USER = "LoggedInUser";

    constructor(private http: HttpClient) { }

    //{ [key: string]: boolean } for dynamic object
    checkIfEmailAlreadyTaken(email: string): Observable<boolean> {
        return this.http.post<EmailCheckResponse>(`${this.apiUri}/auth/isuniquemail`, {
            "EmailAddress": email
        }).pipe(map((res) => {
            return res.res;
        }));
    }

    getUserLoggedInEvents(): Observable<boolean> {
        return this.userLoginSubject.asObservable();
    }

    signUp(user: { [key: string]: boolean }): Observable<User> {
        return this.http.post<User>(`${this.apiUri}/auth/signup`, {
            "email": user["email"],
            "password": user["password"]
        }).pipe(map((res: User) => {
            if (res != null) {
                // USER IS AUTHENTICATED HERE
            }
            return res;
        }));
    }

    isUserLoggedIn() {
        return this.isLoggedInUser || localStorage.getItem(AuthService.LOCAL_STORAGE_KEY_USER) != null;
    }
}

export interface EmailCheckResponse {
    res: boolean;
}

export interface User {
    email: string;
    password: string;
    id: string;
}