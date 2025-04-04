import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteButtonComponent } from './mute-button.component';

describe('MuteButtonComponent', () => {
  let component: MuteButtonComponent;
  let fixture: ComponentFixture<MuteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
