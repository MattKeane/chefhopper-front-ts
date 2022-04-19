import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom'
import store from './features/store'
import { Provider } from 'react-redux'
import SearchResults from './routes/SearchResults'
import ShowRecipe from './routes/ShowRecipe'
import LogIn from './routes/LogIn'
import Register from './routes/Register'
import LogOut from './routes/LogOut'
import SavedRecipes from './routes/SavedRecipes'
import SearchBar from './components/SearchBar'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> }>
            <Route path="/" element={ <SearchBar /> } />
            <Route path="/search" element={ <SearchResults /> } />
            <Route path="/recipe/:recipeId" element={ <ShowRecipe />} />
            <Route path="/login" element={ <LogIn /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/logout" element={ <LogOut /> } />
            <Route path="/saved" element={ <SavedRecipes /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
