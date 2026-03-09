class Comment < Sequel::Model
  many_to_one :article

  def to_json_hash
    {
      id: id,
      body: body,
      author_name: author_name,
      article_id: article_id,
      created_at: created_at
    }
  end
end
