# app/services/jwt_service.rb
class JwtService
  HMAC_SECRET = Rails.application.credentials.secret_key_base.to_s

  def self.encode(payload)
    payload[:exp] = 24.hours.from_now.to_i  # Set expiration time
    JWT.encode(payload, HMAC_SECRET)
  end

  def self.decode(token)
    decoded = JWT.decode(token, HMAC_SECRET)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError
    nil
  end
end
