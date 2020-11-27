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
import { Button, FormControlLabel, ListItemIcon, Switch } from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from "@material-ui/icons/MoreVert";

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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
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









  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {logged 
      ? (
        <MenuItem onClick={() => {dispatch({ type: "USER_LOGOUT" });}}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant="inherit">Exit</Typography>
        </MenuItem>) 
      : (
        <MenuItem onClick={() => {dispatch({ type: "USER_LOGIN" });}} >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <Typography variant="inherit">Login</Typography>
        </MenuItem>)}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button color="inherit" variant="outlined" onClick={handleGoToCategories}>
          All Categories
        </Button>
      </MenuItem>

      <MenuItem>
        <FormControlLabel
        control={<Switch checked={tableMode} onChange={handleChange} name="checkedA" />}
        label="Table Mode"
      />
      </MenuItem>

      {logged 
      ? (
        <MenuItem onClick={() => {dispatch({ type: "USER_LOGOUT" });}}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant="inherit">Exit</Typography>
        </MenuItem>) 
      : (
        <MenuItem onClick={() => {dispatch({ type: "USER_LOGIN" });}} >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <Typography variant="inherit">Login</Typography>
        </MenuItem>)}
    </Menu>
  );













  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            #DesafioOneSight
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <FormControlLabel
              control={<Switch checked={tableMode} onChange={handleChange} name="checkedA" />}
              label="Table Mode"
            />

            <Button color="inherit" variant="outlined" onClick={handleGoToCategories}>
              All Categories
            </Button>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
