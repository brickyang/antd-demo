import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            <Link to="/">登录</Link>
          </Button>
          <a className="login-form-forgot" onClick={info}>忘记密码？</a>
        </FormItem>
      </Form>
    );
  }
};

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;

function info() {
  Modal.info({
    title: '密码已重置',
    content: (
      <div>
        <p>新密码已经发送到你的邮箱，请注意查收。</p>
      </div>
    ),
    onCancel: () => {},
  });
}
