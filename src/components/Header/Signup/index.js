import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    message
} from 'antd';
import React from 'react';
import axios from 'axios';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const App = (props) => {
    const { setOpenRegister,setOpenLogin} = props
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = React.useState(false);
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '注册成功！',
        });
    };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        setLoading(true)
        console.log('Received values of form: ', values);
        axios.post(`https://www.izeqi.top/user/register`, values).then((res) => {
            setLoading(false)
            setOpenRegister(false)
            setOpenLogin(true)
            success();
        })
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '86',
                }}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="account"
                    label="用户名"
                    tooltip="请勿输入违反国家法律法规的用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱地址无效！',
                        },
                        // {
                        //     required: true,
                        //     message: '请输入你的邮箱!',
                        // },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不相同!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="电话号码"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的电话号码!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item label="验证码">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入验证码!',
                            //     },
                            // ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>发送验证码</Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default App;