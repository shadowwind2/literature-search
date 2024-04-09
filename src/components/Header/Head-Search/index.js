import React from 'react';
import { Input, Space } from 'antd';
import './index.scss';

const { Search } = Input;

const App = (props) => {
    const onSearch = (value) => {
        getSearchParams(value);
    };
    const { getSearchParams } = props;
    return (
        <div className='search'>
            <Space direction="vertical">
                <Search placeholder="搜索" allowClear onSearch={onSearch} style={{ width: 200 }}/>
            </Space>
        </div>
    );
};
export default App;