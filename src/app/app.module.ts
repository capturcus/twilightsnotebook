import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AddPlayersComponent } from './add-players/add-players.component';
import { GameTimeComponent } from './game-time/game-time.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPlayersComponent,
    GameTimeComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
