import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface FlightApiResults {
	id: number
	category: string
	comments: string[]
	favorite: boolean
	imageUrl: string
	price: number
	title: string
}
export interface Pokemons {
	name: string;
	url: string;
}
export interface Pokemon {
	id: number;
	name: string;
}
export interface PokemonApiResults {
	count: number;
	next: string;
	previous: string | null;
	results: Pokemons[];
}
export interface PokemonApiResult {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: {
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	
	}[];
	location_area_encounters: string;
}

@Injectable({
	providedIn: "root",
})
export class FlightService {
	constructor(private http: HttpClient) {}
	
	// Aca se declaran las funciones que llaman a la api
	getFlights(page = 1): Observable<FlightApiResults> {
		return this.http.get<FlightApiResults>(
			`${environment.baseUrl}/products`, {}
		);
	}
	getFlight(id: string): Observable<FlightApiResults> {
		return this.http.get<FlightApiResults>(
			`${environment.baseUrl}/products/${id}`,
		);
	}


	getPokemons(page = 1): Observable<PokemonApiResults> {
		console.log(
			"TCL -> file: pokemons.service.ts:46 -> PokemonService -> getPokemons -> page:",
			page,
		);
		return this.http.get<PokemonApiResults>(
			`${environment.baseUrl}/pokemon?limit=20&offset=${(page - 1) * 20}`,
			// `${environment.baseUrl}/pokemon?limit=10&offset=${page}`,
		);
	}

	getPokemon(name: string): Observable<PokemonApiResult> {
		return this.http.get<PokemonApiResult>(
			`${environment.baseUrl}/pokemon/${name}`,
		);

	}

}
