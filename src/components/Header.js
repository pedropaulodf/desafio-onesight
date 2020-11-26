import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {
  
  const logged = useSelector((state) => { return state.login });
  
  const dispatch = useDispatch();

  return (
    <div>
    <Link to="/recipes">recipes</Link>
    <Link to="/recipe/1">recipe</Link>
      {logged 
        ? <button onClick={() => {dispatch({type: 'USER_LOGOUT'})}}>Sair</button> 
        : <button onClick={() => {dispatch({type: 'USER_LOGIN'})}}>Entrar</button> }
    </div>
  )
}
