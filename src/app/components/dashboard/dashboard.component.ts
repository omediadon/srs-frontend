import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
			   imports: [
				   TitleCasePipe
			   ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
	userType: string | null = null;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.userType = this.authService.currentUserType;
	}

	logout() {
		this.authService.logout().subscribe(
			() => {
				console.log('Logout successful');
				this.router.navigate(['/']);
			},
			error => {
				console.error('Logout failed', error);
				// Handle error
			}
		);
	}
}
