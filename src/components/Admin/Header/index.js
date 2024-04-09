import React from 'react'
import { RightOutlined } from '@ant-design/icons';
export default function Header(props) {
    const {title} = props;
    const [kind,setKind] = React.useState(0);
    React.useEffect(()=>{
        if (title === 'upload') {
            setKind('完成三步，上传您的文献');
        }else if (title === 'batch') {
            setKind('批量上传文献，支持多个文件');
        }else{
            setKind('上传您的文献');
        }
    },[title])

    return (
        <>
            <RightOutlined style={{color: '#09F',marginTop:'0.5%',position:'absolute'}}/>
            <div className='content1'>文献上传</div>
            <div className='tips'>{kind}</div>
        </>
    )
}
