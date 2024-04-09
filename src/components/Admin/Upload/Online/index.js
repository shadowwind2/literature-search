import { SmileOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input,message } from 'antd';
const App = (props) => {
    const success = () => {
        message.success('保存成功');
    };
    return (
        <div className='online'>
            <SmileOutlined style={{ fontSize: "15vh", color: '#0099ff' }} />
            <h1 style={{ color: "black" }}>在输入框中输入文献链接，可实现在线上传</h1>
            <div className='inputsite'>
                <Input size="large" placeholder="输入文献链接" prefix={<PlusCircleOutlined />} />
                <Button type='primary' size='large' onClick={()=>{success()}}>保存</Button>
            </div>
        </div>
    )
};
export default App;