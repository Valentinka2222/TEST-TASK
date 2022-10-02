import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Header from './components/header/Header';
import Headline from './components/headline/Headline';
import Auth from './components/Auth/Auth';
import Users from './components/users/Users';
import store from './store';
import './index.scss';

const App = () => {
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);

  return (
    <Provider store={store}>
      <main className="page">
        <div className="top-section">
          <Header
            isShowUsers={isShowUsers}
            isShowAuth={isShowAuth}
            setIsShowUsers={setIsShowUsers}
            setIsShowAuth={setIsShowAuth}
          />

          <Headline setIsShowAuth={setIsShowAuth} />
          {isShowUsers ? <Users /> : null}
          {isShowAuth ? <Auth /> : null}
        </div>
      </main>
    </Provider>
  );
};
export default App;
