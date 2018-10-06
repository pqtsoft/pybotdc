// Load up the discord.js library
const { Client, Attachment } = require("discord.js");
var request = require('request');
const client = new Client();
const config = require("./config.json");
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

const YTDL = require('ytdl-core');
const soundcloudr = require('soundcloudr');

function isURL(str) {
  var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

function Play(connection, message, server) {
  if(!server.queue[0]) {
    connection.disconnect();
  }
  server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: 'audioonly' }));
  server.playing = true;
  server.queue.shift();
  server.dispatcher.on("end", function () {
    if(server.queue[0]) {
      Play(connection, message, server);
    }
    else {
      connection.disconnect();
    }
  })
}

servers = {};
ids = [];

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
  
  if(command === 'move') {
    if (message.member.voiceChannel) {
      const connection = await message.member.voiceChannel.join();
    } else {
        message.reply('ĐMM. Vô voice đi đã rồi gọi tao.');
    }
  }

  if(command === 'skip') {
    const connection = await message.member.voiceChannel.join().then(connection => { 
      
      var server = servers[message.guild.id];
      Play(connection, message, server);
    });
  }

  if(command === 'play') {
    if (message.member.voiceChannel) {
          if(!servers[message.guild.id]) {
            servers[message.guild.id] = {
              queue: [],
              playing: false
            }
          } 
          
          const connection = await message.member.voiceChannel.join().then(connection => {
            var server = servers[message.guild.id];
            
            //message.reply("Ok, sủa tiếp đi.");
            if(isURL(args[0])) {
              server.queue.push(args[0]);
              if(!server.playing) {
                Play(connection, message, server);
              }
              
            }
            else {
              request("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + args.join("+") + "&key=AIzaSyBe3MMdQEdtXUbJ1raY01KYSWSOcQZmjJk", function (error, response, body) {
                  
                  const obj = JSON.parse(body);    
                  let items = [];
                  let i = 1;
                  obj.items.forEach(item => {
                    items.push(i + " => " + item.snippet.title);
                    ids.push(item.id.videoId);
                    i++;
                  });
                  message.channel.send("```Chọn nhạc đi ocschos \n" + items.join("\n") + "```")
                  .then(() => {
                    message.channel.awaitMessages(response => response.content, {
                      max: 1,
                      time: 30000,
                      errors: ['time'],
                    })
                    .then((collected) => {
                      if(ids.length > 0 && parseInt(collected.first().content)) {
                        const selected = parseInt(collected.first().content) - 1;
                        const id = ids[selected];
                        if(id) {
                          server.queue.push("https://www.youtube.com/watch?v=" + id);
                          if(!server.playing) {
                            Play(connection, message, server);
                          }
                        }
                        message.channel.send(`Add to queue: ${obj.items[selected].snippet.title}`); 
                      }    
                      console.log(server.queue);
                    })
                    .catch(() => {
                      message.channel.send('There was no collected message that passed the filter within the time limit!');
                    });
                  });
              });
            }
            
          });
        
        
    } else {
        message.reply('ĐMM. Vô voice đi đã rồi gọi tao.');
    }
  }

  if(command === 'leave') {
    const connection = await message.member.voiceChannel.join().then(connection => {
      connection.disconnect();
    });
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
});

client.login(config.token);