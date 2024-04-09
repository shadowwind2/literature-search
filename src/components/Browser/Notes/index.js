import React from 'react'
import { Button, Divider, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Search from './Search'
import Card from './Card'
import Editor from './Editor'
import Chat from './Chat'
import './index.scss'
export default function Notes() {
  const [isEdit, setIsEdit] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const [noteNum, setNoteNum] = React.useState(2)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = React.useState(false)
  const [NotesValue, setNotesValue] = React.useState([
    "<h3>1.论文概述</h3><p>可自定义问题</p><p> </p><p> </p><p> </p><p> </p><p> </p><h3>2.论文主要内容</h3><p> </p><p> </p><p> </p><p> </p><p> </p><p> </p><h3>3.论文结论</h3><p> </p><p> </p><p> </p><p> </p><p> </p><p> </p><h3>4.是否值得精读</h3><p> </p><p> </p><p> </p>",
    "<h3>1.研究背景</h3><p>可自定义问题</p><p> </p><p> </p><p> </p><p> </p><p> </p><h3>2.所做工作</h3><p> </p><p> </p><p> </p><p> </p><p> </p><p> </p><h3>3.不足</h3><p> </p><p> </p><p> </p><p> </p><p> </p><p> </p>",
  ]);
  const putNewNotes = () => {
    let arr = []
    for (let i = 0; i < NotesValue.length-2; i++) {
      arr.push(<Card setIsEdit={setIsEdit} index={i + 2} setIndex={setIndex} str={NotesValue} kind={1} key={i}/>)
      console.log(NotesValue[i+2]);
    }
    return arr;
  }
  return (
    <div className='notes'>
      {contextHolder}
      {isEdit ?
        <div className='editor'>
          <Editor setIsEdit={setIsEdit} index={index} NotesValue={NotesValue} setNotesValue={setNotesValue}/>
          <Button type="primary" shape="round" style={{ marginLeft: '1vh', marginTop: '1vh' }} onClick={() => { setModalOpen(true) }}>提问</Button>
          <Button
            loading={loading}
            type="primary"
            shape="round"
            style={{ float: 'right', marginRight: '1vh', marginTop: '1vh' }}
            onClick={() => {
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
                setIsEdit(false)
                messageApi.open({
                  type: 'success',
                  content: '保存成功',
                });
              }, 1500);
            }}>保存</Button>
          <Button shape="round" style={{ float: 'right', marginRight: '1vh', marginTop: '1vh' }} onClick={() => { setIsEdit(false) }}>返回</Button>
        </div> : <>
          <div className='notes-head'>
            <Button type="primary" shape="round" onClick={() => { setModalOpen(true) }}>进行问答</Button>
            <Button type="primary" shape="circle" onClick={() => { let NewNum=noteNum+1;setNoteNum(NewNum);setIndex(noteNum); setIsEdit(true) }}><PlusOutlined /></Button>
            <Search />
          </div>
          <Divider style={{ height: '1%' }} plain>推荐笔记</Divider>
          <div className='cards'>
            <Card setIsEdit={setIsEdit} index={0} setIndex={setIndex} str={NotesValue} kind={0}/>
            <Card setIsEdit={setIsEdit} index={1} setIndex={setIndex} str={NotesValue} kind={0}/>
            <Divider style={{ height: '1%' }} plain>自定义笔记</Divider>
            {putNewNotes()}
          </div></>}
      <Modal
        centered
        mask={false}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Chat />
      </Modal>
    </div>
  )
}
