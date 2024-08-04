import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.css'
})
export class GameResultsComponent implements OnInit{

  players: Player[] = [];
  winner: Player | null = null;
  displayedColumns: string[] = ['name', 'totalScore'];

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
      this.calculateWinner();
      this.sortPlayersByScore();
      this.launchConfetti();
    }
  }

  calculateWinner() {
    this.winner = this.players.reduce((prev, current) => (prev.totalScore! < current.totalScore!) ? prev : current);
  }

  sortPlayersByScore() {
    this.players.sort((a, b) => a.totalScore! - b.totalScore!);
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  startNewGame() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Start new game with the same players
        this.players.forEach(player => {
          player.scores = [];
          player.totalScore = 0;
        });
        localStorage.setItem('players', JSON.stringify(this.players));
        this.router.navigate(['/game-board']);
      } else {
        
        localStorage.removeItem('players');
        this.router.navigate(['/']);
      }
    });
  }
}
