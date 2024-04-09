import { Carousel } from 'antd';
const contentStyle = {
  height: '22vh',
  color: '#fff',
  lineHeight: '22vh',
  textAlign: 'center',
  background: '#364d79',
  width: '61vh',
  borderRadius: '1vh',
};
const App = (props) => {
  const {style} = props;
  return(
  <Carousel autoplay effect="fade" style={{...style}}>
    <div>
      <h3 style={contentStyle}>
        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/1.jpg" alt="1.jpg" title="1.jpg" />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/2.jpg" alt="2.jpg" title="2.jpg" />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/3.jpg" alt="3.jpg" title="3.jpg" />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://image-hosting.obs.cn-southwest-2.myhuaweicloud.com/resources/4.jpg" alt="4.jpg" title="4.jpg" />
      </h3>
    </div>
  </Carousel>
);}
export default App;