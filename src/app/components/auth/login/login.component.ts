import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
			   selector   : 'app-login',
			   standalone : true,
			   imports    : [
				   FormsModule
			   ],
			   templateUrl: './login.component.html',
			   styleUrl   : './login.component.scss'
		   })
export class LoginComponent{
	email: string    = '';
	password: string = '';
	userType: string = '';

	constructor(private authService: AuthService, private router: Router){
	}

	onSubmit(){
		this.authService.login(this.email, this.password, this.userType)
			.subscribe(response => {
				console.log('Login successful', response);
				this.router.navigate(['/dashboard']);
			}, error => {
				console.error('Login failed', error);
			});
	}
}
