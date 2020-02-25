import { Component } from '@angular/core';
import { BroadcastSubject, UserService } from '../services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
    public loggedin = false;
    constructor(public broadcastSubject: BroadcastSubject, public service: UserService, public router: Router) {
        if (localStorage.getItem('token')) {
            this.loggedin = true;
        }
        this.broadcastSubject.$bdcastObservable.subscribe((data) => {
            if (data.success) {
                this.loggedin = true;
            }
        });
    }
    logout() {
        this.service.logout().subscribe(() => {
            this.loggedin = false;
            this.router.navigate(['/login']);
        }, () => {
            this.loggedin = false;
            this.router.navigate(['/login']);
        });
    }
}
