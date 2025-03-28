require 'sidekiq/web'

Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        registrations: 'users/registrations'
      }
      post 'auth/login', to: 'auth#login'
    end
  end

  if Rails.env.development?
    authenticate :user, ->(u) { u.administrator? } do
      mount Sidekiq::Web => '/sidekiq'
    end
  end
end
