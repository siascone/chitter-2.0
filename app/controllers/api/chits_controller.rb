class Api::ChitsController < ApplicationController

    wrap_parameters include: Chit.attribute_names
    
    def show 
        @chit = Chit.find_by(id: params[:id])
        render json: @chit
    end

    def index
        @chits = Chit.all
        render :index
    end

    def create
        @chit = Chit.new(chit_params)
        @chit.user_id = current_user.id

        if @chit.save
            render json: @chit
        else
            render json: @chit.errors.full_messages
        end
    end

    def update
        @chit = Chit.find_by(id: params[:id])

        if @chit && @chit.update(chit_params)
            render json: @chit
        else
            render json: @chit.errors.full_messages
        end
    end

    def destroy
        @chit = Chit.find_by(id: params[:id])
        @chit.destroy
        render json: @chit
    end

    private

    def chit_params
        params.require(:chit).permit(:body)
    end 
end
