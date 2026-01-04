class TodosController < ApplicationController
   before_action :authenticate!

  def index
    render json: current_user.todos
  end

  def create
    todo = current_user.todos.create(todo_params)
    render json: todo
  end

  def update
    todo =  current_user.todos.find(params[:id])
    todo.update(todo_params)
    render json: todo
  end

  def destroy
     current_user.todos.find(params[:id]).destroy
    head :no_content
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :completed)
  end
end
