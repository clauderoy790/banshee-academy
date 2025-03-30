import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceButtonComponent } from './race-button.component';

describe('RaceButtonComponent', () => {
  let component: RaceButtonComponent;
  let fixture: ComponentFixture<RaceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
