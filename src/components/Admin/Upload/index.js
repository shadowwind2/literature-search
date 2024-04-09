import { Button, message, Steps, theme, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Drop from './Drop';
import Form from './Form';
import ShowData from './ShowData';
import Online from './Online';

const steps = [
  {
    title: '选择文献',
  },
  {
    title: '填写信息',
  },
  {
    title: '上传文献',
  },
];
const App = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    switch (current) {
      case 0:
        if (isUpload) {
          setCurrent(current + 1);
        } else {
          message.error('请选择文件，我们将帮您识别一部分信息');
        }
        break;
      case 1:
        if (isEdit) {
          setCurrent(current + 1);
        }
        else {
          message.error('请填写并保存完整信息');
        }
        break;
      default:
        break;
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const [articleId, setArticleId] = useState(0);//文章id
  const [articleData, setArticleData] = useState({});//文章数据
  const [isSet, setIsSet] = useState(false);//是否设置了文章数据

  const contentStyle = {
    flex: 1,
    boxSizing: 'border-box',
    padding: '22px 0',
    width: '100%',
    position: 'relative',
    lineHeight: '260px',
    textAlign: '',
    color: token.colorTextTertiary,
    marginTop: 16,
  };

  const [loadings, setLoadings] = useState(false);//上传按钮的loading状态
  const [isUpload, setIsUpload] = useState(false);//是否上传了文件

  const upload = () => {
    setLoadings(true);
    axios.post('https://www.izeqi.top/article/changeInfo', formData).then((res) => {
      setLoadings(false);
      message.success('上传完成!')
      navigate('/admin/success')
      console.log(res)
    })
  }
  const [uploadKind, setUploadKind] = useState(true);//上传方式
  const onChange = (e) => {
    if (e.target.value === '1') {
      setUploadKind(true);
    } else {
      setUploadKind(false);
    }
  }
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        <div className='drop' style={{ position: 'absolute', zIndex: current === 0 ? 1 : 0, backgroundColor: 'white' }}>
          <Radio.Group onChange={onChange} defaultValue="1" style={{ position: 'absolute', top: '48vh' }}>
            <Radio.Button value='1' >本地上传</Radio.Button>
            <Radio.Button value="0">在线上传</Radio.Button>
          </Radio.Group>
          {uploadKind?<Drop
            setArticleId={setArticleId}
            setArticleData={setArticleData}
            setIsSet={setIsSet}
            setIsUpload={setIsUpload}
          />:<Online/>}
        </div>
        <div className='form' style={{ position: 'absolute', zIndex: current === 1 ? 1 : 0, backgroundColor: 'white' }}>
          <Form
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            formData={formData}
            setFormData={setFormData}
            articleId={articleId}
            articleData={articleData}
            setIsSet={setIsSet}
            isUpload={isUpload}
          />

        </div>
        <div className='success' style={{ position: 'absolute', zIndex: current === 2 ? 1 : 0, backgroundColor: 'white' }}>
          <ShowData formData={formData} isSet={isSet} />
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} style={{}}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => { upload() }} loading={loadings}>
            完成上传
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            上一步
          </Button>
        )}
      </div>
    </>
  );
};
export default App;