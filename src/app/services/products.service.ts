import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {SuggestionList} from "../dto/suggestion.list.dto";
import {ProductSearchResult} from "../dto/product.dto";

@Injectable({
				providedIn: 'root'
			})
export class ProductsService{
	private apiUrl = 'http://127.0.0.1/api';

	constructor(private http: HttpClient, private authService: AuthService){
	}

	getSuggestions(): Observable<SuggestionList>{
		const headers = new HttpHeaders({
											'Authorization': `Bearer ${this.authService.currentToken}`
										});
		return this.http.get<SuggestionList>(`${this.apiUrl}/brand/suggest`, {headers});
	}

	searchProducts(term: string): Observable<ProductSearchResult>{
		const headers = new HttpHeaders({
											'Authorization': `Bearer ${this.authService.currentToken}`
										});
		return this.http.post<ProductSearchResult>(`${this.apiUrl}/products/search`, {term}, {headers});
	}
}
