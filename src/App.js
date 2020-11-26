import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer';
import Routes from './routes';

function App() {
  
  const allReducers = combineReducers({
    login: loginReducer,
  });

  const store = createStore(allReducers);

  return (
    <div className="App">
      <Provider store={store}>
        {/* <Login/> */}
        <Routes/>
      </Provider>
    </div>
  );
}

export default App;
