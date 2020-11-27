import Routes from './routes';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer';
import tableModeReducer from './reducers/tableModeReducer';

function App() {
  
  const allReducers = combineReducers({
    login: loginReducer,
    table_mode: tableModeReducer,
  });

  const store = createStore(allReducers);

  return (
    <div>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </div>
  );
}

export default App;
