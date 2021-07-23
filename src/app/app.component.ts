import { Component } from '@angular/core';
import {Player, Settings} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state = 'addplayers';
  players: Array<Player> = []; // [new Player("Twilight Sparkle", "#BD9E2D"), new Player("Applejack", "#9C5CA8")];
  settings: Settings = new Settings(
    false,
    45
  );

  startGame(event) {
    this.players = event;
    this.state = 'gametimestarted';
  }

  refreshSettings(event) {
    this.settings = event;
  }
}
