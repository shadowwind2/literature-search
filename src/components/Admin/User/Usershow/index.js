import { LikeOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const { Meta } = Card;
const App = (props) => {
    const {style} = props;
    return (
        <>
            <Card
                style={{
                    ...style,
                    width: '35%',
                }}
            >
                <Meta
                    description={
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="文章获得点赞数" value={520} prefix={<LikeOutlined />} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="上传文章数" value={7} />
                            </Col>
                        </Row>}
                />
            </Card>
        </>
    );
};
export default App;