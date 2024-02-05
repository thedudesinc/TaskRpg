import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestTileComponent } from './quest-tile.component';

describe('QuestTileComponent', () => {
  let component: QuestTileComponent;
  let fixture: ComponentFixture<QuestTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
