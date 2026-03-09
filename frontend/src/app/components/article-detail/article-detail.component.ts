import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-detail',
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  article = signal<Article | null>(null);
  loading = signal(true);
  error = signal('');
  newComment = { body: '', author_name: '' };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadArticle(id);
  }

  loadArticle(id: number): void {
    this.loading.set(true);
    this.api.getArticle(id).subscribe({
      next: article => {
        this.article.set(article);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load article');
        this.loading.set(false);
      }
    });
  }

  addComment(): void {
    const article = this.article();
    if (!article) return;
    this.error.set('');
    this.api.createComment(article.id, this.newComment).subscribe({
      next: () => {
        this.newComment = { body: '', author_name: '' };
        this.loadArticle(article.id);
      },
      error: () => this.error.set('Failed to add comment')
    });
  }
}
