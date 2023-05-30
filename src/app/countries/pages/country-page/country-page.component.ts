import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(
    private router:Router,
    private activateRoute: ActivatedRoute,
    private countriesService:CountriesService ){}

  ngOnInit(): void {
    this.searchCountryById();

  }

  searchCountryById():void{
    this.activateRoute.params
      .pipe( switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),)
      .subscribe( country => {
        if( !country ){ return this.router.navigateByUrl('');}

        this.country = country;
        return;
      })
  }

}
