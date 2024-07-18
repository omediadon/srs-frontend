import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";


interface AuthState{
	token: string | null;
	userType: string | null;
}

@Injectable({
				providedIn: 'root'
			})
export class AuthService{
	public authState: Observable<AuthState>;
	private apiUrl = 'http://127.0.0.1/api';
	private authSubject: BehaviorSubject<AuthState>;

	constructor(private http: HttpClient){
		const initialState: AuthState = {
			token   : localStorage.getItem('token'),
			userType: localStorage.getItem('userType')
		};
		this.authSubject              = new BehaviorSubject<AuthState>(initialState);
		this.authState                = this.authSubject.asObservable();
	}

	public get currentAuthState(): AuthState{
		return this.authSubject.value;
	}

	public get isLoggedIn(): boolean{
		return !!this.currentAuthState.token;
	}

	public get currentUserType(): string | null{
		return this.currentAuthState.userType;
	}

	public get currentToken(): string | null{
		return this.currentAuthState.token;
	}

	login(email: string, password: string, user_type: string): Observable<any>{
		return this.http.post<any>(`${this.apiUrl}/auth/login`, {
					   email,
					   password,
					   user_type
				   })
				   .pipe(tap(response => {
					   if(response && response.access_token){
						   const authState: AuthState = {
							   token   : response.access_token,
							   userType: user_type
						   };
						   localStorage.setItem('token', response.access_token);
						   localStorage.setItem('userType', user_type);
						   this.authSubject.next(authState);
					   }
				   }));
	}

	logout(): Observable<any>{
		const headers = new HttpHeaders({
											'Authorization': `Bearer ${this.currentAuthState.token}`
										});
		return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}, {headers})
				   .pipe(tap(() => {
					   localStorage.removeItem('token');
					   localStorage.removeItem('userType');
					   this.authSubject.next({
												 token: null,
												 userType: null
											 });
				   }));
	}

	refreshToken(): Observable<any>{
		const headers = new HttpHeaders({
											'Authorization': `Bearer ${this.currentAuthState.token}`
										});
		return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {}, {headers})
				   .pipe(tap(response => {
					   if(response && response.token){
						   const currentState        = this.currentAuthState;
						   const newState: AuthState = {
							   ...currentState,
							   token: response.token
						   };
						   localStorage.setItem('token', response.token);
						   this.authSubject.next(newState);
					   }
				   }));
	}
}
