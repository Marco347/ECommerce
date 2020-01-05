import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProduitsService {

    private urlBase: string = 'http://localhost:8888/';

    constructor(private http: HttpClient) {}

    getProduits(): Observable<any> {
        return this.http.get(this.urlBase+'produits');
    }

    getCategories(): Observable<any> {
        return this.http.get(this.urlBase+'categories');
    }

    getMateriaux(): Observable<any> {
        return this.http.get(this.urlBase+'materiaux');
    }

    getProduitParRef(ref): Observable<any> {
        return this.http.get(this.urlBase+'produits/'+ref);
    }

    getProduitsParCategorie(categorie): Observable<any>{
        return this.http.get(this.urlBase+'produits/categories/'+categorie);
    }

    getProduitParRecherche(categorie,materiau,prix1,prix2): Observable<any> {
        return this.http.get(this.urlBase+'/produits/'+categorie+'/'+materiau+'/'+prix1+'/'+prix2);
    }

    
}