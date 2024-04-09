import { Input, Space } from 'antd';
const { Search } = Input;

const onSearch = (value) => console.log(value);
const App = () => (
  <Space direction="vertical">
    <Search placeholder="搜索笔记" size='' onSearch={onSearch} enterButton />
  </Space>
);
export default App;