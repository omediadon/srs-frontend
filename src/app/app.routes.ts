import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
	{
		path     : '',
		component: HomeComponent
	},
	{
		path     : 'login',
		component: LoginComponent,
		canActivate: [authGuard]
	},
	{
		path       : 'dashboard',
		component  : DashboardComponent,
		canActivate: [authGuard]
	},
	{
		path      : '**',
		redirectTo: ''
	}
];
