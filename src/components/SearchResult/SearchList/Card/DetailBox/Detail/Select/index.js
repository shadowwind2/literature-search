import { Select, Space } from 'antd';
import React from 'react';
const App = (props) => {
    const handleChange = (value) => {
        setContextNum(value)
    };
    const {setContextNum,detail} = props;
    let options=[];
    detail.contexts.map((item,index)=>{
        options.push({value:index,label:item.keyword})
        return null;
    })
    return (
        <Space wrap>
            <Select
                defaultValue={options[0].label}
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={options}
            />
        </Space>)
};
export default App;