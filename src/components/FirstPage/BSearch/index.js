import React from 'react'
import { useRef } from "react";
import './index.scss'

export default function BSearch(props) {
    const {getSearchParams} = props;
    const textInput = useRef(null);
    function onkeydown(e) {
        if (e.keyCode === 13) {
            getSearchParams(textInput.current.value)
        }
    }
    return (
        <div className="search-wrap" onClick={toFocus}>
            <div className="search-box">
                <div className="search-drop">
                    <div>
                        <span className="search-tab-text">
                            <span className="searchwhich">文献</span>
                            <a href="http://localhost:3000/" className="fold2">
                                <svg t="1650008299516" className="arrow2" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M483.029333 286.165333l30.165334-30.208 415.957333 415.829334c16.426667 16.426667 16.64 43.648 0 60.288a42.538667 42.538667 0 0 1-60.330667 0.042666L513.28 376.746667l-355.242667 355.413333a42.496 42.496 0 0 1-60.288 0 42.837333 42.837333 0 0 1-0.085333-60.330667l383.701333-383.872 1.706667-1.749333z"
                                        p-id="2671"></path>
                                </svg>
                            </a>
                        </span>
                    </div>
                    <div className="search-dropdown" style={{ display: 'none' }}>
                        <div className="search-kind2" id="icon">文献</div>
                        <div className="search-kind2" id="picture">新闻</div>
                        <div className="search-kind2" id="user">图片</div>
                    </div>
                </div>
                <input type="text" className="search-input" ref={textInput} onKeyDown={onkeydown}></input>
            </div>
        </div>
    )
    function toFocus() {
        textInput.current.focus();
    }
}
