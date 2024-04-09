import React from 'react'
import Texter from './Texter';
import Answer from './Answer';
import Texty from 'rc-texty';
import { Input, Button, Select, Spin } from 'antd';
import { useSpring, animated } from '@react-spring/web'
import './index.scss'
import axios from 'axios';
export default function App(props) {

    const { reviewData } = props;

    const { TextArea } = Input;
    const styles = [
        useSpring({
            from: { opacity: 1, scale: 0, },
            to: { opacity: 0, scale: 0.8 },
            loop: true,
            config: {
                mass: 1, tension: 180, friction: 40
            },
        }),
        useSpring({
            from: { x: 20 },
            to: { x: 0 },
        }),
    ];
    const [question, setQuestion] = React.useState('');

    const Question = React.useRef(null)
    const getQuestion = () => {
        setQuestion(Question.current.resizableTextArea.textArea.value);
        setTimeout(() => {
            setIsAnswered(true);
        }, 1000)
    }
    const [Elements, setElements] = React.useState([])
    const [isAnswered, setIsAnswered] = React.useState(false);

    const [preQuestion, setPreQuestion] = React.useState('1');
    const [isPre, setIsPre] = React.useState(false);
    const handleChange = (value) => {
        setPreQuestion(value);
    }
    const ask = (options) => {
        setQuestion(options[preQuestion].label);
        setIsPre(false);
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
    const values = {
        params: {
            'articleId': reviewData.articleId,
            'type': getCookie('AnswerLanguage'),
        }
    };
    const [options, setOptions] = React.useState([])
    const [isOverview, setIsOverview] = React.useState(false);
    React.useEffect(() => {
        if (!isOverview) {
            axios.get('https://www.izeqi.top/article/askThesis', { params: values.params, }).then((res) => {
                setIsOverview(true);
                let newOptions = res.data.data.question.map(
                    (item, index) => {
                        return {
                            value: index,
                            label: item.slice(3)
                        };
                    }
                )
                setOptions(newOptions)
                let temp = [...Elements]
                temp.push(
                    <p style={{ fontSize: "2vh" }} key={0}>文献概论：</p>
                )
                temp.push(
                    <div className='Answer' key={1}>
                        <Texty
                            type='swing'
                            interval={70}
                        >
                            {res.data.data.thesis}
                        </Texty>
                    </div>
                )
                setElements(temp)

                setIsPre(true)
            }).catch(() => {
                let temp = [...Elements]
                temp.push(
                    <div className='Answer'>
                        暂无信息
                    </div>
                )
                setElements(temp)
            })
        }
        if (question.length !== 0) {
            let temp = [...Elements]
            temp.push(
                <animated.div className='question' key={Elements.length + 1}>
                    {question}
                </animated.div>
            )
            temp.push(
                <Answer setIsPre={setIsPre} question={question} reviewData={reviewData} isAnswered={isAnswered} Elements={Elements} key={Elements.length + 2} id={Elements.length} />
            )
            setElements(temp)
        }

    }, [question])
    const canLoading=()=>{
        if (!isOverview) {
            return <Spin size="large" />
        }else
        {
            return <></>
        }
    }
    return (
        <div className='result-fakeai'>
            <div className='result-anime'>
                <animated.div style={{ ...styles[0] }}>
                    <svg t="1679984853720" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1340" id="mx_n_1679984853720" width='100%' height='100%'>
                        <path d="M511.33 959.83c-247.04 0-448.02-200.99-448.02-448.02 0-247.04 200.98-448.04 448.02-448.04s448.04 200.99 448.04 448.04c-0.01 247.02-201 448.02-448.04 448.02z m0-830.82c-211.06 0-382.78 171.72-382.78 382.79 0 211.06 171.72 382.78 382.78 382.78 211.08 0 382.79-171.72 382.79-382.78 0-211.07-171.72-382.79-382.79-382.79z" fill="#337dff" p-id="1341"></path>
                    </svg>
                </animated.div>
                <div style={{ position: 'absolute' }}>
                    <svg t="1679984853720" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1340" id="mx_n_1679984853720" width='100%' height='100%'>
                        <path d="M511.33 511.8m-207.15 0a207.15 207.15 0 1 0 414.3 0 207.15 207.15 0 1 0-414.3 0Z" fill="#337dff" p-id="1342"></path>
                    </svg>
                </div>
                <Texter />

                <Button size='large' type='primary' style={{
                    position: 'absolute',
                    top: '2vh',
                    left: '94vh'
                }}
                    onClick={() => { getQuestion(); setIsPre(false); }}>
                    生成
                </Button>
            </div>
            <TextArea
                ref={Question}
                rows={2}
                placeholder="请在此输入问题，按下生成键生成回答"
                maxLength={100}
                showCount
                onPressEnter={() => { getQuestion() }} />
            <div className='Answers'>
                {Elements}
                {isPre ?
                    <div>
                        <div style={{ display: 'inline', color: '#0099ff', fontSize: '2.5vh', marginRight: '2vh' }}>
                            推荐问题:
                        </div>
                        <Select
                            size='large'
                            defaultValue={options[0].label}
                            onChange={handleChange}
                            style={{
                                width: 550,
                            }}
                            options={
                                options
                            }
                        />
                        <Button size='large' type='primary' style={{ marginLeft: '2vh' }} onClick={() => {
                            ask(options);
                        }}>确定</Button>
                    </div> :canLoading()}
            </div>

        </div>
    )
}
