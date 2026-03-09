Sequel.migration do
  change do
    create_table(:articles) do
      primary_key :id
      String :title, null: false
      String :body, text: true, null: false
      String :author_name, null: false
      DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
    end
  end
end
