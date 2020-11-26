export default function loginReducer(state = false, action) {

  switch (action.type) {
    case 'USER_LOGIN':
      return state = true;

    case 'USER_LOGOUT':
      return state = false;
    
    default:
      return state;
  }

}