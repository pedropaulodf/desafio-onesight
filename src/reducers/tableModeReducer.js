export default function tableModeReducer(state = false, action) {

  switch (action.type) {
    case 'MODE_ACTIVATE':
      return state = true;

    case 'MODE_DISABLE':
      return state = false;
    
    default:
      return state;
  }

}