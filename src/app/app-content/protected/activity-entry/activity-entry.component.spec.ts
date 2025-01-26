import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEntryComponent } from './activity-entry.component';

describe('ActivityEntryComponent', () => {
  let component: ActivityEntryComponent;
  let fixture: ComponentFixture<ActivityEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
