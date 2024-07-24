import { Routes } from '@angular/router';
import { AddPlayersComponent } from './add-players/add-players.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameResultsComponent } from './game-results/game-results.component';

export const routes: Routes = [
    { path: '', component: AddPlayersComponent },
    { path: 'game-board', component: GameBoardComponent },
    { path: 'game-results', component: GameResultsComponent },
];
