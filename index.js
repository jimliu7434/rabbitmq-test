const context = require('rabbit.js').createContext('amqp://user:123456@127.0.0.1:8081');
const mode = Number(process.argv[2]);

const ConnectAsync = (socket, eventName) => {
    return new Promise((resolve, reject) => {
        socket.connect(eventName, () => {
            resolve();
        });
    });
};


if (mode === 0) {
    context.on('ready', async () => {
        const Push = context.socket('PUSH');

        await ConnectAsync(Push, 'events');

        setInterval(() => {
            const t = { time: Number(new Date()) };
            Push.write(JSON.stringify(t), 'utf8');
            console.log(t);
        }, 1000);
    });
}
else {
    context.on('ready', async () => {
        const Pull = context.socket('PULL');
        await ConnectAsync(Pull, 'events');

        Pull.setEncoding('utf8');
        Pull.on('data', (note) => {
            const t = JSON.parse(note);
            t.time = new Date(t.time);
            console.log(t);
        });
    });
}