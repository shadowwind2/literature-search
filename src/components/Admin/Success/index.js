import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Success() {
    const navigate = useNavigate();
    return (
        <Result
            status="success"
            title="上传文献成功！"
            subTitle="您可以在个人文献库中查看和管理上传的文献。"
            extra={[
                <Button type="primary" key="back" onClick={()=>{navigate('/firstpage')}}>
                    返回首页
                </Button>,
                <Button key="continue" onClick={()=>{navigate('/admin/upload')}}>继续上传</Button>,
            ]}
        />
    )
}
