import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const App = (props) => {
  function getCookie(key) {
    if (document.cookie.length > 0) {
      // 字符串按照分号分割，得到数组
      let arr = document.cookie.split(";");
      for (let i = 0; i < arr.length; i++) {
        // trim:删除空格，按照等号分割，得到[键，名]的数组
        let t = arr[i].trim().split("=");
        // 判断键是否相等，返回相应的值
        if (t[0] === key) {
          return t[1];
        }
      }
    }
    return "";
  }
  const UserId = getCookie('UserId')

  const { setArticleData, setIsSet, setIsUpload } = props//设置要添加信息的文章id
  const uploadProps = {
    headers: { UserId: UserId },
    accept: '.pdf',
    name: 'file',
    multiple: false,
    maxCount: 1,
    action: 'https://www.izeqi.top/article/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setArticleData(info.file.response.data)
      }
      if (status === 'done') {
        if (info.file.response.code * 1 === 1) {
          message.success(`${info.file.name} 选择成功`);
          setArticleData(info.file.response.data)
          setIsUpload(true)
        } else {
          setIsSet(false)
          setIsUpload(false)
          message.error(`${info.file.name} 选择失败，请重试`);
        }
      } else if (status === 'error') {
        setIsUpload(false)
        setIsSet(false)
        message.error(`${info.file.name} 选择失败，请重试`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件到此处</p>
      <p className="ant-upload-hint">
        支持单个上传，严禁上传违法违规内容
      </p>
    </Dragger>
  );
}
export default App;