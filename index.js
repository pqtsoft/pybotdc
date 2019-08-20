// Load up the discord.js library
const { Client, Attachment } = require("discord.js");
var request = require('request');
const client = new Client();
const config = require("./config.json");

const Music = require('./music.js');

Music.start(client, {
  youtubeKey: '',
  prefix: '+',
  anyoneCanLeave: true,
  anyoneCanSkip: true,
  anyoneCanPause: true,
  clearOnLeave: true,
});
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Nô tì của Tiêu - Đang online ở ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  client.user.setActivity(`Nô tì của Tiêu - Đang online ở ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  client.user.setActivity(`Nô tì của Tiêu - Đang online ở ${client.guilds.size} servers`);
});


var countFuck = [];

var commands = [
    "avatar",
    "ping",
    "pick",
    "cht",
    "play",
    "say",
    "kick",
    "prune"
];


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  
  
  var filterFuckMess = [
      "ocschos",
      "óc chó",
      "óc tró",
      "Tiu ngu",
      "stew ngu",
      "Tiu nuxi",
      "nunu",
      "vc",
      "Tiêu óc chó",
      "Tew óc chó",
      "Tiu óc chó",
      "Stew óc chó",
      "Tiêu óc tró",
      "Tew óc tró",
      "Tiu óc tró",
      "Stew óc tró",
      "Đm tiêu",
      "Đm stew",
      "đm tiu",
      "đụ má",
      "địt mẹ",
      "địt con mẹ",
      "cứt",
      "đm",
      "dcm",
      "đcm",
      "đệch",
      "móa",
      "đậu xanh",
      "vãi nồi",
      "dkm",
      "đù",
      "cex",
      "cax",
      "vloz",
      "vlin",
      "đệt",
      "bot ngu",
      "bo t ngu",
      "b o t ngu",
      "đê ma ma",
      "mất dạy",
      'lz',
      'loz',
      'lồn',
      'vcl',
      'vl',
      "đờ mờ",
      "chó",
      "dklmm",
      "chịch"
  ];
  const attachment = new Attachment('https://i.imgur.com/iNoQ90z.png');
  var messReply = [
    "Chửi cl, im đê ",
    "Là người có văn hóa tí đê, ko chửi bậy, dcmm ",
    "Channel trong sáng, đừng chửi bậy nhé, dcmm ",
    "Cẩn thận bố mày đấy "
  ];

  var fightMess = [
    'đánh nhau',
    'sợ à',
    'sao chửi tao',
    'sao m chửi tao',

  ];

  var messFightReply = [
    "Dutdit cho nó văn hóa, đánh đấm gì?",
    "Chịch không?",
    "M nằm dưới nhé?"
  ];

  var handsomeMess = [
    "đẹp trai ko",
    "đẹp trai không",
    "đẹp trai hok",
    "đẹp trai hk",
    "đẹp gái ko",
    "đẹp gái không",
    "đẹp gái hok",
    "đẹp gái hk",
    
  ];

  handsomeMess.forEach(val => {
    if(message.content.indexOf(val) != -1) {
      message.channel.send("Đéo " + message.author);

    }
  });

  fightMess.forEach(val => {
    if(message.content.toLowerCase().indexOf(val.toLowerCase()) != -1) {
      let intRandom = Math.floor(Math.random() * messFightReply.length);
      message.channel.send(messFightReply[intRandom] + message.author);
    }
  })

  for(var i = 0; i < filterFuckMess.length; i++) {
    const val =filterFuckMess[i];
    if(message.content.toLowerCase().indexOf(val.toLowerCase()) != -1) {
      if(["329970987388895242","343077307570716674"].find(x => x == message.author.id))
      {
        //message.channel.send("Sao em dám chửi :D");
      }
      else {
        let intRandom = Math.floor(Math.random() * messReply.length);
        var found = countFuck.find(x => x.id === message.author);
        if(!found) {
            countFuck.push({
                id: message.author,
                count: 1
            });
        }
        else {
            countFuck[countFuck.indexOf(found)].count = found.count + 1;
            if(found.count >= 3) {
                intRandom = 3;
                countFuck[countFuck.indexOf(found)].count = 0;
            }
        }
        if(intRandom === 3) {
            message.channel.send(messReply[intRandom] + message.author);
            message.channel.send(attachment);
            break;
        }
        else {
            message.channel.send(messReply[intRandom] + message.author);
            break;
        }
      }
       
    }
  }
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  

  if(command === "avatar") {
    let member = message.mentions.users.first() || message.author;

    message.channel.send(member.avatarURL);
  }

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === 'pick') {
    const argsPick = message.content.replace('pick ','').slice(config.prefix.length).trim().split(/,/g);
    if(argsPick.length > 0) {
        message.channel.send("I picked " + argsPick[Math.floor(Math.random() * argsPick.length)]);
    }
  }

  if(command === 'cb') {
    const CB = message.guild.members.find(x => x.displayName == 'Ebisu Miyuki');
    message.delete().catch(O_o=>{}); 
    message.channel.send("Ocschos, chịch không? " + CB);
  }
  if(command === 'akai') {
    const CB = message.guild.members.find(x => x.displayName == 'Akai Gun');
    message.delete().catch(O_o=>{}); 
    message.channel.send("Chửi cl, chịch không? " + CB);
  }
  if(command === 'cht') {
    const HT = message.guild.members.find(x => x.id == '376286646011822082');
    message.delete().catch(O_o=>{}); 
    message.channel.send("Chửi cl, chịch không? " + HT);
  }

  if(command === 'cht2') {
    const HT = message.guild.members.find(x => x.id == '376286646011822082');
    message.delete().catch(O_o=>{}); 
    message.channel.send(messFightReply[Math.floor(Math.random() * messFightReply.length)] + HT);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
});


client.login(config.token);
