import React from 'react'
import Description from './Description'
import Usershow from './Usershow'
import Calendar from './Calendar'
import Decoration from './Decoration'
import { animated,useSpring } from '@react-spring/web'
import './index.scss';
export default function App() {
  const userData = {
    name: '择栖测试',
    avatar: 'https://i.328888.xyz/2023/03/28/inhTtZ.jpeg',
    email: 'user@example.com',
    phone: '1810000000',
    description: '我是一个医学生',
    tag: '空'
  }

  const AnimatedUsershow = animated(Usershow)
  const AnimatedDescription = animated(Description)
  const AnimatedCalendar = animated(Calendar)

const styles = [useSpring({
    from: { y: 20 },
    to: { y: 0 },
  }),
  useSpring({
    delay: 100,
    from: { y: 20 },
    to: { y: 0 },
  }),
  useSpring({
    delay: 200,
    from: { y: 20 },
    to: { y: 0 },
  }),
  useSpring({
    from: { x: 20 },
    to: { x: 0 },
  })
]//动画相关

  return (
    <div className='user'>
      <AnimatedDescription userData={userData} style={styles[3]}/>
      <AnimatedUsershow userData={userData} style={styles[0]}/>
      <animated.div className='decoration' style={styles[1]}>
        <Decoration />
      </animated.div>
      <AnimatedCalendar style={styles[2]}/>
    </div>
  )
}
