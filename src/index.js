import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 导入antd样式
import 'antd/dist/antd.css'; 

// 最后引入自写样式防止被覆盖
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
