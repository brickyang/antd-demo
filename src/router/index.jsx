import React from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import { Button } from 'antd';

import Login from '../Login';
import Dashboard from '../Dashboard';

const Router = () => (
  <BrowserRouter>
    <div style={{ height: '100%' }}>
      <Route exact path="/" component={Dashboard}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </BrowserRouter>
)

export default Router;
