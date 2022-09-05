const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let activitynameslist = ['deine Lieblingsmusik', `your favorite music`, `tu música favorita`,'la vostra musica preferita','ta musique préférée','την αγαπημένη σας μουσική','您最喜爱的音乐','любимата ви музика','en sevdiğiniz müzik','a sua música favorita'];
let ActivityChoice = Math.floor(Math.random() * activitynameslist.length);
let activity = activitynameslist[ActivityChoice];

// Do not add any more status as then this snippet will not work just Change them and enjoy
let activitytypelist = [`LISTENING`];
let ActypeChoice = Math.floor(Math.random() * activitytypelist.length);
let activitytype = activitytypelist[ActypeChoice];

//Starting of status
let status = [`ONLINE`];
let statusChoice = Math.floor(Math.random() * status.length);
let statustype = status[statusChoice];

let result = await lib.discord.users['@0.1.1'].me.status.update({
  activity_name: `${activity}`,
  activity_type: `${activitytype}`,
  status: `${statustype}`,
});
