import React from 'react'
import { Button, Image, Result, Modal } from 'antd'
import './index.scss'
export default function App(props) {

    const { detail } = props
    const pagePic = Object.values(detail.picture)
    const pic = Object.keys(detail.picture)

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
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
                        <div className='pages'>{`第${index + 1}张图片`}</div>
                        <div className='pic-button' >
                            <Button key={index} type='primary' onClick={() => { showModal(); setImgUrl(item) }}>查看图片分析结果</Button>
                        </div>
                        <Image src={item} />
                    </div>)
            })
        }
    }
    const [visible, setVisible] = React.useState(false);//图片预览状态

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
                    <div className='pic-analysis-text'>
                        Model Architecture. Rounded rectangles are operations, sharp rectangles are extracted features and is element-wise multiplication. The model consists of three main branches. Visual branch extracts human, object and context features. Spatial Attention branch refines the visual features by utilizing the spatial configuration of the human-object pair. Graph Convolutional branch extracts interaction features by considering humans/objects as nodes and their interactions as edges. Action class probabilities from each branch and the interaction proposal score are multiplied together to aggregate the final prediction. These operations are repeated for every human-object pair.
                    </div>
                </div>
            </Modal>
            <div className='detail'>
                <div className='pic'>
                    <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }} >
                        {
                            showPic()
                        }
                    </Image.PreviewGroup>
                </div>
            </div>

        </>
    )
}
