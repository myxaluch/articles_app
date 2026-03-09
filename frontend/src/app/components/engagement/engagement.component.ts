import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Engagement } from '../../models/engagement';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-engagement',
  imports: [RouterLink, DatePipe],
  templateUrl: './engagement.component.html'
})
export class EngagementComponent implements OnInit {
  private api = inject(ApiService);

  engagement = signal<Engagement | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.api.getEngagement().subscribe({
      next: data => {
        this.engagement.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load engagement data');
        this.loading.set(false);
      }
    });
  }
}
