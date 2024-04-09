import React from 'react'
import Menu from "./Menu";
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from "antd";
import axios from 'axios';
import "./index.scss";
import SearchList from './SearchList';
import FakeAI from './FakeAI';
export default function SearchResult(props) {

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    const [keywords, setKeywords] = React.useState([]);//关键词
    const [searchData, setSearchData] = React.useState();//搜索结果
    const [isRender, setIsRender] = React.useState(false);
    const [data, setData] = React.useState([]);//设置数据
    const [tags, setTags] = React.useState(21);//设置标签
    const [text, setText] = React.useState('');//设置文本
    React.useEffect(() => {
        setKeywords(search);
        const values = {
            params: {
                'page': 1,
                'pageSize': 5,
                'input': search,
            }
        }
        function getSearchData() {
            setIsRender(false);
            axios.get('https://www.izeqi.top/article/translate/switch').then((res) => {
                axios.get(`https://www.izeqi.top/article/pages`, { params: values.params, }).then((res) => {
                    console.log('执行搜索，搜索结果为：', res.data.data);
                    setData(res.data.data.resultList);
                    setSearchData(res.data.data.resultList);
                    setText(res.data.data.prompt);
                    setIsRender(true);
                })
            })
        }
        getSearchData();
    }, [search]);

    return (
        <div className='searchresult'>
            <div className='menu'>
                <Menu setTags={setTags} tags={tags} data={data} />
            </div>
            <div className='searchlist'>
                {isRender ? <><FakeAI text={text} /><SearchList Data={searchData} keyword={keywords} tags={tags} /></>
                    : <div className='loading'><Skeleton active avatar paragraph={{ rows: 8 }} /></div>}
            </div>
        </div>
    )
}