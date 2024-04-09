import React, { useState } from 'react'
import './index.scss'
import Search from './Head-Search';
import Nologin from './Nologin';
import UserLogin from './UserLogin';
import CaptchaLogin from './CaptchaLogin';
import Signup from './Signup';
import Usercard from './Usercard';
import { UserOutlined, SnippetsOutlined, MailOutlined, AppstoreOutlined, ApartmentOutlined, IdcardOutlined } from '@ant-design/icons';
import { Avatar, Space, Modal, Popover, Button, Menu, message } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Header(props) {
    const { isLogin, setIsLogin } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: '请登录后再操作',
        });
    };

    const [loginWay, setLoginWay] = useState(true);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const userData = {
        name: '择栖测试',
        avatar: 'https://i.328888.xyz/2023/03/28/inhTtZ.jpeg',
        email: 'user@example.com',
        phone: '1810000000',
        description: '我是一个医学生',
        tag: '空'
    }

    const items = [
        {
            label: '用户名登录',
            key: '1',
            icon: <MailOutlined />,
        },
        {
            label: '验证码登录',
            key: '2',
            icon: <AppstoreOutlined />,
        }
    ];
    const items2 = [
        {
            label: '注册账号',
            key: '1',
            icon: <MailOutlined />,
        }
    ]
    const openRegisterModal = () => {
        setOpenRegister(true)
        setOpenLogin(false)
    }
    const onSelect = (e) => {
        if (e.key === '1') {
            setLoginWay(true)
        } else {
            setLoginWay(false)
        }
    };

    const navigate = useNavigate()
    function getSearchParams(key) {//发送请求并处理返回值
        navigate(`result?search=${key}`)
    }
    function goToUpload() {
        navigate('admin/upload')
    }
    function goToManage() {
        navigate('admin/manage')
    }
    function goToFirst() {
        navigate('firstpage')
    }

    const preventJump = () => {
        setOpenLogin(true); warning()
    }
    const exitLogin = () => {
        document.cookie = `isLogin=false`;
        document.cookie = `UserId=`;
        setOpenLogin(true);
        setIsLogin(false);
        navigate('/firstpage');
    }

    return (
        <div className='header'>
            {contextHolder}
            <div className='logo' onClick={() => { goToFirst() }}>
                <img src="logo.png" alt="" />
            </div>
            <div className='head_page' onClick={goToFirst}>首页</div>
            <div className='li_store' onClick={() => { isLogin ? goToManage() : preventJump() }}>文献库</div>
            <div className='control' onClick={() => { isLogin ? goToUpload() : preventJump() }}>文献上传</div>
            <div className='help' onClick={(event) => handleOnclick(event)}>帮助</div>

            <div className='head'>
                {isLogin ?
                    <Space size={16} wrap>
                        <Popover placement="bottom" content={
                            <>
                                <Usercard userData={userData} />
                                <Button block onClick={() => { exitLogin() }}>退出登录</Button>
                            </>
                        } trigger="hover">
                            <Avatar src={userData.avatar} onClick={() => { }} />
                        </Popover>
                    </Space> :
                    <Space size={16} wrap>
                        <Popover placement="bottom" title='未登录' content={<><Nologin /><Button type="primary" block onClick={() => setOpenLogin(true)}>立即登录</Button></>} trigger="hover">
                            <Avatar icon={<UserOutlined />} onClick={() => setOpenLogin(true)} />
                        </Popover>
                    </Space>
                }
            </div>

            <Search getSearchParams={getSearchParams} />

            <>
                <Modal
                    maskClosable={false}
                    centered
                    open={openLogin}
                    onOk={() => setOpenLogin(false)}
                    onCancel={() => setOpenLogin(false)}
                    bodyStyle={{ height: 350 }}
                    footer={null}
                >
                    <Menu onSelect={onSelect} defaultSelectedKeys={'1'} mode="horizontal" items={items} />
                    <div className='login' style={{ padding: '10vh', paddingTop: '7vh', width: '100%' }}>
                        <div style={{ fontSize: '200px', position: 'absolute', right: '5px', bottom: '-30px', color: '#cce4f5' }}>
                            {loginWay ? <ApartmentOutlined /> : <SnippetsOutlined />}
                        </div>
                        {loginWay ? <UserLogin openRegisterModal={openRegisterModal} setIsLogin={setIsLogin} setOpenLogin={setOpenLogin} /> : <CaptchaLogin openRegisterModal={openRegisterModal} />}
                    </div>
                </Modal>
                <Modal
                    maskClosable={false}
                    centered
                    open={openRegister}
                    onOk={() => setOpenRegister(false)}
                    onCancel={() => { setOpenRegister(false); setOpenLogin(true) }}
                    bodyStyle={{ height: 450 }}
                    footer={null}
                >
                    <Menu defaultSelectedKeys={'1'} mode="horizontal" items={items2} />
                    <div className='login' style={{ padding: '10vh', paddingLeft: '', paddingTop: '3vh', width: '100%' }}>
                        <div style={{ fontSize: '200px', position: 'absolute', left: '20px', bottom: '-30px', color: '#cce4f5' }}>
                            <IdcardOutlined />
                        </div>
                        <Signup setOpenRegister={setOpenRegister} setOpenLogin={setOpenLogin} />
                    </div>
                </Modal>
            </>
        </div>
    );
    function handleOnclick(e) {
        e.className = 'help_active';
    }
}