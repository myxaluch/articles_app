export interface Engagement {
  total_articles: number;
  total_comments: number;
  most_commented: { id: number; title: string; comment_count: number, created_at: string }[];
}
