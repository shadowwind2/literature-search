import { Card, Space, Tooltip, Button, Popconfirm, Modal } from 'antd';
import { DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { useSpring, animated } from '@react-spring/web'
import Show from './ShowDetail';
import Edit from './EditDetail';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const App = (props) => {
    const navigate = useNavigate();
    const { ownData, index, getArticle, openDeleteNotification, openFolderNotification,setPage } = props;
    const [articleData, setArticleData] = useState(ownData);

    const AnimatedCard = animated(Card);
    const styles = useSpring({
        delay: index * 80,
        from: { x: 40 },
        to: { x: 0 },
    })//动画相关
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        axios.delete('https://www.izeqi.top/article/delete?article_id=' + articleData.articleId/* , { headers: { 'UserId': 1 } } */).then(res => {
            openDeleteNotification('success');
            setOpen(false);
            setConfirmLoading(false);
            getArticle();
            setPage(1);
        })
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const [openDetail, setOpenDetail] = useState(false);
    return (
        <Space direction="vertical" size={16}>
            <AnimatedCard
                title={articleData.name}
                hoverable
                onClick={() => { navigate(`/browser?name=${articleData.name}&articleId=${articleData.articleId}`) }}
                extra={
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                        <Popconfirm
                            title="提示"
                            description="你确认删除这个文献吗？"
                            open={open}
                            onConfirm={handleOk}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={handleCancel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Tooltip title="删除">
                                <Button type='primary' icon={<DeleteOutlined />} onClick={showPopconfirm} />
                            </Tooltip>
                        </Popconfirm>
                        <Tooltip title="收藏">
                            <Button icon={<FolderOutlined />} style={{ marginLeft: '1vh', marginRight: '1vh' }} onClick={() => openFolderNotification('success')} />
                        </Tooltip>
                        <div className="detailshow" onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); setOpenDetail(true) }}>详细信息</div>
                    </div>
                }
                style={{
                    ...styles,
                    width: 750,
                    marginBottom: '2vh'
                }}
            >
                <div><p style={{ color: "#0099FF", display: 'inline' }}>作者：</p>{articleData.author}</div>
                <div><p style={{ color: "#0099FF", display: 'inline' }}>期刊：</p>{articleData.periodical}</div>
                <div><p style={{ color: "#0099FF", display: 'inline' }}>关键字：</p>{articleData.keywords}</div>
                <div style={{
                    position: 'absolute',
                    top: 70,
                    right: 34
                }}>
                    上传日期:{articleData.releaseDate ? articleData.releaseDate.slice(0, 10) : null}
                </div>
                <div onClick={(e)=>{ e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                <Modal
                    maskClosable={false}
                    centered
                    open={openDetail}
                    onOk={() => setOpenDetail(false)}
                    onCancel={() =>{setOpenDetail(false);setIsEdit(false);}}
                    bodyStyle={{ height: 420 }}
                    width={'fit-content'}
                    footer={null}
                >
                    <div style={{ paddingTop: '6vh' }} >
                        {isEdit ? <Edit ownData={articleData} setIsEdit={setIsEdit} setArticleData={setArticleData} /> :
                            <Show ownData={articleData} setIsEdit={setIsEdit} />
                        }
                    </div>
                </Modal>
                </div>
            </AnimatedCard>

        </Space>)
};
export default App;