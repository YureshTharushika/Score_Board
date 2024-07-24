import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, FormsModule,  MatTableModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  players: Player[] = [];
  currentRound: number = 0;
  totalRounds: number = 5;
  dataSource: number[] = [];
  displayedColumns: string[] = ['round']; // Initialize with round column

  constructor(private router: Router) {}

  ngOnInit() {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
      this.initializeRounds();
      this.updateDisplayedColumns();
      this.updateDataSource();
    }
  }

  initializeRounds() {
    this.dataSource = Array.from({ length: this.totalRounds }, (_, i) => i + 1);
    this.players.forEach(player => {
      player.scores = Array(this.totalRounds).fill(null); // Initialize scores with null
    });
  }

  updateDisplayedColumns() {
    this.displayedColumns = ['round', ...this.players.map(player => player.name)];
  }

  updateDataSource() {
    this.dataSource = Array.from({ length: this.currentRound + 1 }, (_, i) => i + 1);
  }

  nextRound() {
    if (this.currentRound < this.totalRounds - 1) {
      this.currentRound++;
      this.updateDataSource();
    } else {
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
