import React from 'react'
import Texty from 'rc-texty';
export default function Recommend() {

  return (
    <>
      <Texty
        type='swing'
        interval={100}
        className='recommend'
      >
        请在输入框中输入您想了解的问题：
      </Texty>
    </>
  )
}
