import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  faAnglesRight = faAnglesRight;

  @Input()
  isVisible = false;

  @Output()
  toggleEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  onToggle(): void {
    this.toggleEventEmitter.emit();
  }
}
