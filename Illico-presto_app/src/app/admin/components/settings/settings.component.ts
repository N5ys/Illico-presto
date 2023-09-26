import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppParameter } from '../../../models/AppParameter.model';
import { Table } from '../../../models/Table.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],

})
export class SettingsComponent implements OnInit {
  interDishDelay$!: Observable<AppParameter[]>;
  tables$!: Observable<Table[]>;
  breakpoint!: number;

  editingDelayId: number | null = null;
  delayForm!: FormGroup;
  editTableId: number | null = null;
  tableForm: FormGroup = this.fb.group({
    tableNumber : 0
  });

  constructor(
    private http: HttpClient,private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {  }

  getInterDishDelay(): Observable<AppParameter[]> {
    const headers: HttpHeaders = new HttpHeaders({
      accept: 'application/ld+json',
    });
    return this.http.get<any>('http://127.0.0.1:8000/api/app_parameters', {
      headers,
    }).pipe(
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
    this.tables$ = this.getAllTables();
    console.log(this.tables$);
    this.interDishDelay$ = this.getInterDishDelay();
    this.delayForm = this.fb.group({
      interdishDelay : [null, Validators.min(1)]
    });

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe((result) => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.breakpoint = 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.breakpoint = 3;
        }
        if (
          result.breakpoints[Breakpoints.Medium] ||
          result.breakpoints[Breakpoints.Large] ||
          result.breakpoints[Breakpoints.XLarge]
        ) {
          this.breakpoint = 6;
        }
      }
    });
  }

  startEditDelay(id: number | null) {
    this.editingDelayId = id;
  }

  saveDelay(id: number | null) {
    if (id !== null && this.delayForm.valid) {
      const updatedDelay = this.delayForm.value;
      console.log(updatedDelay);
      const headers = new HttpHeaders({
        'Content-Type': 'application/ld+json',
        'accept': 'application/json',
      });
      this.http.put(
        `http://127.0.0.1:8000/api/app_parameters/${id}`,
        updatedDelay,
        { headers }
      ).subscribe(
        () => {
          this.editingDelayId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du délai : ', error);
        }
      );
    }
  }

  startEditTable(tableId: number | null) {
    this.editTableId = tableId;
  }

  saveTable(id: number | null) {
    if (id !== null) {
      const updatedTable = this.tableForm.value;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.http.put<any>(`http://127.0.0.1:8000/api/tables/${id}`, updatedTable, {
        headers,
      }).subscribe(
        () => {
          this.editTableId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la table : ', error);
        }
      );
    }
  }
}
