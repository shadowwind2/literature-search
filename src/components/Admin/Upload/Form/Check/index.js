import { Tag } from 'antd';
import React, { useState } from 'react';
const { CheckableTag } = Tag;
const tagsData = ['社会科学','法学', '经济学','数学', '物理', '化学', '地理', '生物', '计算机','机械', '材料', '电子', '通信', '环境','软件', '食品', '哲学', '医学', '制造', '农业', '管理']
const App = (props) => {
  const { tags, setTags } = props;
  const setNewTags = () => {
    let newselectTags = [];
    tags.split('').map((item, i) => {
      if (item === '1') {
        newselectTags.push(selectedTags[i])
      }
      return null;
    })
    setSelectedTags(newselectTags)
  }

  const [selectedTags, setSelectedTags] = useState(tagsData);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('你感兴趣的是： ', nextSelectedTags);
    let newTags = tags.split('');
    let TagsIndex = [];
    nextSelectedTags.map((item) => {
      TagsIndex.push(tagsData.indexOf(item))
      return null;
    })
    if (TagsIndex.length === 0) {
      newTags = newTags.map((item) => '0')
    } else {
      TagsIndex.map((item) => {
        newTags[item] = '1'
        return null;
      })
    }
    setTags(newTags.join(''))
    setSelectedTags(nextSelectedTags);
  };
  React.useEffect(() => {
    setNewTags();
  }, [tags]);
  return (
    <>
      <div
        style={{
          width: '22vh',
          marginRight: 8,
          color: '#09f',
          fontSize: '2vh',
        }}
      >
        选择搜索标签:
      </div>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
};
export default App;