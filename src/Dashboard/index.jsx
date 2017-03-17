import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Icon, Button } from 'antd';
import moment from 'moment';

const { Header, Content } = Layout;

export default class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <Layout className="layout">
        <Header className="header">
          <p>Just a demo!</p>
          <div className="options">
            <Link to="/"><Icon type="setting" /></Link>
            <Link to="/"><Icon type="user" /></Link>
            <Link to="/login"><Icon type="logout" /></Link>
          </div>
        </Header>
        <Content className="content">
          <p>JUST A DEMO!</p>
        </Content>
      </Layout>
    );
  }
};
