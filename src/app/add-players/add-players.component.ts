import { Component } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-players.component.html',
  styleUrl: './add-players.component.css'
})
export class AddPlayersComponent {

  playerName: string = '';
  players: Player[] = [];

  constructor(private router: Router) {}

  addPlayer() {
    if (this.players.length < 8) {
      this.players.push({ name: this.playerName, scores: [], totalScore: 0 });
      this.playerName = '';
    }
  }

  startGame() {
    localStorage.setItem('players', JSON.stringify(this.players));
    this.router.navigate(['/game-board']);
  }
}
