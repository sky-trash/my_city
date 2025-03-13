const express = require('express');
const app = express();
const allowedIps = ['192.168.1.1', '192.168.1.2']; // Список разрешённых IP-адресов

app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (allowedIps.includes(clientIp)) {
    next();
  } else {
    res.status(403).send('Доступ запрещён');
  }
});

app.use(express.static('dist')); // Статический хостинг для Vue приложения

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});