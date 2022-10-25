const TelegramAPI = require('node-telegram-bot-api');
const token = "5743460046:AAFKCdgRuwrnZCPEXgbZcbZKBMfktAbzcnM";

const bot = new TelegramAPI(token, {polling: true});

bot.setMyCommands([
    {command: '/start', description: 'Старт'},
    {command: '/create', description: 'Создать новую анкету'},
]);

const fs = require("fs");
const contents = fs.readFileSync("./db.json");
const jsonContent = JSON.parse(contents);

let condition = '';

bot.on('message', async msg => {
    if (msg.text === '/start') {
        await bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name}, добро пожаловать в коммьюнити Тинькофф`);
    }
    let personalData = jsonContent.find(el => el.id === msg.from.id);
    if (personalData == undefined) {
        await bot.sendMessage(msg.chat.id, 'Давай создадим новую анкету!');
        await bot.sendMessage(msg.chat.id, 'Как ты хочешь чтобы к тебе обращались?');
        condition = 'create';
        bot.on('message', async msg => {await bot.sendMessage(msg.chat.id, 'ты доблаеб');});
    }
    if (msg.text === '/create') {
        await bot.sendMessage(msg.chat.id, 'Давай создадим новую анкету');
        await bot.sendMessage(msg.chat.id, 'Как ты хочешь чтобы тебя называли?');
    }
});


//    bot.sendMessage(msg.chat.id, `Ты написал мне ${msg.text}`);
//    