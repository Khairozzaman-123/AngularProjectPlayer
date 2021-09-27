import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerCreateComponent } from './components/player/player-create/player-create.component';
import { PlayerEditComponent } from './components/player/player-edit/player-edit.component';
import { PlayerViewComponent } from './components/player/player-view/player-view.component';
import { HomeComponent } from './components/home/home.component';
import { SportViewComponent } from './components/sport/sport-view/sport-view.component';
import { SportCreateComponent } from './components/sport/sport-create/sport-create.component';
import { SportEditComponent } from './components/sport/sport-edit/sport-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sport', component: SportViewComponent },
  { path: 'add-sport', component: SportCreateComponent },
  { path: 'edit-sport/:id', component: SportEditComponent },
  { path: 'player', component: PlayerViewComponent },
  { path: 'add-player', component: PlayerCreateComponent },
  { path: 'edit-player/:id', component: PlayerEditComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
