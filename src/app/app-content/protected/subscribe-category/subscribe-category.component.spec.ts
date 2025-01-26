import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeCategoryComponent } from './subscribe-category.component';

describe('SubscribeCategoryComponent', () => {
  let component: SubscribeCategoryComponent;
  let fixture: ComponentFixture<SubscribeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
