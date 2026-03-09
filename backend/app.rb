require 'roda'
require 'json'
require_relative 'config'
require_relative 'models/article'
require_relative 'models/comment'

class App < Roda
  plugin :json
  plugin :json_parser
  plugin :all_verbs
  plugin :halt

  route do |r|
    r.on 'api/v1' do

      r.on 'articles' do
        r.is do
          r.get do
            DB[:articles]
              .left_join(:comments, article_id: :id)
              .select_group(
                Sequel[:articles][:id],
                Sequel[:articles][:title],
                Sequel[:articles][:author_name],
                Sequel[:articles][:created_at]
              )
              .select_append { count(Sequel[:comments][:id]).as(comment_count) }
              .order(Sequel.desc(Sequel[:articles][:created_at]))
              .all
          end

          r.post do
            title = r.params['title'].to_s.strip
            body = r.params['body'].to_s.strip
            author_name = r.params['author_name'].to_s.strip

            if title.empty? || body.empty? || author_name.empty?
              r.halt(422, { error: 'Title, body, and author_name are required' })
            end

            article = Article.create(title: title, body: body, author_name: author_name)
            response.status = 201
            article.to_detail_json
          end
        end

        r.on Integer do |article_id|
          article = Article[article_id]
          r.halt(404, { error: 'Article not found' }) unless article

          r.on 'comments' do
            r.get do
              article.comments_dataset.order(:created_at).map(&:to_json_hash)
            end

            r.post do
              body = r.params['body'].to_s.strip
              author_name = r.params['author_name'].to_s.strip

              r.halt(422, { error: 'Body and author_name are required' }) if body.empty? || author_name.empty?

              comment = Comment.create(body: body, author_name: author_name, article_id: article.id)
              response.status = 201
              comment.to_json_hash
            end
          end

          r.get do
            article.to_detail_json
          end
        end
      end

      r.get 'engagement' do
        top_articles = DB[:articles].left_join(:comments, article_id: :id)
                                    .select_group(
                                      Sequel[:articles][:id],
                                      Sequel[:articles][:title],
                                      Sequel[:articles][:created_at]
                                    )
                                    .select_append { count(Sequel[:comments][:id]).as(comment_count) }
                                    .order(Sequel.desc(:comment_count))
                                    .limit(5)
                                    .all

        {
          total_articles: Article.count,
          total_comments: Comment.count,
          most_commented: top_articles
        }
      end
    end
  end
end
