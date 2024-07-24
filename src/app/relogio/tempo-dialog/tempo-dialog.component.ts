import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Relogio } from '../relogio';

@Component({
  selector: 'app-tempo-dialog',
  templateUrl: './tempo-dialog.component.html',
  styleUrls: ['./tempo-dialog.component.scss']
})
export class TempoDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TempoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      minutos: ['', [Validators.min(0), Validators.max(59)]],
      segundos: ['', [Validators.min(0), Validators.max(59)]],
      incrementoMinutos: ['', [Validators.min(0), Validators.max(59)]],
      incrementoSegundos: ['', [Validators.min(0), Validators.max(59)]]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(x => {
      if((this.form.value.minutos === '' && this.form.value.segundos === '')
          && (this.form.value.incrementoMinutos !== '' || this.form.value.incrementoSegundos !== ''))
          this.form.get("incrementoMinutos")?.setErrors({minutos: true})
      else {
        if(this.form.invalid){
          this.form.get("incrementoMinutos")?.setErrors(null)
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as Relogio);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
