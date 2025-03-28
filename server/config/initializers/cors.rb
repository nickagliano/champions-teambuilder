# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:8000', 'localhost:8080', ENV.fetch('CLIENT_URL', nil)
    resource '*', headers: :any, methods: [:get, :post, :patch, :delete, :options], expose: ['Authorization']
  end
end
