import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isloading = false;
  public initialValue: string = '';

  constructor( private contriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.contriesService.cacheStore.byCapital.countries;
    this.initialValue = this.contriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ):void{
    this.isloading = true;

    this.contriesService.searchCapital( term )
      .subscribe( ( countries ) => {
        this.countries = countries
        this.isloading = false;
      })

  }
}
