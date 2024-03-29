import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPlayersComponent } from './add-players.component';

describe('AddPlayersComponent', () => {
  let component: AddPlayersComponent;
  let fixture: ComponentFixture<AddPlayersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
