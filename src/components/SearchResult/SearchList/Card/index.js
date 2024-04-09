import { Card, Space, Tooltip, Button, notification, Radio, message, Popover } from 'antd';
import { LikeOutlined, DislikeOutlined, DownloadOutlined, FolderOutlined } from '@ant-design/icons';
import { animated, useSpring } from '@react-spring/web'
import { useNavigate } from 'react-router-dom';
import DetailBox from './DetailBox';
import React, { useState, } from 'react';
import './index.scss'
import axios from 'axios';
const App = (props) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { result, index, isRecommend, setIsRecommend, isCollect, setIsCollect, collectKey } = props;

    const getDetail = () => {
        onClose();
        showDrawer();
        setShowDetail(true);
    }
    const AnimatedCard = animated(Card)
    const styles = useSpring({
        delay: (isRecommend ? 0 : index * 800 + 3000),
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    })


    const [api, clickcontextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: '操作成功',
            description:
                '您的反馈已经收到，这将是改善我们产品功能的重要依据。',
            duration: 3
        });
    };

    const collect = (key) => {
        const nextIsCollect = isCollect.map((item, i) => {
            if (i !== key - 1) {
                return item;
            } else {
                if (item === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        );
        // 使用新的数组进行重渲染
        setIsCollect(nextIsCollect);
    }
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);//点赞点踩的状态

    React.useEffect(() => {
        if (isRecommend) {
        } else {
            setTimeout(() => {
                setIsRecommend(true);
            }, 9500);
        }
        setLiked(result.currentUserLiked);
        setDisliked(result.currentUserDisliked);
    }, []);//挂载时运行

    const value = {
        article_id: result.article.articleId,
    }

    const [loading, setLoading] = useState(true);

    const like = () => {
        if (loading) {
            setLoading(false);
            if (liked && !disliked) {
                setLiked(false);
                axios.delete('https://www.izeqi.top/vote/upvote/cancel?article_id=' + value.article_id).then(res => {
                    setLoading(true);
                })
            } else if (!liked && !disliked) {
                setLiked(true);
                axios.post('https://www.izeqi.top/vote/upvote?article_id=' + value.article_id).then(res => {
                    setLoading(true);
                })
            }
            else {
                setLiked(true);
                setDisliked(false);
                axios.post('https://www.izeqi.top/vote/upvote?article_id=' + value.article_id).then(res => {
                    axios.delete('https://www.izeqi.top/vote/down-vote/cancel?article_id=' + value.article_id).then(res => {
                        setLoading(true);
                    })
                })
            }
        }

    }


    const dislike = () => {
        if (loading) {
            setLoading(false);
            if (!liked && disliked) {
                setDisliked(false);
                axios.delete('https://www.izeqi.top/vote/down-vote/cancel?article_id=' + value.article_id).then(res => {
                    setLoading(true);
                })
            } else if (!liked && !disliked) {
                setDisliked(true);
                axios.post('https://www.izeqi.top/vote/down-vote?article_id=' + value.article_id).then(res => {
                    setLoading(true);
                })
            }
            else {
                setDisliked(true);
                setLiked(false);
                axios.post('https://www.izeqi.top/vote/down-vote?article_id=' + value.article_id).then(res => {
                    axios.delete('https://www.izeqi.top/vote/upvote/cancel?article_id=' + value.article_id).then(res => {
                        setLoading(true);
                    })
                })

            }
        }

    }

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const showDrawer = () => {
        setSize('large');
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [showDetail, setShowDetail] = useState(false)

    const giveMessage = () => {
        if (!isCollect[collectKey - 1]) {
            messageApi.open({
                type: 'success',
                content: '收藏成功',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: '取消收藏',
            });
        }
    }
    const[loading2,setLoading2]=useState(false)
    const download = () => {
        setLoading2(true)
        messageApi.info('正在拉起下载···');
        axios.get('https://www.izeqi.top/article/download?article_id=' + result.article.articleId,{responseType:'blob'}).then(res => {
            console.log('res:', res);
            const content = res.data
            const blob = new Blob([content])
            const fileName = result.article.name + '.pdf'
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
                setLoading2(false)
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
                setLoading2(false)
            }
        }).catch(err => {
            messageApi.open({
                type: 'error',
                content: '下载失败！',
            })
            setLoading2(false)
        })
    }
    return (
        <>
            <Space direction="vertical" size={16}>
                {clickcontextHolder}
                {contextHolder}
                <AnimatedCard
                    title={result.article.name}
                    className={'result-card'}
                    hoverable
                    extra={
                        <>
                            <div style={{ display: 'inline' }} onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                                <Tooltip title="这篇文章符合我的要求！" color={'blue'}>
                                    <Radio.Group optionType='button' size="large" buttonStyle="solid" value={true}>
                                        <Radio.Button style={{ fontSize: '18px' }} value={liked} onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); like(); openNotificationWithIcon('success') }}><LikeOutlined /></Radio.Button>
                                    </Radio.Group>
                                </Tooltip>
                            </div >
                            <div style={{ display: 'inline' }} onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                                <Tooltip title="这篇文章不符合我的要求！" color={'blue'}>
                                    <Radio.Group optionType='button' size="large" buttonStyle="solid" value={true} style={{ marginLeft: '1vh', marginRight: '1vh' }}>
                                        <Radio.Button style={{ fontSize: '18px' }} value={disliked} onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); dislike(); openNotificationWithIcon('success') }}><DislikeOutlined /></Radio.Button>
                                    </Radio.Group>
                                </Tooltip>
                            </div>

                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); getDetail(result) }} className="detailshow">搜索结果</div>
                        </>
                    }
                    style={{
                        ...styles,
                        width: 750,
                        marginBottom: '1vh',
                    }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); navigate(`/browser?name=${result.article.name}`) }}
                >
                    <div><p style={{ color: "#0099FF", display: 'inline' }}>作者：</p>{result.article.author}</div>
                    <div><p style={{ color: "#0099FF", display: 'inline' }}>期刊：</p>{result.article.periodical}</div>
                    <div><p style={{ color: "#0099FF", display: 'inline' }}>关键字：</p>{result.article.keywords}</div>
                    <Popover
                        content={
                            <div >
                                <div style={{ color: '#0099FF', fontSize: "2vh" }}>相关性分数:<p style={{ display: "inline", color: "black" }}>{result.hitScore.relevanceScore.toFixed(2)}</p></div>
                                <div style={{ color: '#0099FF', fontSize: "2vh" }}>推荐分数:<p style={{ display: "inline", color: "black" }}>{result.hitScore.recommendScore.toFixed(2)}</p></div>
                                <div style={{ color: '#0099FF', fontSize: "2vh" }}>点击率分数:<p style={{ display: "inline", color: "black" }}>{result.hitScore.clickRateScore.toFixed(2)}</p></div>
                                <div style={{ color: '#0099FF', fontSize: "2vh" }}>点赞分数:<p style={{ display: "inline", color: "black" }}>{result.hitScore.voteScore.toFixed(2)}</p></div>
                            </div>
                        }
                        title="详细得分"
                        trigger="hover">
                        <div className='comprehensive' style={{
                            position: 'absolute',
                            top: 70,
                            right: 34,
                            color: '#0099FF',
                        }}>
                            综合得分：{result.comprehensiveScore.toFixed(2)}
                        </div>
                    </Popover>
                    <div style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 22,
                    }} onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                        <Tooltip title="下载" color={'blue'}>
                            <Button type="default" size='large' icon={<DownloadOutlined />} style={{ marginRight: '1vh', }} onClick={() => { download(); }} loading={loading2}></Button>
                        </Tooltip>
                        <Tooltip title="收藏" color={'blue'}>
                            <Radio.Group optionType='button' size="large" buttonStyle="solid" value={true}>
                                <Radio.Button style={{ fontSize: '18px',}} value={isCollect[collectKey - 1]} onClick={(e) => { e.stopPropagation(); collect(collectKey); giveMessage(); }}><FolderOutlined /></Radio.Button>
                            </Radio.Group>
                        </Tooltip>
                    </div>
                </AnimatedCard>
            </Space>
            {showDetail ? <DetailBox open={open} size={size} onClose={onClose} articleData={result} ID={result.article.articleId} /> : <></>}
        </>
    )
};
export default App;