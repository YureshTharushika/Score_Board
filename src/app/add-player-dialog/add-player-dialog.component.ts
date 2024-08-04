import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../models/player';

@Component({
  selector: 'app-add-player-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-player-dialog.component.html',
  styleUrl: './add-player-dialog.component.css'
})
export class AddPlayerDialogComponent {

  playerName: string = '';
  players: Player[] = [];

  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>) {}

  addPlayer() {
    const trimmedName = this.playerName.trim();
    if (trimmedName && !this.players.some(player => player.name.toLowerCase() === trimmedName.toLowerCase())) {
      const capitalizedPlayerName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
      this.players.push({ name: capitalizedPlayerName, scores: [] });
      this.playerName = '';
    }
  }

  removePlayer(index: number) {
    this.players.splice(index, 1);
  }

  startGame() {
    localStorage.setItem('players', JSON.stringify(this.players));
    this.dialogRef.close({ startGame: true });
  }


}
