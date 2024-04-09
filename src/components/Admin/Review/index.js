import React from 'react'
import List from './List';
import ReviewResult from './Result';
import ChosenList from './ChosenList';
import DetailBox from './DetailBox';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import { Result, Descriptions, Button } from 'antd';
export default function App() {

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isChosen, setIsChosen] = React.useState(false);

    const getArticle = () => {
        setLoading(true)
        axios.get('https://www.izeqi.top/article/articles'/* ,{headers:{'UserId':1}} */).then(res => {
            setLoading(false)
            setData(res.data.data)
        })
    }

    const styles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    })
    const AnimatedResult = animated(Result);
    React.useEffect(() => {
        getArticle();
        setIsChosen(false);
    }, [])

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const showDrawer = () => {
        setSize('large');
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [showDetail, setShowDetail] = React.useState(false)

    const getDetail = () => {
        onClose();
        showDrawer();
        setShowDetail(true);
    }

    const [reviewData, setReviewData] = React.useState([]);
    const [isReview, setIsReview] = React.useState(false);
    return (
        <div className='review'>
            {isReview ?
                <ReviewResult reviewData={reviewData} setIsReview={setIsReview} setReviewData={setReviewData} />
                : <div className='review-content'>
                    <AnimatedResult
                        style={{ ...styles, height: '40%' }}
                        icon={<animated.img src="logo.png" alt="" style={{ ...styles, width: '15vh' }} />}
                        title="在右侧您上传的文章中选中文献，Prof.AI将为您分析。"
                        reviewData={reviewData}
                    />
                    <div className='chosen-list'>
                        {isChosen ? <ChosenList reviewData={reviewData} setReviewData={setReviewData} setIsReview={setIsReview} /> : <></>}
                    </div>
                </div>}
            {showDetail ? <DetailBox open={open} size={size} onClose={onClose} articleData={reviewData} ID={reviewData.articleId} /> : <></>}
            {isReview ?
                <animated.div className='review-message' style={styles}>
                    <Descriptions title="详细信息" extra={<Button onClick={() => { getDetail() }} type="primary">查看图片</Button>}>
                        <Descriptions.Item span={3} label="名称">{reviewData.name}</Descriptions.Item>
                        <Descriptions.Item span={3} label="作者">{reviewData.author}</Descriptions.Item>
                        <Descriptions.Item span={3} label="关键字">{reviewData.keywords}</Descriptions.Item>
                        <Descriptions.Item span={3} label="期刊">{reviewData.periodical}</Descriptions.Item>
                        <Descriptions.Item span={3} label="发布日期">{reviewData.releaseDate}</Descriptions.Item>
                        <Descriptions.Item span={3} label="标签"></Descriptions.Item>
                    </Descriptions>
                </animated.div>
                : <List isReview={isReview} ownData={data} loading={loading} setReviewData={setReviewData} reviewData={reviewData} setIsChosen={setIsChosen} />}
        </div>
    )
}
