import { Card, Space, Modal } from 'antd';
import { useSpring, animated } from '@react-spring/web'
import Show from './ShowDetail';
import React from 'react';
import { useState } from 'react';

const App = (props) => {
    const { ownData, index, setReviewData, setIsChosen,isReview } = props;
    const [articleData, setArticleData] = useState(ownData);
    React.useEffect(() => {
        setArticleData(ownData);
    }, [ownData])
    const AnimatedCard = animated(Card);
    const styles = useSpring({
        delay: index * 80,
        from: { x: 40 },
        to: { x: 0 },
    })//动画相关
    const [openDetail, setOpenDetail] = useState(false);
    return (
        <Space direction="vertical" size={16}>
            <AnimatedCard
                title={articleData.name}
                hoverable
                onClick={() => { 
                    if (!isReview) {
                        setReviewData(articleData);
                        setIsChosen(true);
                    }
                }}
                extra={
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                        <div className="detailshow" onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); setOpenDetail(true) }}>详细信息</div>
                    </div>
                }
                style={{
                    ...styles,
                    width: 470,
                    marginBottom: '2vh'
                }}
            >
                <div><p style={{ color: "#0099FF", display: 'inline' }}>作者：</p>{articleData.author}</div>
                <div><p style={{ color: "#0099FF", display: 'inline' }}>期刊：</p>{articleData.periodical}</div>
                <div><p style={{ color: "#0099FF", display: 'inline' }}>关键字：</p>{articleData.keywords}</div>
                <div onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                    <Modal
                        maskClosable={false}
                        centered
                        open={openDetail}
                        onOk={() => setOpenDetail(false)}
                        onCancel={() => { setOpenDetail(false); }}
                        bodyStyle={{ height: 420 }}
                        width={'fit-content'}
                        footer={null}
                    >
                        <div style={{ paddingTop: '6vh' }} >
                            <Show ownData={articleData} />
                        </div>
                    </Modal>
                </div>
            </AnimatedCard>

        </Space>)
};
export default App;