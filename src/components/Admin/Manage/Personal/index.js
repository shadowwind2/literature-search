import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card,Descriptions,Tooltip } from 'antd';
const { Meta } = Card;
const App = (props) => {
    const {style} = props;
    return (
        <>
            <Card
                style={{
                    ...style,
                    width: '35%',
                    flex:1
                }}
                actions={[
                    <Tooltip title="跳转设置"><SettingOutlined key="setting" /></Tooltip>,
                    <Tooltip title="编辑"><EditOutlined key="edit" /></Tooltip>,
                    <Tooltip title="更多选项"><EllipsisOutlined key="ellipsis" /></Tooltip>,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://i.328888.xyz/2023/03/28/inhTtZ.jpeg" />}
                    title="择栖测试"
                    description={
                        <div style={{height:'24vh'}}>
                        <Descriptions column={1}>
                            <Descriptions.Item label="邮箱">user@example.com</Descriptions.Item>
                            <Descriptions.Item label="电话号码">1810000000</Descriptions.Item>
                            <Descriptions.Item label="个人描述">我是一个学生</Descriptions.Item>
                            <Descriptions.Item label="标记">空</Descriptions.Item>
                        </Descriptions>
                        </div>
                    }
                />
            </Card>
        </>
    );
};
export default App;