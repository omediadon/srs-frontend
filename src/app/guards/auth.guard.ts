import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router      = inject(Router);
	if(authService.isLoggedIn){
		if(route.url[0].path === 'login'){
			router.navigate(['/dashboard']);
			return false;
		}
		return true;
	}
	else{
		router.navigate(['/login']);
		return false;
	}
};
