import { Component, Input } from '@angular/core';
import { QuestTag } from 'src/app/services/enums/quest-tag.enum';
import { QuestOutput } from 'src/app/services/models/quest.model';

@Component({
  selector: 'app-quest-tile',
  templateUrl: './quest-tile.component.html',
  styleUrls: ['./quest-tile.component.scss'],
})
export class QuestTileComponent {
  @Input()
  quest?: QuestOutput;
}
