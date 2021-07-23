import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameTimeComponent } from './game-time.component';

describe('GameTimeComponent', () => {
  let component: GameTimeComponent;
  let fixture: ComponentFixture<GameTimeComponent>;

  beforeEach(waitForAsync(() => {
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
