import React from 'react'
import List from './List'
import Personal from './Personal'
import Usershow from './Usershow'
import Carousel from './Carousel'
import { animated, useSpring } from '@react-spring/web'
import axios from 'axios'

export default function Manage() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const getArticle =() => {
    setLoading(true)
    axios.get('https://www.izeqi.top/article/articles'/* ,{headers:{'UserId':1}} */).then(res => {
      setLoading(false)
      setData(res.data.data)
    })
  }
  React.useEffect(() => {
    getArticle();
  },[])

  const AnimatedPersonal = animated(Personal);
  const AnimatedUsershow = animated(Usershow);
  const AnimatedCarousel = animated(Carousel);
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
  })]//动画相关

  return (
    <div className='manage'>
      <List ownData={data} getArticle={getArticle} loading={loading}/>
      <AnimatedPersonal style={{...styles[0]}} />
      <AnimatedUsershow style={{...styles[1]}}/>
      <div style={{ width: '59vh', height: '22.5vh',borderRadius:'1.5vh',overflow:'hidden'}}>
        <AnimatedCarousel style={styles[2]} />
      </div>
    </div>
  )
}
