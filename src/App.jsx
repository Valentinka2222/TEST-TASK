import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import Headline from './components/Heardline';
import Auth from './components/Auth';
import Profiles from './components/Profiles';
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
          {isShowUsers ? <Profiles /> : null}
          {isShowAuth ? <Auth /> : null}
        </div>
      </main>
    </Provider>
  );
};
export default App;
