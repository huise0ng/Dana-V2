// src/Upload.js
import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('업로드 성공:', data);
      } else {
        console.error('업로드 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div>
      <h2>파일 업로드</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">업로드</button>
      </form>
    </div>
  );
};

export default FileUpload;
