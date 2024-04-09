import React from 'react';
import { Card, Divider, Button } from 'antd';
import { KeyOutlined, MonitorOutlined, PushpinOutlined, EllipsisOutlined } from '@ant-design/icons';
const App = (props) => {
  const { setIsEdit, setIndex, index, str, kind } = props;
  const kinds = [<div><KeyOutlined style={{ color: 'red' }} />泛读笔记<Divider type="vertical" /></div>, <div><MonitorOutlined style={{ color: 'orange' }} />精读笔记<Divider type="vertical" /></div>, <div><PushpinOutlined style={{ color: 'pink' }} />自定义笔记<Divider type="vertical" /></div>]
  const [title, setTitle] = React.useState('笔记标题')
  const [content, setContent] = React.useState('笔记内容')

  const setText = (str) => {
    if (str.match(/<([^>]+)>(.*?)<\/\1>/)){
      // 提取第一个标签包裹的内容
      const firstTagMatch = str.match(/<([^>]+)>(.*?)<\/\1>/);
      const firstTagContent = firstTagMatch ? firstTagMatch[2] : null;
      setTitle(firstTagContent.slice(0, 10));

      // 提取第二个标签包裹的内容
      if (str.match(/<([^>]+)>(.*?)<\/\1>/g)[1]) {
        const secondTagMatch = str.match(/<([^>]+)>(.*?)<\/\1>/g)[1].match(/<([^>]+)>(.*?)<\/\1>/);
        const secondTagContent = secondTagMatch ? secondTagMatch[2] : null;
        setContent(secondTagContent.slice(0, 20));
      }
    }
  }

  React.useEffect(() => {
    setText(str[index])
  }, [str])
  return (
    <Card
      bordered={false}
      hoverable
      style={{
        width: 400,
        height: 85,
        marginBottom: 10,
      }}
      onClick={() => { setIndex(index); setIsEdit(true) }}
    >
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
      }}>
        <Button type="text" shape="circle" icon={<EllipsisOutlined />} onClick={(e) => { e.stopPropagation(); }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {kind ? kinds[2] : kinds[index]}<h4>{title}</h4>
      </div>
      <p>{content}</p>
    </Card>
  )
};
export default App;