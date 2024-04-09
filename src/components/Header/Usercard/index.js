import React from 'react'
import { LikeOutlined,UserOutlined,BookOutlined,CloudUploadOutlined,RightOutlined } from '@ant-design/icons';
import { Col, Row, Statistic,Button,Divider } from 'antd';
import { animated, useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import './index.scss'
export default function Usercard(props) {
    const navigate = useNavigate()
    const { userData } = props;
    const styles = useSpring({
        from: {
            scale: 0,
        },
        to: {
            scale: 1,
        },

    })

    return (
        <div className='usercard'>
            <div className='avatar-wrap'>
                <animated.img src={userData.avatar} alt='avatar' className='avatar' style={{...styles,cursor:'pointer'}} onClick={()=>{navigate('/admin/user')}}/>
            </div>
            <div className='name'>
                {userData.name}
            </div>
            <div className='data'>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="获得点赞数" value={520} prefix={<LikeOutlined />} valueStyle={{ fontSize: '3vh' }} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="上传文章数" value={7} valueStyle={{ fontSize: '3vh' }} />
                    </Col>
                </Row>
            </div>
            <div className='work'>
                <Button type="text" block size='large' icon={<BookOutlined />} style={{color:'#0084ff'}} onClick={()=>{navigate('/admin/manage')}}>文献管理<RightOutlined /></Button>
                <Button type="text" block size='large' icon={<UserOutlined />} style={{color:'#0084ff'}} onClick={()=>{navigate('/admin/user')}}>个人信息<RightOutlined /></Button>
                <Button type="text" block size='large' icon={<CloudUploadOutlined />} style={{color:'#0084ff'}} onClick={()=>{navigate('/admin/upload')}}> 文献上传<RightOutlined /></Button>
            </div>
            <Divider/>
        </div>
    )
}
