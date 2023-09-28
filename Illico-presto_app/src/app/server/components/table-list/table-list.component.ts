import {Component,OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Table} from "../../../models/Table.model";
import {HttpClient} from "@angular/common/http";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Router} from "@angular/router";
import {TablesService} from "../../../services/tables.service";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],


})
export class TableListComponent implements OnInit{
tables$  !: Observable<Table[]>;
breakpoint!: number;

  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver, private router : Router, private tablesService : TablesService) {}

  ngOnInit(): void {
    this.tables$ = this.tablesService.getAllTables();
    console.log(this.tables$);

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
