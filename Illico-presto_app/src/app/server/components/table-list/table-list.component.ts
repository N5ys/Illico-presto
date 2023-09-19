import {Component, EventEmitter, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Table} from "../../../models/Table.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],


})
export class TableListComponent implements OnInit{
tables$  !: Observable<Table[]>;
myColor : string = "#fff3e8";
breakpoint!: number;

  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver, private router : Router) {}
  getAllTables(): Observable<Table[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/tables', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }
  ngOnInit(): void {
    this.tables$ = this.getAllTables();

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
  onResize(event: Event) {
    if(event && event.target){

      const windowTarget = event.target as Window;
      this.breakpoint = (windowTarget.innerWidth <= 400) ? 1 : 3;
    }

  }

  openTableMenu(table: Table) {
    this.router.navigate(['server/menu', table.id]);
  }


}
