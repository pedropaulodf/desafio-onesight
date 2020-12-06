import { useState } from "react";
import PropTypes from 'prop-types';
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
import { Button, Fab, FormControlLabel, ListItemIcon, Switch, Zoom } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from "@material-ui/icons/MoreVert";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'default',
  },
  headerBar: {
    marginBottom: "14px",
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
  },
  btnTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: '1500',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logged = useSelector((state) => {
    return state.login;
  });

  const tableMode = useSelector((state) => {
    return state.table_mode;
  });

  const handleChange = () => {
    tableMode ? dispatch({ type: "MODE_DISABLE" }) : dispatch({ type: "MODE_ACTIVATE" });
  };

  function handleGoToCategories() {
    history.push("/categories");
  }

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

  function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClickToTop = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClickToTop} role="presentation" className={classes.btnTop}>
          {children}
        </div>
      </Zoom>
    );
  }
  
  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  return (
    <div className={classes.headerBar}>
      <AppBar>
        <Toolbar >
          <Typography className={classes.title} variant="h6" noWrap onClick={handleGoToCategories}>
            #DesafioOneSight
          </Typography>

          <div />
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
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props} >
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
