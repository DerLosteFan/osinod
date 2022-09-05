const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Player = require('../../../../helper/player.js');
const send = require('../../../../tools/send.js')
const message = context.params.event;
const keyDetails = await lib.utils.kv['@0.1.16'].get({
  key: `${process.env.key}_${message.guild_id}`,
});

if (message.content.startsWith('!setup')) {
  let channelId = message.content.match(/\d+/g);
  if (!channelId)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Please mention the channel where you want to set up the music bot.`,
      channel_id: message.channel_id,
    });
  else channelId = channelId[0];

  const msg = await lib.discord.channels['@0.2.0'].messages.create({
    content: `**» Dashboard «**\n.`,
    channel_id: channelId,
    embed: {
      title: `Vibing Alone`,
      url: ``,
      description: `This is the Sonido bot.`,
      color: 0xD43790,
      image: {
        url: 'https://images-ext-1.discordapp.net/external/TIU--vBjebNww-afGf5x1uV_kjs15Fy2R9MSE6uHoXc/https/media.discordapp.net/attachments/920415636180598834/933785721523810384/llac.gif',
      },
      thumbnail: {
        url: 'https://media.discordapp.net/attachments/884862841063100427/934047938387263488/Bildschirmfoto_2022-01-21_um_12.32.29.png',
      },
    },
  });

  await Player.reset({keyDetails: {channelId, messageId: msg.id}});

  await lib.utils.kv['@0.1.16'].set({
    key: `${process.env.key}_${message.guild_id}`,
    value: {channelId, messageId: msg.id},
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    content: `Setup is completed :) Have fun!`,
    channel_id: message.channel_id,
  });
} else if (keyDetails && keyDetails.channelId === message.channel_id) {
  const voice_channel = await lib.utils.kv['@0.1.16'].get({
    key: `voice_${process.env.key}_${message.guild_id}_${message.author.id}`,
  });

  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: message.id, // required
    channel_id: message.channel_id, // required
  });

  if (!voice_channel)
    return send("Please join a voice channel first!", { channel_id: context.params.event.channel_id })

  await Player.play(message.content, {
    channel_id: voice_channel.channelId,
    guild_id: message.guild_id,
    keyDetails,
  }).catch(async (err) => {
    console.log(err)
    await send("Unable to play the song, please try again later!", { channel_id: context.params.event.channel_id })
  });
}







