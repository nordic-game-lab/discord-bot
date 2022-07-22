module.exports.run = (client, message, args) => {
  if(message.member.roles.cache.some(role => role.name === 'Mod')){
    const member = message.mentions.users.first();
    
  if(member){
    const memberTarget = message.guild.members.cache.get(member.id)
    memberTarget.ban();
    message.channel.send("User was banned");
  }else{
    message.channel.send("User does not exisist or no user specified")
  }
  }else{
    message.channel.send("You do not have the right role")
  }
  
}

module.exports.name = "ban"