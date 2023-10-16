import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppParameter } from '../../../models/AppParameter.model';
import { Table } from '../../../models/Table.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TablesService} from "../../../services/tables.service";
import {DelayService} from "../../../services/delay.service";



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
  addTable : boolean =false;
  addtableForm: FormGroup = this.fb.group({
    tableNumber : [1, Validators.min(1)]
  });

  constructor(
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private tablesService : TablesService,
    private delayService : DelayService) {}


  ngOnInit(): void {
    this.tables$ = this.tablesService.getAllTables();
    console.log(this.tables$);
    this.interDishDelay$ = this.delayService.getInterDishDelay();
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
      this.delayService.updateDelay(id,updatedDelay).subscribe(
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
      this.tablesService.updateTable(id,updatedTable).subscribe(
        () => {
          this.editTableId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la table : ', error);
        }
      );
    }
  }

  addNewTable() {
    const newTable = this.addtableForm.value;
    this.tablesService.createTable(newTable).subscribe(()=>{
      this.addTable = false;
      this.tables$ = this.tablesService.getAllTables();
    }, (error) => {
      console.error('Erreur lors de la création de la table : ', error);
    })
  }

  startAddTable() {
    this.addTable = true;
  }

  cancelAddTable() {
    this.addTable = false;
  }

  deleteTable(id: number | null) {
    if (id !=null){
      this.tablesService.deleteTableById(id).subscribe(()=>{
        this.tables$ = this.tablesService.getAllTables();
      })
    }

  }
}
