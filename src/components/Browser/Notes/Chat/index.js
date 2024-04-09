import React from 'react'
import { Input, Button, Spin, Tag } from 'antd';
import { KeyOutlined, MonitorOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Texty from 'rc-texty';
import './index.scss';
const { TextArea } = Input;
export default function Chat() {
    const [question, setQuestion] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
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
    const [search, setSearch] = useSearchParams()
    const values = {
        params: {
            'articleId': search.get('articleId'),
            'type': getCookie('AnswerLanguage'),
            'question': question,
        }
    };
    const [isAnswer, setIsAnswer] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const getAnswer = () => {
        setIsAnswer(true)
        axios.get('https://www.izeqi.top/article/askPaper', { params: values.params, }).then((res) => {
            setAnswer(res.data.data.thesis)
            setLoading(false)
        }).catch(() => {
            setAnswer('暂无答案')
            setLoading(false)
        })
    }//问答
    const onChange = (e) => {
        setQuestion(e.target.value);
      };
    return (
        <div className='chat'>
            <div className='ask'>
                <TextArea rows={1} onChange={onChange}/>
                <Button type="primary" shape="round" style={{ marginLeft: '1vh' }} onClick={getAnswer}>提问</Button>
            </div>
            {isAnswer ? loading ?
                <Spin size="large" style={{ marginTop: '2vh' }} /> :
                <div className='answer'>
                    <Texty
                        type='swing'
                        interval={50}
                        className='recommend'
                    >
                        {answer}
                    </Texty>
                </div> : <div style={{marginTop: '2vh' }}>
                <Tag icon={<KeyOutlined />} color="#55acee">
                    智能问答
                </Tag>
                <Tag icon={<MonitorOutlined />} color="#cd201f">
                    辅助科研
                </Tag>
            </div>}
        </div>
    )
}
