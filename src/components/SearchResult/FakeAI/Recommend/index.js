import React from 'react'
import Texty from 'rc-texty';
export default function Recommend(props) {
  const {text}=props;

  return (
    <>
      <Texty
        type='swing'
        interval={60}
        className='recommend'
      >
        {text}
      </Texty>
    </>
  )
}
