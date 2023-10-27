import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  type: 'error' | 'success';
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  public success: string = '../../../assets/success_circle.png';
  public error: string = '../../../assets/close_circle.png';
  public message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public matDialogRef: MatDialogRef<ModalComponent>) { }

  getImage() {
    if (this.data.type === 'error') {
      return this.error;
    } else {
      return this.success;
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
