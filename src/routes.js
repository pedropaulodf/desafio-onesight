import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MealCategories from './pages/MealCategories';
import PrivateRoute from './components/PrivateRoute';
import MealDetails from './pages/MealDetails';
import Error404 from './errors/Error404';
import MealsList from './pages/MealsList';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Login} />

        <PrivateRoute path="/categories">
          <MealCategories />
        </PrivateRoute>

        <PrivateRoute path="/list/:id">
          <MealsList />
        </PrivateRoute>

        <PrivateRoute path="/details/:id">
          <MealDetails />
        </PrivateRoute>

        <Route path="*">
          <Error404 />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}
