const TelegramAPI = require('node-telegram-bot-api');
const token = "5743460046:AAFKCdgRuwrnZCPEXgbZcbZKBMfktAbzcnM";

const bot = new TelegramAPI(token, {polling: true});

bot.setMyCommands([
    {command: '/start', description: 'Старт'},
    {command: '/create', description: 'Создать новую анкету'},
]);

const start = async () => {
    var condition = '';
    var msgId = '';
    var name = '';
    var stage = 0;

    const fs = require("fs");
    const contents = fs.readFileSync("./db.json");
    const jsonContent = JSON.parse(contents);

    bot.on('message', async msg => {
        if (msg.text === '/start') {
            await bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name}, добро пожаловать в коммьюнити Тинькофф`);
        }
        let personalData = jsonContent.find(el => el.id === msgId);
        if (personalData == undefined) {
            condition = 'creation';
            
        };
    });
};

start();