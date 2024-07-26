import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { StalemateDialogComponent } from '../stalemate-dialog/stalemate-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  dataSource: number[] = [];
  displayedColumns: string[] = ['round']; 

  constructor(private router: Router, public dialog: MatDialog) {}

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
    this.dataSource = Array.from({ length: this.currentRound + 1 }, (_, i) => i + 1);
  
    // Ensure players have a scores array with the correct length
    this.players.forEach(player => {
      if (player.scores.length < this.currentRound + 1) {
        // Fill the scores array with nulls up to the current round index
        player.scores = [...player.scores, ...Array(this.currentRound + 1 - player.scores.length).fill(null)];
      }
    });
  }

  updateDisplayedColumns() {
    this.displayedColumns = ['round', ...this.players.map(player => player.name)];
  }

  updateDataSource() {
    this.dataSource = Array.from({ length: this.currentRound + 1 }, (_, i) => i + 1);
  }

  nextRound() {
    if (this.validateScores()) {
      this.currentRound++;
      this.updateDataSource();
    } else {
      alert('Two or more players cannot have zero scores in the same round.');
    }
  }

  validateScores(): boolean {
    // Check if any two players have zero scores in the current round
    const scoresInCurrentRound = this.players.map(player => player.scores[this.currentRound + 1] || 0);
    console.log(this.currentRound);
    console.log(scoresInCurrentRound);
    return scoresInCurrentRound.filter(score => score === 0).length <= 1;
  }

  calculateTotalScores() {
    this.players.forEach(player => {
      player.totalScore = player.scores.reduce((acc, score) => acc + (score || 0), 0);
    });
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  stalemate() {
    const dialogRef = this.dialog.open(StalemateDialogComponent, {
      width: '250px',
      data: { players: this.players }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.players.forEach((player, index) => {
          player.scores[this.currentRound] = result[index];
        });
        this.calculateTotalScores();
        this.router.navigate(['/game-results']);
      }
    });
  }

  getTotalScore(player: Player): number {
    return player.scores.reduce((acc, score) => acc + (score || 0), 0);
  }


  finishGame() {
    this.calculateTotalScores();
    this.router.navigate(['/game-results']);
  }
  
  
}
