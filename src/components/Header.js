import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button, FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  headerBar: {
    marginBottom: "20px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logged = useSelector((state) => {
    return state.login;
  });

  const tableMode = useSelector((state) => {
    return state.table_mode;
  });

  const handleChange = () => {
    // setTableMode(!tableMode);
    tableMode ? dispatch({ type: "MODE_DISABLE" }) : dispatch({ type: "MODE_ACTIVATE" });
  };

  // function handleGoBackButtonClick() {
  //   history.goBack();
  // }

  function handleGoToCategories() {
    history.push("/categories");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.headerBar}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleGoToCategories}
          >
            #DesafioOneSight
          </Typography>
          <FormControlLabel
            control={<Switch checked={tableMode} onChange={handleChange} name="checkedA" />}
            label="Table Mode"
          />
          <Button color="inherit" variant="outlined" onClick={handleGoToCategories}>
            All Categories
          </Button>

          {logged && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {logged 
                ? (
                  <MenuItem
                    onClick={() => {
                      dispatch({ type: "USER_LOGOUT" });
                    }}
                  >
                    Exit
                  </MenuItem>
                ) 
                : (
                  <MenuItem
                    onClick={() => {
                      dispatch({ type: "USER_LOGIN" });
                    }}
                  >
                    Login
                  </MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
