import { LoadingOutlined } from '@ant-design/icons';
import React from 'react'
import Texty from 'rc-texty';
import axios from 'axios';

export default function App(props) {
    const { reviewData, question, setIsPre } = props
    const [isAnswer, setIsAnswer] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const [time, setTime] = React.useState(40);
    React.useEffect(() => {
        if (getCookie('AnswerLanguage') === 'English') {
            setTime(20)
        }else{
            setTime(40)
        }
        getAnswer()
    }, [])
    const values = {
        params: {
            'articleId': reviewData.articleId,
            'type': getCookie('AnswerLanguage'),
            'question': question,
        }
    };
    const getAnswer = () => {
                axios.get('https://www.izeqi.top/article/askPaper', { params: values.params, }).then((res) => {
                    setAnswer(res.data.data.thesis)
                    setIsAnswer(true)
                    
                    setIsPre(true)
                }).catch(() => {
                    setAnswer('暂无答案')
                    setIsAnswer(true)
                })
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
    return (
        <div className='Answer'>
            {isAnswer ?
                <Texty
                    type='swing'
                    interval={time}
                >
                    {/* {
                        getCookie('AnswerLanguage') === 'English' ? EnglishAnswer[id] : ChineseAnswer[id]
                    } */}
                    {answer}
                    
                </Texty> : <LoadingOutlined style={{ color: '#0099ff', fontSize: '4vh' }} />}
        </div>
    )
}
