import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';

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
    marginBottom: '20px'
  }
}));

export default function Header() {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const logged = useSelector((state) => { return state.login });

  const dispatch = useDispatch();
  const history = useHistory();
  
  function handleGoBackButtonClick() {
    history.goBack();
  }

  function handleGoToCategories() {
    history.push('/categories');
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
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            #DesafioOneSight
          </Typography>
          
          <Button color="inherit" onClick={handleGoBackButtonClick}>VOLTAR</Button>
          <Button color="inherit" onClick={handleGoToCategories}>Categories</Button>

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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {logged 
                  ? (<MenuItem onClick={() => {dispatch({type: 'USER_LOGOUT'})}}>Exit</MenuItem>)
                  : (<MenuItem onClick={() => {dispatch({type: 'USER_LOGIN'})}}>Login</MenuItem>) }
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* {logged 
        ? (<button onClick={() => {dispatch({type: 'USER_LOGOUT'})}}>Sair</button>)
        : <button onClick={() => {dispatch({type: 'USER_LOGIN'})}}>Entrar</button> } */}
      
    </div>
  )
}
