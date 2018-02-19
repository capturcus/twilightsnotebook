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
  host: { '(window:keydown)': 'keyDown($event)' },
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

  controlDown: boolean = false;

  storyExported: boolean = false;

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
    if (e.key === "Control") {
      this.controlDown = false;
      return;
    }
    if (e.key === "Enter") {
      if (this.state === "typing" && this.controlDown) {
        this.state = "waiting";
        this.entries.push(new GameEntry(this.players[this.currentPlayer], this.textarea.replace("\n", " ")));
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
}
