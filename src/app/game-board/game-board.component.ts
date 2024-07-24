import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  players: Player[] = [];
  currentRound: number = 0;
  totalRounds: number = 5;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
    }
  }

  nextRound() {
    this.currentRound++;
    if (this.currentRound >= this.totalRounds) {
      this.calculateTotalScores();
      this.router.navigate(['/game-results']);
    }
  }

  calculateTotalScores() {
    this.players.forEach(player => {
      player.totalScore = player.scores.reduce((acc, score) => acc + (score || 0), 0);
    });
    localStorage.setItem('players', JSON.stringify(this.players));
  }
}
