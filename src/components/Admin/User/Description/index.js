import React from 'react';
import { Avatar,Button,Divider } from 'antd';
const App = (props) => {
    const { userData } = props;
    return (
        <>
            <div className='description' style={props.style}>
                <Avatar size={80} src={userData.avatar} draggable={false}/>
                <Divider/>
                <div className='item'>用户名:<p>{userData.name}</p></div>
                <div className='item'>电话:<p>{userData.phone}</p></div>
                <div className='item'>邮箱:<p>{userData.email}</p></div>
                <div className='item'>个人描述:<p>{userData.description}</p></div>
                <div className='item'>标记:<p>{userData.tag}</p></div>
                <Divider/>
                <Button  type="primary" block={false} size='large' style={{width:'20vh',marginTop:'5vh'}}>编辑</Button>
            </div>
        </>
    )
};
export default App;