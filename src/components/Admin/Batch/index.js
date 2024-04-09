import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
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
const props = {
    headers: { UserId: UserId },
    className:'upload-list-inline',
    listType: 'picture',
    name: 'file',
    multiple: true,
    maxCount: 8,
    action: 'https://www.izeqi.top/article/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} 文件上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败！`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const App = () => (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽到该区域实现上传</p>
        <p className="ant-upload-hint">
            支持单个或多个文件，最多支持8个文件，文献信息需在上传完成后手动补充完整
        </p>
    </Dragger>
);
export default App;