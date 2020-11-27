import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import api from "../services/api.js";
import { useHistory } from "react-router";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import apiURL from '../utils/Utils';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Typography } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateAccount() {
  const logged = useSelector((state) => state.login);
  const history = useHistory();

  const [btnFormSendDisabled, setBtnFormSendDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlertError, setOpenAlertError] = useState(false);
  const [userLoginValues, setUserLoginValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
  });

  useEffect(() => {
    if (logged) {
      history.push("/categories");
    }
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const userLogged = await api
      .post(`${apiURL.apiSignupURL}`, {
        name: userLoginValues.name,
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

    validateForm(prop);

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

  function validateForm(formItem) {

    switch (formItem) {
      case 'name':
        if (userLoginValues.name.length <= 3) {
          setErrorMessage("Name must be greater than 3");
          setOpenAlertError(true);
          setBtnFormSendDisabled(true);
        }else{
          setOpenAlertError(false);
          setBtnFormSendDisabled(false);
        }
        break;

        case 'email':
          if (userLoginValues.email.length <= 3) {
            setErrorMessage("Email must be greater than 3");
            setOpenAlertError(true);
            setBtnFormSendDisabled(true);
          }else{
            setOpenAlertError(false);
            setBtnFormSendDisabled(false);
          }
          break;

        case 'password':
          if (userLoginValues.password.length <= 6) {
            setErrorMessage("Password must be greater than 6");
            setOpenAlertError(true);
            setBtnFormSendDisabled(true);
          }else{
            setOpenAlertError(false);
            setBtnFormSendDisabled(false);
          }
          break;

        case 'passwordConfirm':
          if (userLoginValues.passwordConfirm.length <= 6) {
            setErrorMessage("Confirm Password must be greater than 6");
            setOpenAlertError(true);
            setBtnFormSendDisabled(true);
          }else{
            setOpenAlertError(false);
            setBtnFormSendDisabled(false);
          }
          break;
    
      default:
        break;
    }
  }

  function handleClickGoToLogin(){
    history.push("/");
  }

  return (
    <StyledContainer>
      <StyledBoxLogin>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Recipes Signup
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-name">
                  Name
                </InputLabel>
                <OutlinedInput
                  error={userLoginValues.name.length <= 3 && userLoginValues.name.length !== 0}
                  id="outlined-adornment-name"
                  type="text"
                  value={userLoginValues.name}
                  onChange={handleInputsChanges("name")}
                  labelWidth={45}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  E-mail
                </InputLabel>
                <OutlinedInput
                  error={userLoginValues.email.length <= 3 && userLoginValues.email.length !== 0}
                  id="outlined-adornment-email"
                  type="email"
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
                  error={userLoginValues.passwordConfirm !== userLoginValues.password ? true : false}
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
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password-confirm">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  error={userLoginValues.passwordConfirm !== userLoginValues.password ? true : false}
                  id="outlined-adornment-password-confirm"
                  type={userLoginValues.showPassword ? "text" : "password"}
                  value={userLoginValues.passwordConfirm}
                  onChange={handleInputsChanges("passwordConfirm")}
                  labelWidth={135}
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
                color="secondary"
                type="submit"
                disableElevation
                disabled={btnFormSendDisabled}
              >
                Create my account
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
          color="primary"
          disableElevation
          onClick={handleClickGoToLogin}
        >
          Login
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
