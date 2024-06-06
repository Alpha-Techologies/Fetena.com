import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Tag,theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';


const Tags = () => {
  const [tags,setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    // Use the callback form of setTags to ensure we get the latest state
    setTags((prevTags) => {
      const newTags = [...prevTags, inputValue];
      console.log(newTags);
      return newTags;
    });
  
    setInputVisible(false);
    setInputValue('');
  };
  
  const forMap = (tag) => (
    <span key={tag} style={{ display: 'inline-block' }}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: '#f0f0f0',
    borderStyle: 'dashed',
  };

  return (
    <div>
      <Form.Item label="Tags">
        <>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              appear={false}
              enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              onEnd={(e) => {
                if (e.type === 'appear' || e.type === 'enter') {
                  e.target.style = 'display: inline-block';
                }
              }}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Button onClick={showInput} style={tagPlusStyle}>
              <div className="flex justify-center gap-2">
                <PlusOutlined /> New Tag
              </div>
            </Button>
          )}
        </>
      </Form.Item>
    </div>
  );
};

export default Tags;
