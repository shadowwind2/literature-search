import React from 'react'
import { Card, Divider,Button } from 'antd';
import { FileSearchOutlined,LikeOutlined,FireOutlined,RightOutlined } from '@ant-design/icons';
import { useSpring, animated } from '@react-spring/web'
import './index.scss';
export default function Pay() {
  const AnimatedCard = animated(Card);
  const styles = useSpring({
    from: { y: 40 },
    to: { y: 0 },
  })//动画相关
  return (
    <div className='pay-wrap'>
      <AnimatedCard
        hoverable
        style={{
          ...styles,
          width: 350,
        }}
      >
        <div className='kind'>
          <FileSearchOutlined style={{ color: 'green', marginRight: '1vh' }} />
          试用版
        </div>
        <Divider />
        <div className='items'>
          <div className='item'>每天免费导入文献篇数:<div className='number'>30</div></div>
          <div className='item'>每天文心模型问答次数:<div className='number'>10</div></div>
        </div>
        <Button disabled type='primary' size='large' block style={{display:'absolute',bottom:'-34.5vh'}}>当前套餐</Button>
      </AnimatedCard>
      <AnimatedCard
        hoverable
        style={{
          ...styles,
          width: 350,
        }}>
        <div className='kind'>
          <LikeOutlined style={{ color: '#0084ff', marginRight: '1vh' }} />
          尝鲜版
        </div>
        <Divider />
        <div className='items'>
          <div className='item'>每天免费导入文献篇数:<div className='number'>300</div></div>
          <div className='item'>每天文心模型问答次数:<div className='number'>100</div></div>
          <div className='item'>文献信息自动提取</div>
          <div className='item'>搜索时专业领域关键词联想</div>
          <div className='item'>支持自然语言搜索，指令</div>
        </div>
        <Button type='primary' size='large' block style={{display:'absolute',bottom:'-15vh'}}>15.9元/月<RightOutlined /></Button>
      </AnimatedCard>
      <AnimatedCard
        hoverable
        style={{
          ...styles,
          width: 350,
        }}>
                <div className='kind'>
          <FireOutlined style={{ color: 'red', marginRight: '1vh' }} />
          会员版
        </div>
        <Divider />
        <div className='items'>
          <div className='item'>每天免费导入文献篇数:<div className='number'>无限次</div></div>
          <div className='item'>每天文心模型问答次数:<div className='number'>无限次</div></div>
          <div className='item'>支持从期刊数据库直接导入文献</div>
          <div className='item'>文献信息自动提取</div>
          <div className='item'>搜索时专业领域关键词联想</div>
          <div className='item'>支持自然语言搜索，指令</div>
        </div>
        <Button type='primary' size='large' block style={{display:'absolute',bottom:'-8.5vh'}}>59.9元/月<RightOutlined /></Button>
      </AnimatedCard>
    </div>
  )
}
