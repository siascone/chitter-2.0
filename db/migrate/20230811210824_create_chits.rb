class CreateChits < ActiveRecord::Migration[7.0]
  def change
    create_table :chits do |t|
      t.string :body, limit: 143, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
