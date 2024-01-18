import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.scss'],
})
export class QuestDashboardComponent {
  @Input()
  isSidebarVisible = false;
}
