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


@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatChipsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-players.component.html',
  styleUrl: './add-players.component.css'
})
export class AddPlayersComponent {

  playerName: string = '';
  players: Player[] = [];

  constructor(private router: Router) {}

  addPlayer() {

    if (this.playerName.trim() === '' || this.players.some(player => player.name === this.playerName.trim())) {
      // Prevent adding empty or duplicate player names
      return;
    }
    this.players.push({ name: this.playerName.trim(), scores: [] }); // Initialize scores as an empty array
    this.playerName = ''; // Clear input after adding
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  removePlayer(index: number) {
    this.players.splice(index, 1);
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  startGame() {
    localStorage.setItem('players', JSON.stringify(this.players));
    this.router.navigate(['/game-board']);
  }
}
