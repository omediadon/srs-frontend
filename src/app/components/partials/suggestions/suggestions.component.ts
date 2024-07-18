import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {Supplier} from "../../../dto/supplier.dto";
import {NgForOf, NgIf} from "@angular/common";

@Component({
			   selector   : 'app-suggestions',
			   standalone : true,
			   imports: [
				   NgForOf,
				   NgIf
			   ],
			   templateUrl: './suggestions.component.html',
			   styleUrl   : './suggestions.component.scss'
		   })
export class SuggestionsComponent implements OnInit{
	suppliers: Supplier[] = [];
	isLoading             = false;

	constructor(private productService: ProductsService){
	}

	ngOnInit(){
		this.isLoading = true;
		this.productService.getSuggestions()
			.subscribe(response => {
				this.suppliers = response.suggestions;
				this.isLoading = false;
			});
	}
}
