import React from 'react'
import { Button, Image, Menu, Result, Modal } from 'antd'
import { BookOutlined, FormatPainterOutlined } from '@ant-design/icons';
import Select from './Select';
import './index.scss'
export default function App(props) {
    const { detail } = props
    const [kind, setKind] = React.useState(true)
    const [contextNum, setContextNum] = React.useState(0)
    const sentences = Object.keys(detail.contexts[contextNum].contentEqPageno)
    const pageSentence = Object.values(detail.contexts[contextNum].contentEqPageno)
    const pagePic = Object.values(detail.picture)
    const pic = Object.keys(detail.picture)

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = (index) => {
        setChoosePic(index)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };//图片详细信息
    const [imgUrl, setImgUrl] = React.useState(detail.picture[Object.keys(detail.picture)[0]])
    const showPic = () => {
        if (pic.length === 0) {
            return <Result
                status="404"
                title="未找到详细信息"
                subTitle="对不起，没有找到您想要的详细信息"
            />
        } else {
            return pic.map((item, index) => {
                return (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        <div className='pages'>{`第${pagePic[index]}页`}</div>
                        <div className='pic-button' >
                            <Button key={index} type='primary' onClick={() => { showModal(index); setImgUrl(item); }}>查看图片分析结果</Button>
                        </div>
                        <Image src={item} />
                    </div>)
            })
        }
    }
    const showSentence = () => {
        if (sentences.length === 0) {
            return <Result
                status="404"
                title="未找到详细信息"
                subTitle="对不起，没有找到您想要的详细信息"
            />
        } else {
            return sentences.map((item, index) => {
                return (
                    <div key={index}>
                        <div className='pages' style={{ marginLeft: '1.3vh', marginTop: '1vh' }}>{`第${pageSentence[index]}页`}</div>
                        <div className='sentence'>{item}</div>
                    </div>
                )
            })
        }
    }
    const [choosePic, setChoosePic] = React.useState(0)
    const [visible, setVisible] = React.useState(false);//图片预览状态
    const items = [
        {
            label: '文本详细信息',
            key: '1',
            icon: <BookOutlined />,
        },
        {
            label: '图片详细信息',
            key: '2',
            icon: <FormatPainterOutlined />,
        },
    ];
    const onSelect = (e) => {
        if (e.key === '1') {
            setKind(true)
        } else {
            setKind(false)
        }
    };
    const picMessage = [
        'Rap1GAP和β-actin在C33a，SiHa，H8三种情况下的相对蛋白表达量，Rap1GAP的蛋白表达量远高于β-actin',
        'A：细胞增殖实验 OE-Rap1GAP，NC-Rap1GAP，C33a细胞培养皿中细胞较少，sh-Rap1GAP细胞培养皿中细胞较多\nB：侵袭实验 NC-Rap1GAP SiHa sh-Rap1GAP 标记物较多\n迁移实验 NC-Rap1GAP SiHa sh-Rap1GAP 标记物较多',
        'Rap1Gap表达对宫颈C33a和SiHa细胞中EMT相关蛋白和基因的影响\nA：用Western blotting检测AMPK通路中P-AMPK、AMPK和EMT相关蛋白的表达；\nB：通过qRT-PCR检测各目标基因的相对表达水平（aP<0.01，与SiHa、C33a相比）； C：各目标蛋白的相对表达水平(aP<0.01, vs SiHa, C33a)'
    ]
    return (
        <>
            <Modal
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
                width={'fit-content'}
                footer={
                    <Button
                        type="primary"
                        onClick={handleOk}
                    >
                        确定
                    </Button>}
            >
                <div key={1} className='pic-analysis'>
                    <Image src={imgUrl} style={{ height: '25vh' }} />
                    <div className='pic-analysis-text' style={{whiteSpace: 'pre-wrap'}}>
                        {picMessage[choosePic]}
                    </div>
                </div>
            </Modal>
            <Menu onSelect={onSelect} defaultSelectedKeys={'1'} mode="horizontal" items={items} />
            <div className='detail'>
                {kind ? <div className='sentences'>
                    <div className='keywords'>
                        <p className='title'>选择关键词：</p><Select setContextNum={setContextNum} detail={detail} />
                    </div>
                    {showSentence()}
                </div> :
                    <div className='pic'>
                        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }} >
                            {
                                showPic()
                            }
                        </Image.PreviewGroup>
                    </div>}
            </div>
        </>
    )
}
