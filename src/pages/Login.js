import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import api from "../services/api.js";
import { useHistory } from "react-router";

export default function Login() {
  
  const history = useHistory();
  const dispatch = useDispatch();

  const [userEmail, setUseremail] = useState('');
  const [userPassword, setUserpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=> {
    setErrorMessage('');
  },[userEmail, userPassword])

  async function handleFormSubmit(event) {
    event.preventDefault();
    const userLogged = await api.post("/user/login", { email: userEmail, password: userPassword })
      .then((response) => {
        return response.data;
      })
      .catch(error => {
       return false; 
      });

    if (userLogged) {
      sessionStorage.setItem('user_token', userLogged);
      // console.log(sessionStorage.getItem('user_token'));

      dispatch({type: 'USER_LOGIN'});
      history.push('/recipes');
    }else{
      setErrorMessage('Login inválido, tente novamente');
    }
    
  }

  return (
    <StyledContainer>
      <StyledBoxLogin>
        <StyledTitle>Recipes Login</StyledTitle>
        <form onSubmit={handleFormSubmit}>
          <StyledInputText
            value={userEmail}
            onChange={(e) => setUseremail(e.target.value)}
            required
          />
          <StyledInputPass
            value={userPassword}
            onChange={(e) => setUserpassword(e.target.value)}
            required
          />
          <StyledSubmitButton>
            Login
          </StyledSubmitButton>
        </form>
        <div>{errorMessage}</div>
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
`;

const StyledTitle = styled.h1`
  padding: 0;
  margin: 10px 0px;
`;

const StyledInputText = styled.input.attrs({
  id: "login",
  name: "login",
  placeholder: "Your e-mail:",
  type: "text",
})`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 10px 10px;
  border: none;
  border-radius: 7px;
  margin: 7px 0px;
  font-size: 16px;
`;

const StyledInputPass = styled.input.attrs({
  id: "password",
  name: "password",
  placeholder: "Your password:",
  type: "password",
})`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 10px 10px;
  border: none;
  border-radius: 7px;
  margin: 7px 0px;
  font-size: 16px;
`;

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
