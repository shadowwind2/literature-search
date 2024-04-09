import { Descriptions,Tag } from 'antd';
const tagsData = ['中医科', '呼吸科-呼吸系统', '消化科', '神经科', '心血管科-循环系统', '肾病学', '内分泌科-内分泌', '免疫科-免疫系统', '泌尿科-泌尿系统', '骨科', '妇产科-妇科', '儿科', '眼科', '口腔科', '皮肤科', '传染科', '肝胆科', '医学影像', '肛肠科', '耳鼻咽喉科', '肿瘤科-癌症']
const App = (props) => {
    const {formData,isSet}=props;
    const setTags = () => {
        let newselectTags = [];
        formData.tag.split('').map((item, i) => {
            if (item === '1') {
                newselectTags.push(tagsData[i])
            }
            return null;
        })
        return newselectTags.map((item) => <Tag color="blue">{item}</Tag>)
    }
    return (
        <Descriptions title="确认信息" bordered>
            <Descriptions.Item label="标题">{formData.name}</Descriptions.Item>
            <Descriptions.Item label="发布日期">{formData.releaseDate}</Descriptions.Item>
            <Descriptions.Item label="期刊">{formData.periodical}</Descriptions.Item>
            <Descriptions.Item label="关键词" span={3}>{formData.keywords}</Descriptions.Item>
            <Descriptions.Item label="作者" span={3}>{formData.author}</Descriptions.Item>
            <Descriptions.Item label="分类">{isSet?setTags():null}</Descriptions.Item>
            <Descriptions.Item label="类型"></Descriptions.Item>
            <Descriptions.Item label="专利"></Descriptions.Item>
        </Descriptions>
    )
};
export default App;