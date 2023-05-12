import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jokes: string = "";
  isLoading: boolean = false;

  constructor(updates: SwUpdate, private _http: HttpClient) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.FetchAPI()
  }

  FetchAPI() {
    this.isLoading = true;
    this._http.get('https://api.chucknorris.io/jokes/random').subscribe({
      next: (res:any) => {
        this.isLoading = false;
        this.jokes = res.value;
      }
    })
  }
}
