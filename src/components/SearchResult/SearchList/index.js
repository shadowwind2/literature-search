import React, { useState } from 'react'
import Card from "./Card";
import { Pagination,Result } from 'antd';
import "./index.scss";

export default function SearchList(props) {
    const { Data, keyword,tags } = props;

    const [isRecommend, setIsRecommend] = React.useState(false);//监视推荐是否已经出现的状态
    const [isCollect, setIsCollect] = useState([]);//是否收藏的状态
    const [searchData, setSearchData] = useState(Data);
    React.useEffect(() => {
        setIsCollect(new Array(Data.length).fill(false));
        setPage(1);
        if (tags === 21) {
            setSearchData(Data);
        }else{
            setSearchData(Data.filter((item) => item.article.tag.split('')[tags] === '1'));
        }
    }, [tags, Data]);

    const [page, setPage] = useState(1);
    const onChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const totalJudge = () => {
        if (searchData.length === 0) {
            return 0;
        } else {
            return searchData.length;
        }
    }

    const newCard = () => {
        if (searchData.length===0) {
            return <Result
            status="404"
            title="暂无相关文献"
          />
        }else{
        return searchData.map((result, i) => {
            if (((i + 1) * 1 >= (5 * (page - 1) + 1)) && ((i + 1) * 1 <= 5 * page)) {
                return <Card
                    isCollect={isCollect}
                    setIsCollect={setIsCollect}
                    setIsRecommend={setIsRecommend}
                    isRecommend={isRecommend}
                    result={result}
                    collectKey={result.resultRanking}
                    key={result.article.articleId}
                    DetailId={result.article.articleId}
                    index={i - 5 * (page - 1)}
                    keyword={keyword}
                />;
            }
            return null;
        })
    }
    }

    return (
        <div className='searchcards'>
            <div className='search-card'>
                {newCard()}
            </div>
            <div className='pagination'>
                <Pagination showQuickJumper defaultCurrent={1} total={totalJudge()} onChange={onChange} pageSize={5} showSizeChanger={0} current={page}/>
            </div>
        </div>
    )
}
