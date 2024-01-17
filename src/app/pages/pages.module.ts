import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestDashboardComponent } from './quest-dashboard/quest-dashboard.component';
import { StoreComponent } from './store/store.component';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';

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
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class PagesModule {}
