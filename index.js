// Load up the discord.js library
const { Client, Attachment } = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Nô tì của Tiêu - Đang online ở ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Nô tì của Tiêu - Đang online ở ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
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
      "nuxi",
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
      "nu xi",
      "nuxi",
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
  
  if(commands.indexOf(command) == -1) {
    var request = require('request');
    request('http://sandbox.api.simsimi.com/request.p?key=0bf9c6ca-0039-4701-be36-ad22b750201d&lc=en&ft=1.0&text=' + encodeURI(message.content.replace('+', '')), function (error, response, body) {
        
        const obj = JSON.parse(body);    
        
        message.channel.send(obj.response);
    });
    
  }

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
  
  if(command === 'play') {
    if (message.member.voiceChannel) {
        const connection = await message.member.voiceChannel.join();
    } else {
        message.reply('ĐMM. Vô voice đi đã rồi gọi tao.');
    }
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);