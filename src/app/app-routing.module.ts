import { HomePageComponent } from './shared/pages/home-Page/homePage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './shared/pages/about-Page/aboutPage.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { CountriesRoutingModule } from './countries/countries-routing.module';

const routes:Routes = [
  // { path: '', component: HomePageComponent,},
  { path: 'about', component: AboutPageComponent,},
  { path: 'contact', component: ContactPageComponent,},
  { path: 'countries', loadChildren: () => import('./countries/countries.module').then( ( m ) => m.CountriesModule )},
  { path: '**',  redirectTo: 'countries' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CountriesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
