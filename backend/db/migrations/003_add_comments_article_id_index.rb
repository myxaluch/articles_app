Sequel.migration do
  change do
    add_index :comments, :article_id
  end
end
