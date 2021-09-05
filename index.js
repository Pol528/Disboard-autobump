const Discord = require('discord.js-selfbot');
const fs = require('fs');
const client = new Discord.Client();
const { Token, BumpChannelID } = require("./config.json")
let { LastBump, NextBump } = require("./time.json")

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms / 60);
    });
  } 
client.on('ready', () => {
    //BOT INIT
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: "github.com/Pol528/Disboard-autobump", type: "WATCHING" }, status: "IDLE" });
    const BumpChannel = client.channels.cache.get(BumpChannelID)
    //SEEING AT WHAT TIME WE NEED TO BUMP NEXT
    const time = new Date();
    var today = time.getHours() + ":" + time.getMinutes() + ":" +time.getSeconds()
    //IF SERVER HAS NEVER BEEN BUMPED BEFORE
    if(LastBump === ""){
        BumpChannel.send("!d bump")
        let NextBump = (`${time.getHours()+2}:${time.getMinutes() + 2}:${time.getSeconds()}`)
        let DataForJson = {
            "LastBump": today,
            "NextBump": NextBump
        }
        const JsonData = JSON.stringify(DataForJson)
        fs.writeFileSync("./time.json", JsonData)
    }
    //IF IT NEEDS TO BE BUMPED NOW
    else if(NextBump <= today){
        BumpChannel.send("!d bump")
        let NextBump = (`${time.getHours()+2}:${time.getMinutes() + 2}:${time.getSeconds()}`)
        let DataForJson = {
            "LastBump": today,
            "NextBump": NextBump
        }
        const JsonData = JSON.stringify(DataForJson)
        fs.writeFileSync("./time.json", JsonData)
    }
    //IF WE STILL NEED TO WAIT BEFORE BUMPING
    else if(NextBump > today){
    }
    var timetillbump = "";
    //NOW CREATING A FUNCTION THAT KEEPS LOOPING
    async function loop() {
        const time = new Date();
        let today = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
        let { LastBump, NextBump } = require("./time.json")
        //SEEING IF WE NEED TO BUMP
        if(NextBump <= today){
            BumpChannel.send("!d bump")
            let NextBump = (`${time.getHours()+2}:${time.getMinutes() + 2}:${time.getSeconds()}`)
            let DataForJson = {
                "LastBump": today,
                "NextBump": NextBump
            }
            const JsonData = JSON.stringify(DataForJson)
            fs.writeFileSync("./time.json", JsonData)
            timetillbump = 122 * 60
        }
        else{
            //HERE WE SEE HOW MUCH TIME WE NEED TO WAIT UNTILL WE CAN BUMP AGAIN
            //NextBump TO SECONDS
            var p = NextBump.split(':'),
                    s = 0, m = 1;
            
                while (p.length > 0) {
                    s += m * parseInt(p.pop(), 10);
                    m *= 60;
                }
            let nextbump_s = s
            //today TO SECONDS
            var p = today.split(':'),
                    s = 0, m = 1;
            
                while (p.length > 0) {
                    s += m * parseInt(p.pop(), 10);
                    m *= 60;
                }
            let today_s = s
            timetillbump = nextbump_s - today_s
        } 
    }
    loop()
    setInterval(loop, timetillbump * 1000)
  });
  
  client.login(Token);