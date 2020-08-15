import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "signup", component: SignupComponent },
    { path: "", component: SignupComponent }
];

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AuthModule { }