import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // url: string = "/assets/json/ctscans.json";
  url: string = "https://api.gxpprime.ml"
  breadcrumbArray: Array<string> = [];
  allParts: Array<object> = [];
  assemblyComponents: Array<object> = [];

  constructor(private http: Http) { }

  setParts() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + '/api/Part', {headers: headers}).subscribe(data => {
        this.allParts = JSON.parse(data["_body"])
        resolve(this.allParts);
      }, error => {
        reject(error);
      })
    })
  }

  getParts() {
    return this.allParts;
  }

  getAssembly() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + '/api/Assembly', {headers: headers}).subscribe(data => {
        let temp = <Array<object>>JSON.parse(data["_body"])
        resolve(temp)
      }, error => {
        reject(error);
      })
    })
  }

  getChildComponent(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + '/api/Assembly/' + id, {headers: headers}).subscribe(data => {
        resolve(JSON.parse(data["_body"]))
      }, error => {
        reject(error);
      })
    })
  }

  setAssemblyComponents(array) {
    this.assemblyComponents = array;
  }

  getAssemblyComponents() {
    return this.assemblyComponents;
  }

  performTransaction(jsonObj, endpoint) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/api' + endpoint, jsonObj, {headers: headers});
  }

  createAssembly(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/api/Assembly', data, {headers: headers});
  }

  getAuditorQualityData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + '/api/queries/getQualityCheckTransactions', {headers: headers})
  }

  getAuditorAssemblyData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + '/api/queries/getAssemblingTransactions', {headers: headers})
  }

  getAuditorProcurementData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + '/api/queries/getProcuringTransactions', {headers: headers})
  }

  getAuditorManufacturingData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + '/api/queries/getManufacturingTransactions', {headers: headers})
  }



  getDashboardData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url, {headers: headers});
  }

  getAuditorData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('/assets/json/auditor.json', {headers: headers});
  }

  setBreadcrumbArray(partNum) {
    this.breadcrumbArray.push(partNum);
  }

  getBreadcrumbArray() {
    return this.breadcrumbArray;
  }

  removeBreadcrumbArray() {
    this.breadcrumbArray.pop();
  }
}
