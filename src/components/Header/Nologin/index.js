import React from 'react'
import './index.scss';
import { VerticalAlignTopOutlined,SnippetsOutlined } from '@ant-design/icons';
export default function index() {
    return (
        <div className='nologin'>
            <p style={{ fontSize: '20px', color: '#09f' }}>登陆后你可体验：</p>
            <div className='nologin-list'>
                <p><VerticalAlignTopOutlined style={{color:'#09f',fontSize:'20px'}}/>  文献上传</p>
                <p><SnippetsOutlined style={{color:'#09f',fontSize:'20px'}}/>  文献管理</p>
            </div>
        </div>
    )
}
