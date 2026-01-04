class ApplicationController < ActionController::API
  
    include JsonWebToken

    def current_user 
        return @current_user if @current_user

        header = request.headers["Authorization"]
        return nil unless header

        token = header.split(" ").last
        decoded =  decode(token)

        return nil unless decoded

        @current_user = User.find_by(id: decoded[:user_id])

    end

    def authenticate!
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_user
  end

end
