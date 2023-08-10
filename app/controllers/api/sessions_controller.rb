class Api::SessionsController < ApplicationController
  def show
    @user = current_user

    if @user 
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]

    @user = User.find_by_credentials(credential, password)

    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invalid credentials']}, status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    # head :no_content
    render json: { message: ['Success']}, status: 200
  end
end
