import { Comment } from './comment';

export interface Article {
  id: number;
  title: string;
  body: string;
  author_name: string;
  created_at: string;
  comment_count?: number;
  comments?: Comment[];
}
