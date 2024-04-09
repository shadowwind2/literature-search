import { React } from 'react'
import BSearch from "./BSearch";
import Checkbox from "./CheckBox/index";
import Show from "./Show";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import "./index.scss";

export default function FirstPage(props) {
    const navigate = useNavigate()
    function getSearchParams(key) {//发送请求并处理返回值
        navigate(`/result?search=${key}`)
    }
    return (
        <>
            <div className='firstpage'>
                <div className='firstpage-title'>
                    <div className='firstpage-logo'>
                        <img src="logo.png" alt="" />
                    </div>
                    <div >
                        <img src="Prof.png" alt=""/>
                    </div>
                </div>
                <div>
                    <BSearch getSearchParams={getSearchParams} />
                </div>

                <div className='firstpage-checkBox'>
                    <Checkbox />
                </div>
                <div className='firstpage-intro'>
                    <div className='intro'>
                        <p style={{ color: "dodgerblue" }}>图片识别</p>
                        <p style={{ color: "dodgerblue" }}>批量管理</p>
                        <p style={{ color: "dodgerblue" }}>文献分析</p>
                    </div>
                    <Show />
                </div>
                <FloatButton.BackTop style={{ marginRight: '10vh' }} />
            </div>
        </>
    )
}