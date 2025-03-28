class Api::V1::AuthController < ApplicationController
  # POST /api/v1/auth/login
  def login
    user = User.find_by_email(params[:email])

    if user&.valid_password?(params[:password])
      token = JwtService.encode(user_id: user.id)
      render json: { token: token, user: user }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
