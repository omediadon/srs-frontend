import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProductsService} from "../../../services/products.service";
import {catchError, debounceTime, distinctUntilChanged, of, Subject, Subscription, switchMap, tap} from "rxjs";
import {Product} from "../../../dto/product.dto";

@Component({
			   selector   : 'app-product-search',
			   standalone : true,
			   imports    : [
				   NgForOf,
				   NgIf
			   ],
			   templateUrl: './product-search.component.html',
			   styleUrl   : './product-search.component.scss'
		   })
export class ProductSearchComponent implements OnInit, OnDestroy{
	searchTerm          = new Subject<string>();
	products: Product[] = [];
	isLoading           = false;
	subscription?: Subscription;

	constructor(private productService: ProductsService){
	}

	ngOnInit(){
		this.subscription = this.searchTerm.pipe(debounceTime(1000), distinctUntilChanged(),
												 tap(() => this.isLoading = true),
												 switchMap(term => this.productService.searchProducts(term)
																	   .pipe(catchError(err => {
																		   if(err.status === 404){
																			   return of({products: []});
																		   }
																		   else{
																			   throw err;
																		   }
																	   }))), tap(() => this.isLoading = false))
								.subscribe(results => this.products = results.products);

	}

	ngOnDestroy(){
		if(this.subscription){
			this.subscription.unsubscribe();
		}
	}

	onSearchTermChange(term: string){
		this.searchTerm.next(term);
	}
}
