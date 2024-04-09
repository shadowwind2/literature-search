import { AlignRightOutlined, FieldTimeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
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
  getItem('分类', 'sub1', <AlignRightOutlined />, [
    getItem('无主题', '22'),
    getItem('主要主题', 'g1', null,
      [
        getItem('社会科学', '1'),
        getItem('法学', '2'),
        getItem('经济学', '3'),
        getItem('数学', '4'),
        getItem('物理', '5'),
        getItem('化学', '6'),
        getItem('地理', '7'),
        getItem('生物', '8'),
        getItem('计算机', '9'),
        getItem('机械', '10'),
        getItem('材料', '11'),
        getItem('电子', '12'),
        getItem('通信', '13'),
        getItem('环境', '14'),
        getItem('软件', '15'),
        getItem('食品', '16'),
        getItem('哲学', '17'),
        getItem('医学', '18'),
        getItem('制造', '19'),
        getItem('农业', '20'),
        getItem('管理', '21'),
      ]),
  ]),
  {
    type: 'divider',
  },

];
const items2 = [
  getItem('排序方式', 'grp', null, [getItem('按命中分排序', '1'), getItem('按权威性排序', '2')], 'group'),
]
const items3 = [
  getItem('发表年度', 'sub4', <FieldTimeOutlined />, [
    getItem('2023', '1'),
    getItem('2022', '2'),
    getItem('2021', '3'),
    getItem('2020', '4'),
  ]),
]
const items4 = [
  getItem('学科', 'sub2', <AppstoreOutlined />, [
    getItem('外科医学', '5'),
    getItem('内科医学', '6'),
  ]),
]
const App = (props) => {

  const { setTags } = props;

  const onSelect = (e) => {
    if (e.key === '22') {
      setTags(21);
    }
    setTags(e.key - 1);
  };

  return (
    <>
      <Menu
        onSelect={onSelect}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['22']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <Menu
        style={{
          width: 256,
        }}
        defaultOpenKeys={['sub2']}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items4} />
      <Menu
        style={{
          width: 256,
        }}
        mode="inline"
        defaultOpenKeys={['sub4']}
        items={items3} />
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items2} />

    </>
  );
};
export default App;