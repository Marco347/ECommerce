import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "Content-type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    })
};

@Injectable({
    providedIn: 'root'
})

export class AuthentificationService {
    private user:Subject<string> = new BehaviorSubject<string>(undefined);
    private baseURL: string = "http://localhost:8888/";
    //token: string;

    constructor(private http: HttpClient) { }

    getUser() { return this.user; }

    connect(data: string) { this.user.next(data); }

    disconnect() { this.user.next(null); }

    verificationConnexion(identifiants): Observable<any> {
        if(identifiants["email"] == "cocolepolo@gmail.com"){
            identifiants["admin"] = "1";
        } 
        else{
            identifiants["admin"] = "0";
        } 
        return this.http.post(this.baseURL+'membres/connexion', JSON.stringify(identifiants), httpOptions);
    }

    getAdmin(identifiants){
        return identifiants["admin"] = "1";
    }  

    /*
    onLoadToken() {
    this.token = localStorage.getItem('access_token');
    
  }*/
}