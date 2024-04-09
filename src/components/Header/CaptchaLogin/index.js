import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Row,Col } from 'antd';
const App = (props) => {
    const {openRegisterModal}=props
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入手机!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号码" />
            </Form.Item>

            <Form.Item>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码!',
                                },
                            ]}
                        >
                            <Input                    
                            prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="验证码"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>发送验证码</Button>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>保持登录状态</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block className="login-form-button">
                    登录
                </Button>
                <div className='signup' onClick={openRegisterModal} >现在注册!</div>
            </Form.Item>
        </Form>
    );
};
export default App;