class Article < Sequel::Model
  one_to_many :comments, order: :created_at

  def to_json_hash
    {
      id: id,
      title: title,
      body: body,
      author_name: author_name,
      created_at: created_at,
      comments: comments.map(&:to_json_hash)
    }
  end
end
