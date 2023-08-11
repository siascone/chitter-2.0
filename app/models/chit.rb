class Chit < ApplicationRecord

    validates :body, length: { minimum: 1, maximum: 143}

    belongs_to :user
end
