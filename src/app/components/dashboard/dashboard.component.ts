import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe} from "@angular/common";
import {SuggestionsComponent} from "../partials/suggestions/suggestions.component";
import {ProductSearchComponent} from "../partials/product-search/product-search.component";

@Component({
			   selector   : 'app-dashboard',
			   standalone : true,
			   imports    : [
				   TitleCasePipe,
				   RouterLink,
				   NgSwitch,
				   SuggestionsComponent,
				   NgSwitchCase,
				   NgSwitchDefault,
				   ProductSearchComponent
			   ],
			   templateUrl: './dashboard.component.html',
			   styleUrl   : './dashboard.component.scss'
		   })
export class DashboardComponent implements OnInit{
	userType: string | null = null;

	constructor(private authService: AuthService, private router: Router){
	}

	ngOnInit(){
		this.userType = this.authService.currentUserType;
	}

	logout(){
		this.authService.logout()
			.subscribe(() => {
				console.log('Logout successful');
				this.router.navigate(['/']);
			}, error => {
				console.error('Logout failed', error);
			});
	}
}
