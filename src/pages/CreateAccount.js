import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api.js";
import { useHistory } from "react-router";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import {apiSignupURL} from '../utils/Utils';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CircularProgress, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Snackbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  paperBGLogin: {
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  BgLogin: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateAccount() {
  const logged = useSelector((state) => state.login);
  const history = useHistory();
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [openAlertError, setOpenAlertError] = useState({state: false, severity: 'error'});
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const userRegistered = await api
      .post(`${apiSignupURL}`, {
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

    if (userRegistered) {
      setErrorMessage("Account created!");
      setOpenAlertError({state: true, severity: 'success'});
      setLoading(false);
    } else {
      setErrorMessage("Invalid e-mail or password");
      setOpenAlertError({state: true, severity: 'error'});
      setLoading(false);
    }
  }

  const handleCloseAlertError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError({state: false});
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
          setOpenAlertError({state: true, severity: 'error'});
        }else{
          setOpenAlertError({state: false, severity: 'error'});
        }
        break;

        case 'email':
          if (userLoginValues.email.length <= 3) {
            setErrorMessage("Email must be greater than 3");
            setOpenAlertError({state: true, severity: 'error'});
          }else{
            setOpenAlertError({state: false, severity: 'error'});
          }
          break;

        case 'password':
          if (userLoginValues.password.length <= 6) {
            setErrorMessage("Password must be greater than 6");
            setOpenAlertError({state: true, severity: 'error'});
          }else{
            setOpenAlertError({state: false, severity: 'error'});
          }
          break;

        case 'passwordConfirm':
          if (userLoginValues.passwordConfirm.length <= 6) {
            setErrorMessage("Confirm Password must be greater than 6");
            setOpenAlertError({state: true, severity: 'error'});
          }else{
            setOpenAlertError({state: false, severity: 'error'});
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
    <Box className={classes.BgLogin}>
      <Paper className={classes.paperBGLogin}>
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
              <div className={classes.wrapper}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={loading}
                  >
                    Create my account
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </Grid>
          </Grid>

          <Snackbar
            open={openAlertError.state}
            autoHideDuration={3000}
            onClose={handleCloseAlertError}
          >
            <Alert onClose={handleCloseAlertError} severity={openAlertError.severity}>
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
      </Paper>
    </Box>
  );
}