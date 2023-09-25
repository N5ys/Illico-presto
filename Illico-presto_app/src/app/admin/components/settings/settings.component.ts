import {Component, OnInit} from '@angular/core';
import {AppParameter} from "../../../models/AppParameter.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Table} from "../../../models/Table.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  interDishDelay$!: Observable<AppParameter[]>;
  breakpoint!: number;
  editingDelayId!: number | null;

  constructor(private http : HttpClient, private breakpointObserver: BreakpointObserver) {
  }
  getInterDishDelay() : Observable<AppParameter[]>{
    const headers : HttpHeaders = new HttpHeaders({
      'accept' : 'application/ld+json'
    });
    return this.http.get<any>('http://127.0.0.1:8000/api/app_parameters', {headers}).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  getAllTables(): Observable<Table[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/tables', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }
  ngOnInit(): void {
    this.interDishDelay$ = this.getInterDishDelay();
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.breakpoint = 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.breakpoint = 2;
        }
        if (result.breakpoints[Breakpoints.Medium] || result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
          this.breakpoint = 3;
        }
      }
    });
  }


  updateDelay(id: number | null) {

  }

  startEditDelay(id: number | null) {
    this.editingDelayId = id;
  }
}
