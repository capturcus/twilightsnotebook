import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Settings} from '../model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  turnTime = 45;
  showText = false;


  @Output() refreshSettings = new EventEmitter<Settings>();

  constructor() {
  }

  ngOnInit() {
  }

  acceptConfig() {
    this.refreshSettings.emit(new Settings(
      this.showText,
      this.turnTime
    ));
  }
}
