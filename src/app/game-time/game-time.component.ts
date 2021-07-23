import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import {
  Player,
  GameEntry, Settings
} from '../model';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-game-time',
  templateUrl: './game-time.component.html',
  styleUrls: ['./game-time.component.css'],
  host: { '(window:keydown)': 'keyDown($event)' },
})
export class GameTimeComponent implements OnInit {

  @Input() settings: Settings;
  @Input() players: Array < Player > = [];
  entries: Array < GameEntry > = [];
  currentPlayer = 0;
  textarea: string;
  state: string = "waiting";
  @ViewChild("textArea") textAreaElement;
  @ViewChild("entryTable") entryTableElement;
  timer;
  subscription;
  progressBarValue: number = 100;

  controlDown: boolean = false;

  storyExported: boolean = false;

  constructor() {}

  ngOnInit() {
    let elem = this.entryTableElement.nativeElement;
    window.setInterval(function() {
      elem.scrollTop = elem.scrollHeight;
    }, 100);
    let story = localStorage.getItem("story");
    if (story !== null) {
      this.entries = JSON.parse(story) as Array<GameEntry>;
      this.currentPlayer = Number(localStorage.getItem("currentPlayer"));
    }
  }

  tick(a) {
    this.progressBarValue -= (100 / this.settings.turnTime);
    if (this.progressBarValue < 0) {
      alert("time's up!");
      this.state = "waiting";
      this.nextPlayer();
    }
  }

  nextPlayer() {
    this.subscription.unsubscribe();
    this.textarea = "";
    this.currentPlayer++;
    this.progressBarValue = 100;
    if (this.currentPlayer === this.players.length) {
      this.currentPlayer = 0;
    }
    localStorage.setItem("currentPlayer", this.currentPlayer.toString());
  }

  submitEntry(player: Player, text: string) {
    this.entries.push(new GameEntry(player, text));
    let story = JSON.stringify(this.entries);
    console.log(story);
    localStorage.setItem("story", story);
  }

  keyFunction(e) {
    if (e.key === "Control") {
      this.controlDown = false;
      return;
    }
    if (e.key === "Enter") {
      if (this.state === "typing" && this.controlDown) {
        this.state = "waiting";
        this.submitEntry(this.players[this.currentPlayer], this.textarea.replace("\n", " "));
        this.nextPlayer();
        return;
      }
      if (this.state === "waiting") {
        this.state = "typing";
        this.timer = Observable.timer(0,1000);
        this.subscription = this.timer.subscribe(t=> {
          this.tick(t);
        });
        return;
      }
    }
  }

  keyDown(e) {
    if (e.key === "Control") {
      this.controlDown = true;
    }
  }

  export() {
    this.storyExported = true;
  }

  resetGame() {
    localStorage.clear();
    location.reload();
  }
}
