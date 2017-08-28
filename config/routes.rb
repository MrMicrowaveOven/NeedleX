Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/welcome/:id', to: 'welcome#show'
  get 'welcome/index'
  root 'welcome#index'
  resources :locations
end
