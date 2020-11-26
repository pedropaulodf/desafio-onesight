import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../services/api.js";
import { useHistory } from "react-router";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const apiLoginURL = "http://localhost:3010";

  const logged = useSelector((state) => state.login);
  const history = useHistory();
  const dispatch = useDispatch();

  const [userLoginValues, setUserLoginValues] = useState({
    email: "pedropaulotj@gmail.com",
    password: "13467938271",
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [openAlertError, setOpenAlertError] = useState(false);

  useEffect(() => {
    setOpenAlertError(false);
    setErrorMessage("");
  }, [userLoginValues.email, userLoginValues.password]);

  useEffect(() => {
    if (logged) {
      history.push("/categories");
    }
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const userLogged = await api
      .post(`${apiLoginURL}/user/login`, {
        email: userLoginValues.email,
        password: userLoginValues.password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return false;
      });

    if (userLogged) {
      // sessionStorage.setItem('user_token', userLogged);
      // console.log(sessionStorage.getItem('user_token'));

      dispatch({ type: "USER_LOGIN" });
      history.push("/categories");
    } else {
      setErrorMessage("Invalid e-mail or password");
      setOpenAlertError(true);
    }
  }

  const handleCloseAlertError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };

  const handleInputsChanges = (prop) => (event) => {
    setUserLoginValues({ ...userLoginValues, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setUserLoginValues({
      ...userLoginValues,
      showPassword: !userLoginValues.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledContainer>
      <StyledBoxLogin>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Recipes Login
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-password">
                  E-mail
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-password"
                  type="text"
                  value={userLoginValues.email}
                  onChange={handleInputsChanges("email")}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-password"
                  type={userLoginValues.showPassword ? "text" : "password"}
                  value={userLoginValues.password}
                  onChange={handleInputsChanges("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {userLoginValues.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
              >
                Login
              </Button>
            </Grid>
          </Grid>

          <Snackbar
            open={openAlertError}
            autoHideDuration={3000}
            onClose={handleCloseAlertError}
          >
            <Alert onClose={handleCloseAlertError} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        </form>
      </StyledBoxLogin>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
`;

const StyledBoxLogin = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 9%);
`;

// const StyledInputText = styled.input.attrs({
//   id: "login",
//   name: "login",
//   placeholder: "Your e-mail:",
//   type: "text",
// })`
//   width: 100%;
//   height: 50px;
//   box-sizing: border-box;
//   padding: 10px 10px;
//   border: none;
//   border-radius: 7px;
//   margin: 7px 0px;
//   font-size: 16px;
// `;

// const StyledInputPass = styled.input.attrs({
//   id: "password",
//   name: "password",
//   placeholder: "Your password:",
//   type: "password",
// })`
//   width: 100%;
//   height: 50px;
//   box-sizing: border-box;
//   padding: 10px 10px;
//   border: none;
//   border-radius: 7px;
//   margin: 7px 0px;
//   font-size: 16px;
// `;

const StyledSubmitButton = styled.button`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 10px 10px;
  border: none;
  border-radius: 7px;
  margin: 7px 0px;
  font-size: 16px;
  background-color: #565656;
  color: white;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #131313;
    color: white;
  }
`;
