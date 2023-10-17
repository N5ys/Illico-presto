import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-session-expired-dialog',
  templateUrl: './session-expired-dialog.component.html',
  styleUrls: ['./session-expired-dialog.component.scss']
})
export class SessionExpiredDialogComponent {
  constructor(public dialogRef: MatDialogRef<SessionExpiredDialogComponent>, private dialog: MatDialog) {
  }
  

}
