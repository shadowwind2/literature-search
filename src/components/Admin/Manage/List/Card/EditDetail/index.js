import { Button, Form, Input, DatePicker, message } from 'antd';
import React from 'react';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from 'axios';

const App = (props) => {
    const { ownData, setIsEdit,setArticleData } = props;
    const [loading, setLoading] = React.useState(false);
    const onFinish = (fieldsValue) => {
        setLoading(true);
        const values = {
            'articleId': ownData.articleId,
            ...fieldsValue,
            'releaseDate': fieldsValue['releaseDate'].format('YYYY-MM-DD'),
        };
        console.log('修改:', values);
        axios.post('https://www.izeqi.top/article/changeInfo', values).then((res) => {
            setLoading(false);
            setIsEdit(false);
            setArticleData(res.data.data);
            message.success('保存成功')
            console.log(res);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('请填写完整信息')
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                textAlign: '',
                maxWidth: 800,
                width: 800,
                marginLeft: -150,
                marginRight: 20,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                initialValue={ownData.name}
                label="文献标题"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入文献标题!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={ownData.author}
                label="作者"
                name="author"
                rules={[
                    {
                        required: true,
                        message: '请输入作者!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={ownData.keywords}
                label="关键词"
                name="keywords"
                rules={[
                    {
                        required: true,
                        message: '请输入关键词!',
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                initialValue={ownData.periodical}
                label="期刊"
                name="periodical"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="选择发布日期"
                name='releaseDate'
                rules={[
                    {
                        required: true,
                        message: '请选择发布日期!',
                    },
                ]}
            >
                    <DatePicker locale={locale}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    保存
                </Button>
            </Form.Item>
        </Form>)
};
export default App;