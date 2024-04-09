import { Button, Form, Input, DatePicker, message, Descriptions } from 'antd';
import React from 'react';
import CheckBox from './Check';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './index.scss';

const App = (props) => {
    const { articleData, setIsSet,isUpload } = props;
    const [form] = Form.useForm()
    const [isUpdate, setIsUpdate] = React.useState(true)
    const [tags, setTags] = React.useState()
    const onFinish = (fieldsValue) => {
        const values = {
            'tag': tags,
            'articleId': props.articleData.articleId,
            ...fieldsValue,
            'releaseDate': fieldsValue['releaseDate'].format('YYYY-MM-DD'),
            'userId': 1,
        };
        props.setIsEdit(true)
        props.setFormData(values)
        message.success('保存成功')
        setIsUpdate(false);
        setIsSet(true);
    };
    React.useEffect(() => {
        if (isUpload) {
            setTags(articleData.tag)
        }
    }, [isUpload])
    const onFinishFailed = (errorInfo) => {
        props.setIsEdit(false)
        console.log('Failed:', errorInfo);
        message.error('请填写完整信息')
    };

    return (
        <div className='uploadForm'>
            <div className='form'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        textAlign: '',
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="文献标题"
                        name="name"
                        initialValue={isUpload?articleData.name:''}
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
                        label="作者"
                        name="author"
                        initialValue={isUpload?articleData.author:''}
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
                        label="关键词"
                        name="keywords"
                        initialValue={isUpload?articleData.keywords:''}
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
                        label="期刊"
                        name="periodical"
                        initialValue={isUpload?articleData.name:''}
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
                        <DatePicker
                            locale={locale}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        {isUpdate ?
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button> :
                            <Button type="primary" htmlType="submit">
                                更新
                            </Button>}

                    </Form.Item>
                </Form>
            </div>
            {isUpload ?
                <div className='haveData'>
                    <Descriptions title="已识别的信息" >
                        <Descriptions.Item label="标题" span={3}><p style={{color:"#0099ff"}}>{articleData.name}</p></Descriptions.Item>
                        <Descriptions.Item label="发布日期" span={3}><p style={{color:"#0099ff"}}>{articleData.releaseDate}</p></Descriptions.Item>
                        <Descriptions.Item label="期刊" span={3}><p style={{color:"#0099ff"}}>{articleData.article}</p></Descriptions.Item>
                        <Descriptions.Item label="关键词" span={3}><p style={{color:"#0099ff"}}>{articleData.keywords}</p></Descriptions.Item>
                        <Descriptions.Item label="作者" span={3}><p style={{color:"#0099ff"}}>{articleData.author}</p></Descriptions.Item>
                    </Descriptions>
                    <div className='chbox'>
                    {isUpload?<CheckBox tags={articleData.tag} setTags={setTags}/>:<></>}
                    </div>
                </div> :
                <></>}
        </div>
    )
};
export default App;