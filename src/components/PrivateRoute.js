import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ children, ...rest }) {
  const logged = useSelector((state) => state.login);

  return (
    <Route
      {...rest}
      render={({ location }) => logged 
      ? (children) 
      : (
          <Redirect
            to={{ pathname: "/", state: { from: location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
}
