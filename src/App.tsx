import './App.css';

import { Provider } from 'react-redux';
import { Header } from './components/header/header';
import { Routes, Route } from 'react-router-dom';
import { Main } from './components/pages/mainPage/main';
import { rootReducer } from './redux/rootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  //devTools: process.env.NODE_ENV !== 'production',
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="App" data-testid="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Provider>
  );
};
export default App;
