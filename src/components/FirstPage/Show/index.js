import React from 'react'
import { Card, Drawer, Tooltip, Button, Radio, message } from 'antd'
import { SettingOutlined, EditOutlined, EllipsisOutlined, DownloadOutlined, FolderOutlined } from '@ant-design/icons'
import axios from 'axios'
import './index.scss'
import { animated, useSpring } from '@react-spring/web'
const { Meta } = Card;
export default function Show() {
    const [messageApi, contextHolder] = message.useMessage();
    const AnimatedCard = animated(Card)
    const styles = [useSpring({
        from: { y: 40 },
        to: { y: 0 },
    }),
    useSpring({
        delay: 100,
        from: { y: 40 },
        to: { y: 0 },
    }),
    useSpring({
        delay: 200,
        from: { y: 40 },
        to: { y: 0 },
    }),
    useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    })
    ]//动画相关
    const [open, setOpen] = React.useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const newArticle = [
        {
            title: 'Distributed Randomized Sketching Kernel Learning',
            auther: 'Rong Yin, Yong Liu, Dan Meng',
            DOI: 'https://doi.org/10.1609/aaai.v36i8.20870',
            keywords: 'Machine Learning (ML)',
            time: '2022-06-28',
        },
        {
            title: 'Better Parameter-Free Stochastic Optimization with ODE Updates for Coin-Betting',
            auther: 'Keyi Chen John Langford John Langford',
            DOI: 'https://doi.org/10.1609/aaai.v36i6.20573',
            keywords: 'Machine Learning (ML)',
            time: '2022-06-28',
        },
        {
            title: 'Negative Sample Matters: A Renaissance of Metric Learning for Temporal Grounding',
            auther: 'Zhenzhi Wang Limin Wang Tao Wu Tianhao Li Gangshan Wu',
            DOI: 'https://doi.org/10.1609/aaai.v36i3.20163',
            keywords: 'Computer Vision (CV), Speech & Natural Language Processing (SNLP)',
            time: '2022-06-28',
        },
        {
            title: 'Non-autoregressive Translation with Layer-Wise Prediction and Deep Supervision',
            auther: 'Chenyang Huang Hao Zhou Osmar R. Zaïane Lili Mou Lei Li',
            DOI: 'https://doi.org/10.1609/aaai.v36i10.21323',
            keywords: 'Machine Learning (ML)',
            time: '2022-06-28',
        }
    ]
    const putIn = () => {
        return newArticle.map((item, index) => {
            return <AnimatedCard
                title={item.title}
                className={'result-card'}
                hoverable
                extra={
                    <>
                        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }} className="detailshow">详细信息</div>
                        <Button type='primary' size='large' onClick={() => {
                            axios.get('www.izeqi.top/test/upload_from_database?articleName=Distributed Randomized Sketching Kernel Learning').then((res) => {
                            })
                            messageApi.open({
                                type: 'success',
                                content: '导入成功',
                            });
                        }}>云导入</Button>
                    </>
                }
                style={{
                    ...styles[2],
                    marginBottom: '1vh',
                }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            >
                <div><p style={{ color: "#0099FF", display: 'inline' }}>作者：</p>{item.auther}</div>
                <div><p style={{ color: "#0099FF", display: 'inline' }}>DOI：</p>{item.DOI}</div>
                <div><p style={{ color: "#0099FF", display: 'inline' }}>关键字：</p>{item.keywords}</div>
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 22,
                }} onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                    <Tooltip title="下载" color={'blue'}>
                        <Button type="default" size='large' icon={<DownloadOutlined />} style={{ marginRight: '1vh', }} onClick={() => { }}></Button>
                    </Tooltip>
                    <Tooltip title="收藏" color={'blue'}>
                        <Radio.Group optionType='button' size="large" buttonStyle="solid" value={true}>
                            <Radio.Button style={{ fontSize: '18px', }} value={1} onClick={(e) => { e.stopPropagation(); }}><FolderOutlined /></Radio.Button>
                        </Radio.Group>
                    </Tooltip>
                </div>
                <div style={{
                    position: 'absolute',
                    top: 70,
                    right: 34
                }}>
                    上传日期:{item.time}
                </div>
            </AnimatedCard>
        })
    }
    return (
        <>
            <div className='brief'>
            {contextHolder}
                <AnimatedCard
                    hoverable
                    style={{
                        ...styles[0],
                        width: '40vh',
                    }}
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <div style={{ color: 'black', fontSize: '4vh', textAlign: 'center', display: 'flex', justifyContent: 'center', marginBottom: '2vh' }}>
                        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/nature.jpg" alt="" style={{ height: '10vh', marginRight: "2vh" }} />
                        nature
                    </div>
                    <Meta style={{ textAlign: 'center' }} title="最近新作" description={<><p>Moon mission failure: why is it so hard to pull off a lunar landing?</p></>} />
                </AnimatedCard>
                <AnimatedCard
                    hoverable
                    style={{
                        ...styles[1],
                        width: '40vh',
                    }}
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <div style={{ color: 'black', fontSize: '4vh', textAlign: 'center', display: 'flex', justifyContent: 'center', marginBottom: '2vh' }}>
                        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/science.png" alt="" style={{ height: "10vh", marginRight: "2vh" }} />
                        science
                    </div>
                    <Meta style={{ textAlign: 'center' }} title="最近新作" description={<><p>Fund research on racism’s health impacts, says European group</p></>} />
                </AnimatedCard>
                <AnimatedCard
                    hoverable
                    style={{
                        ...styles[1],
                        width: '40vh',
                    }}
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                    onClick={showDrawer}
                >
                    <div style={{ color: 'black', fontSize: '4vh', textAlign: 'center', display: 'flex', justifyContent: 'center', marginBottom: '2vh' }}>
                        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/AAAI.jpg" alt="" style={{ height: "10vh", marginRight: "2vh" }} />
                        AAAI
                    </div>
                    <Meta style={{ textAlign: 'center' }} title="最近新作" description={<><p>A ring-like accretion structure in M87 connecting its black hole and jet</p></>} />
                </AnimatedCard>
                <AnimatedCard
                    hoverable
                    style={{
                        ...styles[1],
                        width: '40vh',
                    }}
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <div style={{ color: 'black', fontSize: '4vh', textAlign: 'center', display: 'flex', justifyContent: 'center', marginBottom: '2vh' }}>
                        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/NIPS.jpg" alt="" style={{ height: "10vh", marginRight: "2vh" }} />
                        NIPS
                    </div>
                    <Meta style={{ textAlign: 'center' }} title="最近新作" description={<><p>Air pollution in China is falling — but there is a long way to go</p></>} />
                </AnimatedCard>
            </div>
            <Drawer title="最近新作" placement="right" onClose={onClose} open={open} size='large'>
                <div style={{ padding: "1vh", paddingRight: '1vh' }}>
                    {putIn()}
                </div>
            </Drawer>
        </>
    )
}
