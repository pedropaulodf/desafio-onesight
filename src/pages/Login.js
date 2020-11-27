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
import {apiLoginURL} from '../utils/Utils';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const logged = useSelector((state) => state.login);
  const history = useHistory();
  const dispatch = useDispatch();

  const [userLoginValues, setUserLoginValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlertError, setOpenAlertError] = useState(false);
  const [btnFormSendDisabled, setBtnFormSendDisabled] = useState(true);

  useEffect(() => {
    setOpenAlertError(false);
    setBtnFormSendDisabled(false);
    setErrorMessage('');
  }, [userLoginValues.email, userLoginValues.password]);

  useEffect(() => {
    if (logged) {
      history.push("/categories");
    }
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setBtnFormSendDisabled(true);
    const userLogged = await api
      .post(`${apiLoginURL}`, {
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
      setBtnFormSendDisabled(false);
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

  function handleClickGoToCreateAccount(){
    history.push("/register");
  }
  
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
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  E-mail
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  value={userLoginValues.email}
                  onChange={handleInputsChanges("email")}
                  labelWidth={45}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={userLoginValues.showPassword ? "text" : "password"}
                  value={userLoginValues.password}
                  onChange={handleInputsChanges("password")}
                  labelWidth={70}
                  required
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
                disabled={btnFormSendDisabled}
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
        --
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={handleClickGoToCreateAccount}
        >
          Signup
        </Button>
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

