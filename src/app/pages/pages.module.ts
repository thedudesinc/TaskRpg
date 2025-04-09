import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestDashboardComponent } from './quest-dashboard/quest-dashboard.component';
import { StoreComponent } from './store/store.component';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreationModalComponent } from './character/components/creation-modal/creation-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestModalComponent } from './quest-dashboard/components/quest-modal/quest-modal.component';
import { QuestTileComponent } from './quest-dashboard/components/quest-tile/quest-tile.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'quest-dashboard/:id', component: QuestDashboardComponent },
      { path: 'quest-dashboard', component: QuestDashboardComponent },
      { path: 'store', component: StoreComponent },
      { path: 'character', component: CharacterComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  declarations: [
    CharacterComponent,
    ProfileComponent,
    QuestDashboardComponent,
    StoreComponent,
    CreationModalComponent,
    QuestModalComponent,
    QuestTileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FontAwesomeModule,
    NgComponentOutlet,
    AsyncPipe,
    DragDropModule,
  ],
})
export class PagesModule {}
