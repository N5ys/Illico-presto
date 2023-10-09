import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {
  DeleteConfirmationDialogComponent
} from "../../../admin/components/delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: 'app-confirm-served-product-dialog',
  templateUrl: './confirm-served-product-dialog.component.html',
  styleUrls: ['./confirm-served-product-dialog.component.scss']
})
export class ConfirmServedProductDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  confirmService(): void {
    this.dialogRef.close('confirm');
  }

  cancelService(): void {
    this.dialogRef.close('cancel');
  }
}
