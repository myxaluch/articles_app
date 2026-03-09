Sequel.migration do
  change do
    create_table(:comments) do
      primary_key :id
      String :body, text: true, null: false
      String :author_name, null: false
      foreign_key :article_id, :articles, null: false, on_delete: :cascade
      DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
    end
  end
end
