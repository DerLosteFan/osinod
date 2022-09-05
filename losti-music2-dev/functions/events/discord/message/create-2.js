const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {Tools} = require('autocode-discordjs');

if (context.params.event.content.startsWith('stalk karo')) {
await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Hey! <@${context.params.event.author.id}> du bist nicht dazu berechtigt`,
})};