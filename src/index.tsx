import 'bulma/css/bulma.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './state/store';
import { HomePage } from './components/HomePage';
const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
