class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, confirmation: true
end
