import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import store from './store';
import Routes from './routes';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          progressBar
          closeOnToastrClick
        />
        <GlobalStyle />
      </Provider>
    </>
  );
}

export default App;
