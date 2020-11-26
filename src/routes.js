import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipesHome from './pages/RecipesHome';
import PrivateRoute from './components/PrivateRoute';
import RecipeDetails from './pages/RecipeDetails';
import Error404 from './errors/Error404';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Login} />

        <PrivateRoute path="/recipes">
          <RecipesHome />
        </PrivateRoute>

        <PrivateRoute path="/recipe/:id">
          <RecipeDetails />
        </PrivateRoute>

        <Route path="*">
          <Error404 />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}
