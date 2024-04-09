import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import Recommend from './Recommend'
export default function FakeAI(props) {

    const {setIsRecommend,text}=props;

    const [style] = useSpring(
        () => ({
            from: { opacity: 1, scale: 0, },
            to: { opacity: 0, scale: 0.8 },
            loop: true,
            config: {
                mass: 1, tension: 180, friction: 40
            },
        }))

    return (
        <div className='fakeai'>
            <div className='anime'>
                <animated.div style={{ ...style }}>
                    <svg t="1679984853720" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1340" id="mx_n_1679984853720" width='100%' height='100%'>
                        <path d="M511.33 959.83c-247.04 0-448.02-200.99-448.02-448.02 0-247.04 200.98-448.04 448.02-448.04s448.04 200.99 448.04 448.04c-0.01 247.02-201 448.02-448.04 448.02z m0-830.82c-211.06 0-382.78 171.72-382.78 382.79 0 211.06 171.72 382.78 382.78 382.78 211.08 0 382.79-171.72 382.79-382.78 0-211.07-171.72-382.79-382.79-382.79z" fill="#337dff" p-id="1341"></path>
                    </svg>
                </animated.div>
                <div style={{ position: 'absolute'}}>
                    <svg t="1679984853720" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1340" id="mx_n_1679984853720" width='100%' height='100%'>
                        <path d="M511.33 511.8m-207.15 0a207.15 207.15 0 1 0 414.3 0 207.15 207.15 0 1 0-414.3 0Z" fill="#337dff" p-id="1342"></path>
                    </svg>
                </div>
            </div>
            <Recommend setIsRecommend={setIsRecommend} text={text}/>
        </div>

    )
}
