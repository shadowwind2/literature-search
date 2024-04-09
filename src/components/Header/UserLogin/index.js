import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,message } from 'antd';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const App = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {openRegisterModal,setIsLogin,setOpenLogin}=props
  const onFinish = (values) => {
    setLoading(true)
    axios.post("https://www.izeqi.top/user/login",values).then((res)=>{
      Cookies.set('isLogin',true,{expires:7})
      Cookies.set('UserId',res.data.data.id,{expires:7})
      setOpenLogin(false)
      setLoading(false)
      setIsLogin(true)
      messageApi.open({
        type: 'success',
        content: '登录成功',
      });
    }).catch(()=>{
      setLoading(false)
      messageApi.open({
        type: 'error',
        content: '登录失败',
      });
    })
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {contextHolder}
      <Form.Item
        name="account"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="www.izeqi.top">
          忘记密码？
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block className="login-form-button" loading={loading}>
          登录
        </Button>
        <div className='signup' onClick={openRegisterModal}>现在注册!</div>
      </Form.Item>
    </Form>
  );
};
export default App;