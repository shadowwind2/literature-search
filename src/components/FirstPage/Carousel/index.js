import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '20vh',
  color: '#fff',
  lineHeight: '20vh',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => (
  <div style={{borderRadius:'2vh',overflow:'hidden'}}>
    <Carousel autoplay effect="fade" >
      <div>
        <h3 style={contentStyle}>
          <img src="https://img1.imgtp.com/2023/04/08/F4gJBeLe.jpg" alt="1.jpg" title="1.jpg" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="https://img1.imgtp.com/2023/04/08/t3y6BY19.jpg" alt="2.jpg" title="2.jpg" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="https://img1.imgtp.com/2023/04/08/K0XcUHXK.jpg" alt="3.jpg" title="3.jpg" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="https://img1.imgtp.com/2023/04/08/3apsPDrS.jpg" alt="4.jpg" title="4.jpg" />
        </h3>
      </div>
    </Carousel>
  </div>
);

export default App;