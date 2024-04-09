import { Button, Descriptions } from 'antd';
import React,{ useState } from 'react';
const App = (props) => {
    const {ownData,setIsEdit}=props;
    const [data,setData] = useState({});
    React.useEffect(()=>{
        setData(ownData);
    },[ownData])
    return (
        <div style={{width:500}}>
            <Descriptions title="详细信息" extra={<Button onClick={()=>{setIsEdit(true)}} type="primary">编辑</Button>}>
                <Descriptions.Item span={3} label="名称">{data.name}</Descriptions.Item>
                <Descriptions.Item span={3} label="作者">{data.author}</Descriptions.Item>
                <Descriptions.Item span={3} label="关键字">{data.keywords}</Descriptions.Item>
                <Descriptions.Item span={3} label="期刊">{data.periodical}</Descriptions.Item>
                <Descriptions.Item span={3} label="发布日期">{data.releaseDate}</Descriptions.Item>
                <Descriptions.Item span={3} label="标签"></Descriptions.Item>
            </Descriptions>
        </div>
    );
};
export default App;