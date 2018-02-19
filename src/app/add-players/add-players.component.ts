import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../model';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent implements OnInit {

  players: Array<Player> = [];
  ponyName: string;
  color: string = this.getRandomColor();

  @Output() startGame = new EventEmitter<Array<Player>>();

  constructor() { 
  }

  ngOnInit() {
  }

  getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addPony() {
    var newPony = new Player(this.ponyName, this.color);
    this.players.push(newPony);
    this.color = this.getRandomColor();
    this.ponyName = "";
  }

  gallop() {
    this.startGame.emit(this.players);
  }
}
