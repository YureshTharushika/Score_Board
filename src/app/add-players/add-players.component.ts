import { Component } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatChipsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-players.component.html',
  styleUrl: './add-players.component.css'
})
export class AddPlayersComponent {

  constructor(private router: Router, public dialog: MatDialog) {}

  openAddPlayerDialog() {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      width: '300px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.startGame) {
        this.router.navigate(['/game-board']);
      }
    });
  }
}
