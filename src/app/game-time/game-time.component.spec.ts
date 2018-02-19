import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTimeComponent } from './game-time.component';

describe('GameTimeComponent', () => {
  let component: GameTimeComponent;
  let fixture: ComponentFixture<GameTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
