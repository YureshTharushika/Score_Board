import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stalemate-dialog',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './stalemate-dialog.component.html',
  styleUrl: './stalemate-dialog.component.css'
})
export class StalemateDialogComponent {

  leftoverCardsSum: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<StalemateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.leftoverCardsSum = new Array(data.players.length).fill(null);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.leftoverCardsSum.every(sum => sum !== null && sum > 0)) {
      this.dialogRef.close(this.leftoverCardsSum);
    }
  }

  isSubmitDisabled(): boolean {
    return this.leftoverCardsSum.some(sum => sum === null || sum <= 0);
  }
}
