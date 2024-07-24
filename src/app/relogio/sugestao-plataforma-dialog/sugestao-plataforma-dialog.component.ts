import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sugestao-plataforma-dialog',
  templateUrl: './sugestao-plataforma-dialog.component.html',
  styleUrls: ['./sugestao-plataforma-dialog.component.scss']
})
export class SugestaoPlataformaDialogComponent {

  constructor(private dialogRef: MatDialogRef<SugestaoPlataformaDialogComponent>){}

  onConfirm(): void {
    this.dialogRef.close();
  }
}
