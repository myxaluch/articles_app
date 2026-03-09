import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-list',
  imports: [RouterLink, DatePipe, FormsModule],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  private api = inject(ApiService);

  articles = signal<Article[]>([]);
  loading = signal(true);
  error = signal('');
  showForm = signal(false);
  newArticle = { title: '', body: '', author_name: '' };

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading.set(true);
    this.api.getArticles().subscribe({
      next: articles => {
        this.articles.set(articles);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load articles');
        this.loading.set(false);
      }
    });
  }

  toggleForm(): void {
    this.showForm.update(v => !v);
  }

  createArticle(): void {
    this.error.set('');
    this.api.createArticle(this.newArticle).subscribe({
      next: () => {
        this.newArticle = { title: '', body: '', author_name: '' };
        this.showForm.set(false);
        this.loadArticles();
      },
      error: () => this.error.set('Failed to create article')
    });
  }
}
