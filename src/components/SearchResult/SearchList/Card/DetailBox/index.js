import { Button, Drawer, Space, Result, Skeleton } from 'antd';
import React, { useState } from 'react';
import Detail from './Detail';
import axios from 'axios';
const App = (props) => {
    const { size, open, onClose, articleData, ID } = props;
    const [detail, setDetail] = useState({})
    const [showdetail, setShowdetail] = useState(0)
    // const [Id, setId] = useState(1);
    const values = {
        params: {
            'articleId': ID,
            'contextLength': 25
        }
    };

    const getDetail = () => {
            axios.get('https://www.izeqi.top/article/detail', { params: values.params, }).then((res) => {
                setDetail(res.data.data);
                if (res.data.data.code === 1) {
                    setShowdetail(1);
                    axios.get('https://www.izeqi.top/article/translate/switch')
                }
            }).catch(() => {
                setShowdetail(2);
            })
    }
    const ifShow = () => {
        if (showdetail === 1) {
            return <Detail detail={detail} />
        } else if (showdetail === 2) {
            return <Result
                status="404"
                title="未找到详细信息"
                subTitle="对不起，没有找到您想要的详细信息"
            />
        } else {
            return <div style={{ padding: '2vh' }}><Skeleton active paragraph={{ rows: 6 }} /></div>
        }
    }

    React.useEffect(() => {
        getDetail();
    }, []);

    return (
        <>
            <Drawer
                title={`${articleData.article.name}`}
                placement="right"
                size={size}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>关闭</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                {
                    ifShow()
                }
            </Drawer>
        </>
    );
};
export default App;