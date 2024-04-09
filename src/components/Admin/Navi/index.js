import { FolderOutlined, SettingOutlined, UserOutlined,RadarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('文献管理', 'sub1', <FolderOutlined />, [
    getItem('文献库', 'manage'),
    getItem('文献上传', 'upload'),
    getItem('批量上传', 'batch'),
  ]),
  getItem('工作页面', 'review', <RadarChartOutlined />),
  getItem('个人信息', 'user', <UserOutlined />),
  getItem('更多', 'sub3', <SettingOutlined />, [
    getItem('设置', 'settings'),
    getItem('帮助', 'help'),
    getItem('充值', 'pay')
  ]),
];



// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'user', 'sub3'];
const App = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(`/admin/${e.key}`);
  };

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Menu
        onClick={onClick}
        mode="inline"
        defaultOpenKeys={['sub1']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          userSelect: 'none',
          width: 256,
        }}
        items={items}
      />
    </>
  );
};
export default App;