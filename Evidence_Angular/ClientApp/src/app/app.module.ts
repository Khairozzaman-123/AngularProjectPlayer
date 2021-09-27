import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/shared/mat/mat.module';
import { NavComponent } from './components/shared/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { SportViewComponent } from './components/sport/sport-view/sport-view.component';
import { SportCreateComponent } from './components/sport/sport-create/sport-create.component';
import { SportEditComponent } from './components/sport/sport-edit/sport-edit.component';
import { PlayerViewComponent } from './components/player/player-view/player-view.component';
import { PlayerCreateComponent } from './components/player/player-create/player-create.component';
import { PlayerEditComponent } from './components/player/player-edit/player-edit.component';
import { DataService } from './services/data.service';
import { NotifyService } from './services/notify.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SportViewComponent,
    SportCreateComponent,
    SportEditComponent,
    PlayerViewComponent,
    PlayerCreateComponent,
    PlayerEditComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DataService, NotifyService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
