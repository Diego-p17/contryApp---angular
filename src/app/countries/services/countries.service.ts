import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital:   {term:'', countries: []},
    byCountries: {term:'', countries: []},
    byRegion:    {region: '', countries: []},
  };

  constructor(private http:HttpClient) {
    this.loadToLocalStorage();
  }


  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify( this.cacheStore ))
  }
  private loadToLocalStorage(){
    if( !localStorage.getItem('cacheStorage')){ return;}
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStorage')!);
  }

  private getCountriesRequest( url:string ):Observable<Country[]>{
    return this.http.get<Country[]>( url ).pipe(
      catchError( error => of([]) ),
      );
  }

  searchCapital( query : string ): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${ query }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term:query,countries: countries} ),
        tap( countries => this.saveToLocalStorage())
        );
  }

  searchCountry( query : string ): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${ query }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = {term:query,countries: countries} ),
        tap( countries => this.saveToLocalStorage())
        );
  }

  searchRegion( query : Region ): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${ query }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = {region:query,countries: countries} ),
        tap( countries => this.saveToLocalStorage())
        );
  }

  searchCountryByAlphaCode( code: string ):Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${ code }`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( error => of(null) )
      )
  }
}
