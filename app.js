const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animalRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/animals', animalRoutes);
app.use('/api/users', userRoutes);

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 添加这部分代码启动服务器
const PORT = process.env.PORT || 3000;  // 指定端口
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 导出 app 用于测试
module.exports = app;
