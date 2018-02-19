import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import {
  Player,
  GameEntry
} from '../model';

import {Observable} from 'rxjs/Rx';

const WRITE_SECONDS = 30;

@Component({
  selector: 'app-game-time',
  templateUrl: './game-time.component.html',
  styleUrls: ['./game-time.component.css'],
})
export class GameTimeComponent implements OnInit {

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

  constructor() {}

  ngOnInit() {
    let elem = this.entryTableElement.nativeElement;
    window.setInterval(function() {
      elem.scrollTop = elem.scrollHeight;
    }, 100);
  }

  tick(a) {
    this.progressBarValue -= (100/WRITE_SECONDS);
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
  }

  keyFunction(e) {
    if (e.key === "Enter") {
      if (this.state === "typing") {
        this.state = "waiting";
        this.entries.push(new GameEntry(this.players[this.currentPlayer], this.textarea));
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
}
