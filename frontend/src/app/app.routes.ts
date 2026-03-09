import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { EngagementComponent } from './components/engagement/engagement.component';

export const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: 'engagement', component: EngagementComponent },
  { path: '**', redirectTo: '' },
];
