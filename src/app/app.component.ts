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
  showSettings = false;

  ngOnInit() {
    let players = localStorage.getItem("players");
    if (players !== null) {
      this.startGame(JSON.parse(players) as Array<Player>);
    }
  }

  startGame(event) {
    this.players = event;
    this.state = 'gametimestarted';
    let players = JSON.stringify(this.players);
    console.log(players);
    localStorage.setItem("players", players);
  }

  refreshSettings(event) {
    this.settings = event;
  }

  settingsClick() {
    this.showSettings = !this.showSettings;
  }
}
