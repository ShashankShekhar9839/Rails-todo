class User < ApplicationRecord
    has_secure_password 
    has_many :todos

    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
