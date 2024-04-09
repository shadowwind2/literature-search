import { Descriptions, Button, Radio } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
const App = (props) => {
    const { reviewData, setReviewData, setIsReview } = props;
    const [data, setData] = React.useState(reviewData);
    const setLanguage = (e) => {
        Cookies.set('AnswerLanguage',e,{ expires: 7 })
    }
    function getCookie(key) {
        if (document.cookie.length > 0) {
          // 字符串按照分号分割，得到数组
          let arr = document.cookie.split(";");
          for (let i = 0; i < arr.length; i++) {
            // trim:删除空格，按照等号分割，得到[键，名]的数组
            let t = arr[i].trim().split("=");
            // 判断键是否相等，返回相应的值
            if (t[0] === key) {
              return t[1];
            }
          }
        }
        return "";
    }
    React.useEffect(() => {
        setData(reviewData);
    }, [reviewData])
    return (data.length === 0 ? <></> :
        <>
            <div className='chosen-description'>
                <h2 style={{ color: '#0099ff', fontSize: '2.5vh', display: 'inline' }}>已选中的文献:</h2>
                <Button onClick={() => { setReviewData([]) }} style={{ float: 'right' }}>删除</Button>
                <Button type='primary' onClick={() => { setIsReview(true) }} style={{ float: 'right', marginRight: '1vh' }}>开始问答</Button>

            </div>
            <div className='chosen-card'>
                <Descriptions>
                    <Descriptions.Item span={3} label="名称">{data.name}</Descriptions.Item>
                    <Descriptions.Item span={3} label="作者">{data.author}</Descriptions.Item>
                    <Descriptions.Item span={3} label="关键字">{data.keywords}</Descriptions.Item>
                    <Descriptions.Item span={3} label="期刊">{data.periodical}</Descriptions.Item>
                    <Descriptions.Item span={3} label="发布日期">{data.releaseDate}</Descriptions.Item>
                    <Descriptions.Item span={3} label="标签"></Descriptions.Item>
                </Descriptions>
            </div>
            <div style={{ display: 'inline',fontSize:'2vh',marginLeft:'1.5vh',color:'#0099ff'}}>选择问答语言:
                <Radio.Group
                    defaultValue={getCookie('AnswerLanguage')}
                    size="large"
                    style={{marginLeft:'1vh'}}
                    onChange={(e) => { setLanguage(e.target.value)}}
                >
                    <Radio.Button value="Chinese">简体中文</Radio.Button>
                    <Radio.Button value="English">English</Radio.Button>
                </Radio.Group>
            </div>
        </>
    )
};
export default App;