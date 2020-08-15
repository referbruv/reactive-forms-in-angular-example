import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedInUser: boolean;
  authSubs: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoggedInUser = this.auth.isUserLoggedIn();
    this.authSubs = this.auth.getUserLoggedInEvents().subscribe((loggedInStatus: boolean) => {
      this.isLoggedInUser = loggedInStatus;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth', 'signup']);
  }

}
