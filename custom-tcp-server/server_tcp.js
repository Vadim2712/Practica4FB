// custom-tcp-server/server_tcp.js
const net = require('net');

const PORT = 4000; // Выберите свободный порт, например, 4000

// Создаем TCP сервер
const server = net.createServer((socket) => {
    console.log('Клиент подключился:', socket.remoteAddress + ':' + socket.remotePort);

    // Обработка данных от клиента
    socket.on('data', (data) => {
        console.log(`Получено от клиента (${socket.remoteAddress}:${socket.remotePort}): ${data}`);

        // Пример: эхо-сервер - отправляем данные обратно клиенту
        socket.write(`Сервер получил: ${data}`);

        // Пример: закрыть соединение после получения сообщения
        // socket.end('Сообщение получено, соединение закрыто.');
    });

    // Обработка закрытия соединения
    socket.on('close', () => {
        console.log(`Клиент отключился: ${socket.remoteAddress}:${socket.remotePort}`);
    });

    // Обработка ошибок соединения
    socket.on('error', (err) => {
        console.error(`Ошибка сокета (${socket.remoteAddress}:${socket.remotePort}): ${err.message}`);
    });

    socket.write('Добро пожаловать на TCP сервер!\n');
});

// Запускаем сервер на прослушивание
server.listen(PORT, '0.0.0.0', () => {
    console.log(`TCP сервер запущен на порту ${PORT}`);
});

// Обработка ошибок сервера
server.on('error', (err) => {
    console.error('Ошибка сервера:', err);
    throw err;
});