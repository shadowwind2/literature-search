import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Pagination, Result, Button, Skeleton, notification } from 'antd';
import Card from './Card';

export default function List(props) {

    const navigate = useNavigate();
    const { ownData, getArticle, loading,setReviewData,reviewData,setIsChosen,isReview } = props;
    const [page, setPage] = useState(1);
    const onChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const [articleData, setArticleData] = React.useState([])//文章数据

    React.useEffect(() => {
        setArticleData(ownData)
    }, [ownData])

    const [api, contextHolder] = notification.useNotification();
    const openFolderNotification = (type) => {
        api[type]({
            message: '已收藏',
        });
    };

    const openDeleteNotification = (type) => {
        api[type]({
            message: '已删除',
        });
    };

    const newCard = () => {
        if (loading) {
            return <div style={{height:'100%'}}><Skeleton active paragraph={{ rows: 4, }} /></div>
        } else {
            if (articleData === null) {
                return <Result
                    status="404"
                    title="没有文献"
                    subTitle="您好像还没有上传过文献。"
                    extra={<Button type="primary" size='large' onClick={() => { navigate('/admin/upload') }}>前往上传</Button>}
                />;
            } else {
                return articleData.map((result, i) => {
                    if ((i + 1 >= (5 * (page - 1) + 1)) && (i + 1 <= 5 * page)) {
                        return <Card
                            getArticle={getArticle}
                            id={i}
                            ownData={result}
                            key={result.articleId}
                            index={i - 5 * (page - 1) - 1}
                            openFolderNotification={openFolderNotification}
                            openDeleteNotification={openDeleteNotification}
                            setPage={setPage}
                            setReviewData={setReviewData}
                            reviewData={reviewData}
                            setIsChosen={setIsChosen}
                            isReview={isReview}
                        />;
                    }
                    return null;
                })
            }
        }
    }
    return (
        <div className='review-list'>
            {contextHolder}
            <div className='review-cards'>
                {newCard()}
            </div>
            {articleData ?
                <>
                    <div style={{alignSelf:'start'}}>
                        <Pagination defaultCurrent={1} total={articleData.length} onChange={onChange} pageSize={5} showSizeChanger={0} current={page}/>
                    </div>
                </>
                : null
            }
        </div>
    )
}