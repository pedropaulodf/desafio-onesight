import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api.js";
import { useHistory } from "react-router";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import {apiLoginURL} from '../utils/Utils';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Snackbar, Typography } from "@material-ui/core";

import loginImage from '../images/logo192.png';

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
    backgroundColor: '#f1f1f1',
    flexDirection: 'column',
  },
  txtAlignCenter: {
    textAlign: 'center'
  },
  txtLoginBottomMessage: {
    marginTop: `10px`,
    color: `#c3c3c3`,
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const logged = useSelector((state) => state.login);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [openAlertError, setOpenAlertError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoginValues, setUserLoginValues] = useState({
    email: 'fulano@gmail.com',
    password: '123123123',
    showPassword: false,
  });

  useEffect(() => {
    if (logged) {
      history.push("/categories");
    }
    setOpenAlertError(false);
    setLoading(false);
    setErrorMessage('');
  }, [userLoginValues.email, userLoginValues.password]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
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
    <Box className={classes.BgLogin}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" className={classes.txtAlignCenter} gutterBottom>
            Projeto indisponível. Motivo: Heroku
          </Typography>
        </Grid>
      </Grid>
      <Paper className={classes.paperBGLogin}>

        <img src={loginImage} alt="Meal" className={{marginBottom: '20px'}} />

        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" className={classes.txtAlignCenter} gutterBottom>
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
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
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
          Create Account
        </Button>
      </Paper>
      <Typography variant="p" className={classes.txtLoginBottomMessage} gutterBottom>
        PS.: The first login may load slowly [heroku]
      </Typography>
    </Box>
  );
}