import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.css'
})
export class GameResultsComponent implements OnInit{

  players: Player[] = [];
  winner: Player | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
      this.calculateWinner();
    }
  }

  calculateWinner() {
    this.winner = this.players.reduce((prev, current) => (prev.totalScore < current.totalScore) ? prev : current);
  }

  startNewGame() {
    localStorage.removeItem('players');
    this.router.navigate(['/']);
  }
}
