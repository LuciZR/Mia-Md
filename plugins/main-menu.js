import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

  
   let groupmenu = `
   ✦ ───『 *group* 』─── ⚝
  ◈ .getbio <@tag/reply>  Ⓛ
  ◈ .animequote
  ◈ .Setdesc <text>
  ◈ .setname <text>
  ◈ .add
  ◈ .delete
  ◈ .delwarn @user
  ◈ .demote (@tag)
  ◈ .infogp
  ◈ .hidetag
  ◈ .invite <917xxx>
  ◈ .kick @user
  ◈ .link
  ◈ .poll question|option|option
  ◈ .profile
  ◈ .promote
  ◈ .resetlink
  ◈ .setbye <text>
  ◈ .group *open/close*
  ◈ .setwelcome <text>
  ◈ .simulate <event> @user
  ◈ .staff
  ◈ .tagall
  ◈ .totag
  ◈ .warn @user
  ◈ .warns
  ◈ .main
  ╰──────────⳹`
  
  let ownermenu = `
  ✦ ───『 *owner* 』─── ⚝
  ◈ .addprem <@tag>
  ◈ .addowner @user
  ◈ .allow <@tag>
  ◈ .HEROKU
  ◈ .ban @user
  ◈ .banchat
  ◈ .tx
  ◈ .broadcastgroup <text>
  ◈ .bcgc <text>
  ◈ .cleartmp
  ◈ .delexpired
  ◈ .delprem @user
  ◈ .removeowner @user
  ◈ .setppbotfull
  ◈ .getplugin <name file>
  ◈ .getfile <name file>
  ◈ .join <chat.whatsapp.com> <dias>
  ◈ .reset <54xxx>
  ◈ .resetprefix
  ◈ .restart
  ◈ ..setprefix
  ◈ ..setprefix [symbol]
  ◈ .unban @user
  ◈ .unbanchat
  ◈ .update
  ◈ .config
  ◈ .listban
  ◈ .deleteplugin <name>
  ╰──────────⳹`
  
  let funmenu = `
  ✦ ───『 *fun* 』─── ⚝
  ◈ .afk <reason>
  ◈ .tomp3
  ◈ .toav
  ◈ .bot
  ◈ .character @tag
  ◈ .dare
  ◈ .flirt
  ◈ .gay @user
  ◈ .pickupline
  ◈ .question
  ◈ .shayari
  ◈ .ship
  ◈ .yomamajoke
  ◈ .truth
  ◈ .waste @user
  ◈ .image
  ◈ .meme
  ◈ .quote
  ╰──────────⳹`
  
  let reactmenu = `
  ✦ ───『 *reaction* 』─── ⚝
  ◈ .bully @tag
  ◈ .cuddle @tag
  ◈ .cry @tag
  ◈ .hug @tag
  ◈ .awoo @tag
  ◈ .kiss @tag
  ◈ .lick @tag
  ◈ .pat @tag
  ◈ .smug @tag
  ◈ .bonk @tag
  ◈ .yeet @tag
  ◈ .blush @tag
  ◈ .smile @tag
  ◈ .wave @tag
  ◈ .highfive @tag
  ◈ .handhold @tag
  ◈ .nom @tag
  ◈ .bite @tag
  ◈ .glomp @tag
  ◈ .slap @tag
  ◈ .kill @tag
  ◈ .happy @tag
  ◈ .wink @tag
  ◈ .poke @tag
  ◈ .dance @tag
  ◈ .cringe @tag
  ╰──────────⳹`
  
  let dlmenu = `
  ✦ ───『 *downloader* 』─── ⚝
  ◈ .facebook <url>
  ◈ .gdrive 🅟
  ◈ .gitclone <url>
  ◈ .igstalk
  ◈ .instagram
  ◈ .mediafire <url>
  ◈ .mega
  ◈ .modapk
  ◈ .play <query>
  ◈ .play2 <text>
  ◈ .playvid <text>
  ◈ .spotify
  ◈ .tiktok <url>
  ◈ .tiktokstalk
  ◈ .twitter <url>
  ◈ .ytmp3 <url>
  ◈ .ytsearch
  ◈ .ytmp4 <yt-link>
  ◈ .wallpaper <query>
  ╰──────────⳹`
  
  let gamemenu = `
  ✦ ───『 *game* 』─── ⚝
  ◈ .slot <amount>
  ◈ .chess [from to]
  ◈ .chess delete
  ◈ .chess join
  ◈ .chess start
  ◈ .delttt
  ◈ .guessflag
  ◈ .Maths <modes>
  ◈ .ppt <rock/paper/scissors>
  ◈ .tictactoe <tag number>
  ╰──────────⳹`
  let logomenu = `
  ✦ ───『 *maker* 』─── ⚝
  ◈ .blur
  ◈ .difuminar2
  ◈ .hornycard
  ◈ .hornylicense
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ◈ .simpcard
  ◈ .itssostupid
  ◈ .iss
  ◈ .stupid
  ◈ .tweet <comment>
  ◈ .lolicon
  ◈ .ytcomment <comment>
  ╰──────────⳹`
  
  let stickermenu = `
  ✦ ───『 *sticker* 』─── ⚝
  ◈ .emojimix <emoji+emoji>
  ◈ .getsticker
  ◈ .smaker
  ◈ .stickerwithmeme (caption|reply media)
  ◈ .swmeme <url>
  ◈ .swm(caption|reply media)
  ◈ .sfull
  ◈ .toimg <sticker>
  ◈ .tovid
  ◈ .trigger <@user>
  ◈ .ttp
  ◈ .ttp2
  ◈ .ttp3
  ◈ .ttp4
  ◈ .ttp5
  ◈ .attp
  ◈ .attp2
  ◈ .attp3
  ◈ .take <name>|<author>
  ╰──────────⳹`
  
  let audiomenu = `
  ✦ ───『 *audio* 』─── ⚝
  ◈ .bass [vn]
  ◈ .blown [vn]
  ◈ .deep [vn]
  ◈ .earrape [vn]
  ◈ .fast [vn]
  ◈ .fat [vn]
  ◈ .nightcore [vn]
  ◈ .reverse [vn]
  ◈ .robot [vn]
  ◈ .slow [vn]
  ◈ .smooth [vn]
  ◈ .tupai [vn]
  ╰──────────⳹`
  
  
  let newsmenu = `
  ✦ ───『 *news* 』─── ⚝
  ◈ .news
  ◈ .technews
  ◈ .ndtv
  ╰──────────⳹
  `
  let economy = `
  ✦ ───『 *economy* 』─── ⚝
  ◈ .addgold <@user>
  ◈ .addxp <@user>
  ◈ .bank
  ◈ .buych
  ◈ .cock-fight <amount>
  ◈ .buy
  ◈ .buyall
  ◈ .daily
  ◈ .deposit
  ◈ .gamble <amount> <color(red/black)>
  ◈ .give credit [amount] [@tag]
  ◈ .levelup
  ◈ .rank
  ◈ .rob
  ◈ .roulette <amount> <color(red/black)>
  ◈ .wallet
  ◈ .withdraw
  ◈ .work
  ╰──────────⳹`
  let animemenu = `
  ✦ ───『 *anime* 』─── ⚝
  ◈ .anime
  ◈ .akira
  ◈ .akiyama
  ◈ .anna
  ◈ .asuna
  ◈ .ayuzawa
  ◈ .boruto
  ◈ .chiho
  ◈ .chitoge
  ◈ .deidara
  ◈ .erza
  ◈ .elaina
  ◈ .eba
  ◈ .emilia
  ◈ .hestia
  ◈ .hinata
  ◈ .inori
  ◈ .isuzu
  ◈ .itachi
  ◈ .itori
  ◈ .kaga
  ◈ .kagura
  ◈ .kaori
  ◈ .keneki
  ◈ .kotori
  ◈ .kurumi
  ◈ .madara
  ◈ .mikasa
  ◈ .miku
  ◈ .minato
  ◈ .naruto
  ◈ .nezuko
  ◈ .sagiri
  ◈ .sasuke
  ◈ .sakura
  ◈ .manhwa
  ◈ .waifu
  ◈ .neko
  ◈ .zerotwo
  ◈ .loli
  ◈ .pokedex <pokemon>
  ◈ .trace
  ╰──────────⳹
  `
  let nsfwmenu = `
  ✦ ───『 *nsfw* 』─── ⚝
  ◈ .genshin
  ◈ .swimsuit
  ◈ .schoolswimsuit
  ◈ .white
  ◈ .barefoot
  ◈ .touhou
  ◈ .gamecg
  ◈ .hololive
  ◈ .uncensored
  ◈ .sunglasses
  ◈ .glasses
  ◈ .weapon
  ◈ .shirtlift
  ◈ .chain
  ◈ .fingering
  ◈ .flatchest
  ◈ .torncloth
  ◈ .bondage
  ◈ .demon
  ◈ .wet
  ◈ .pantypull
  ◈ .headdress
  ◈ .headphone
  ◈ .tie
  ◈ .anusview
  ◈ .shorts
  ◈ .stokings
  ◈ .topless
  ◈ .beach
  ◈ .bunnygirl
  ◈ .bunnyear
  ◈ .idol
  ◈ .vampire
  ◈ .gun
  ◈ .maid
  ◈ .bra
  ◈ .nobra
  ◈ .bikini
  ◈ .whitehair
  ◈ .blonde
  ◈ .pinkhair
  ◈ .bed
  ◈ .ponytail
  ◈ .nude
  ◈ .dress
  ◈ .underwear
  ◈ .foxgirl
  ◈ .uniform
  ◈ .skirt
  ◈ .sex
  ◈ .sex2
  ◈ .sex3
  ◈ .breast
  ◈ .twintail
  ◈ .spreadpussy
  ◈ .tears
  ◈ .seethrough
  ◈ .breasthold
  ◈ .drunk
  ◈ .fateseries
  ◈ .spreadlegs
  ◈ .openshirt
  ◈ .headband
  ◈ .food
  ◈ .close
  ◈ .tree
  ◈ .nipples
  ◈ .erectnipples
  ◈ .horns
  ◈ .greenhair
  ◈ .wolfgirl
  ◈ .catgirl
  ◈ .nsfw
  ◈ .ass
  ◈ .boobs
  ◈ .lesbian
  ◈ .pussy
  ◈ .pack
  ◈ .xvid
  ◈ .xnxx
  ╰──────────⳹`

    let toolsmenu = `
╭───❮ *𝑻𝑶𝑶𝑳𝑺* ❯
│  𝑵𝑶𝑾𝑨
│  𝑸𝑹 <𝑻𝑬𝑿𝑻>
│  𝑸𝑹𝑪𝑶𝑫𝑬 <𝑻𝑬𝑿𝑻>
│  𝑺𝑻𝒀𝑳𝑬 <𝑲𝒀𝑬>/<𝑻𝑬𝑿𝑻>
│  𝑾𝑬𝑨𝑻𝑯𝑬𝑹 *<𝑷𝑳𝑨𝑪𝑬>*
│  𝑫𝑬𝑯𝑨𝒁𝑨
│  𝑹𝑬𝑪𝑶𝑳𝑶𝑹
│  𝑯𝑫𝑹☢
│  𝑳𝑬𝑵𝑮𝑻𝑯 <𝑨𝑴𝑶𝑼𝑵𝑻>
│  𝑻𝑰𝑵𝑮𝑼𝑹𝑲 <𝑼𝑹𝑳>
│  𝑺𝑯𝑶𝑹𝑻𝑬𝑵 <𝑼𝑹𝑳>
│  𝑻𝑬𝑴𝑷𝑴𝑨𝑰𝑳
│  𝑺𝑯𝑨𝒁𝑨𝑴
│  𝑪𝑨𝑳 <𝑬𝑸𝑼𝑨𝑻𝑰𝑶𝑵>
│  𝑪𝑨𝑹𝑩𝑶𝑵 <𝑪𝑶𝑫𝑬>
│  𝑫𝑬𝑭𝑰𝑵𝑬 <𝑾𝑶𝑹𝑫>
│  𝑬𝑳𝑬𝑴𝑬𝑵𝑻
│  𝑮𝑶𝑶𝑮𝑳𝑬
│  𝑰𝑻𝑼𝑵𝑬𝑺
│  𝑳𝒀𝑹𝑰𝑪𝑺
│  𝑰𝑴𝑫𝑩
│  𝑪𝑶𝑼𝑹𝑺𝑬
│  𝑹𝑨𝑵𝑫𝑶𝑴𝑪𝑶𝑼𝑹𝑺𝑬
│  𝑹𝑬𝑨𝑫𝑴𝑶𝑹𝑬 <𝑻𝑬𝑿𝑻1>/<𝑻𝑬𝑿𝑻2>
│  𝑹𝑬𝑨𝑫𝑽𝑶
│  𝑹𝑬𝑴𝑶𝑽𝑬𝑩𝑮
│  𝑺𝑺 <𝑼𝑹𝑳>
│  𝑺𝑺𝑭 <𝑼𝑹𝑳>
│  𝑺𝑼𝑩𝑹𝑬𝑫𝑫𝑰𝑻
│  𝑻𝑬𝑳𝑬𝑺𝑻𝑰𝑪𝑲𝑬𝑹
│  𝑻𝑶𝑼𝑹𝑳
│  𝑻𝑹𝑨𝑵𝑺𝑳𝑨𝑻𝑬 <𝑳𝑨𝑵𝑮> <𝑻𝑬𝑿𝑻>
│  𝑻𝑹𝑼𝑬
│  𝑻𝑻𝑺 <𝑳𝑨𝑵𝑮> <𝑻𝑨𝑺𝑲>
│  𝑾𝑨
│  𝑾𝑰𝑲𝑰𝑷𝑬𝑫𝑰𝑨
╰─────────────⦁⳹`
  
  let Aimenu = `
╭───❮ *𝑨𝑰* ❯
│  𝑩𝑰𝑵𝑮
│  𝑫𝑨𝑳𝑳𝑬
│  𝑪𝑯𝑨𝑻𝑮𝑷𝑻
│  𝑻𝑶𝑨𝑵𝑰𝑴𝑬
│  𝑮𝑰𝑻𝑨𝑮𝑷𝑻
│  𝑻𝑶𝑪𝑨𝑹𝑻𝑶𝑶𝑵
│  𝑨𝑰
│  𝑩𝑨𝑹𝑫
│  𝑨𝑳𝑬𝑿𝑨
│  𝑩𝑰𝑵𝑮𝑰𝑴𝑮
│  𝑮𝑬𝑴𝑰𝑵𝑰
╰─────────────⦁⳹
  `
  let religionmenu = `
╭───❮ *𝑩𝑶𝑻 𝑴𝑬𝑵𝑼* ❯
│  𝐺𝑰𝑻𝑨🏰 [𝑉𝐸𝑅𝑆𝐸_𝑁𝑈𝑀𝐵𝐸𝑅]
│  𝑸𝑼𝑹𝑨𝑵 🕋[𝑆𝑈𝑅𝐴𝐻_𝑁𝑈𝑀𝐵𝐸𝑅/𝑆𝑈𝑅𝐴𝐻_𝑁𝐴𝑀𝐸]
╰─────────────⦁⳹`
  
  let botmenu = `
╭───❮ *𝑩𝑶𝑻 𝑴𝑬𝑵𝑼* ❯
│  𝑷𝑰𝑵𝑮
│  𝑹𝑼𝑵𝑻𝑰𝑴𝑬
│  𝑺𝑪𝑹𝑰𝑷𝑻
│  𝑺𝑬𝑹𝑽𝑬𝑹
│  𝑩𝑳𝑶𝑪𝑲𝑳𝑰𝑺𝑻
│  𝑨𝑳𝑰𝑽𝑬
│  𝑰𝑵𝑭𝑶
│  𝑶𝑾𝑵𝑬𝑹
│  𝑻𝑶𝑻𝑨𝑳 𝑭𝑬𝑨𝑻𝑼𝑹𝑬
│  𝑳𝑰𝑺𝑻
│  𝑴𝑬𝑺𝑺𝑰
│  𝑪𝑹𝑰𝑺𝑻𝑰𝑨𝑵𝑶𝑹𝑶𝑵𝑨𝑳𝑫𝑶
│  *𝑪𝑹7*
│  𝑷𝑷𝑪𝑶𝑼𝑷𝑳𝑬
│  𝑷𝑷𝑪𝑷
│  𝑷𝑰𝑵𝑻𝑬𝑹𝑬𝑺𝑻
│  𝑹𝑬𝑮 <𝒏𝒂m𝒆.𝒂𝒈𝒆>
│  𝑴𝒀𝑺𝑵
│  𝑼𝑵𝑹𝑬𝑮
╰─────────────⦁⳹
  `
  let pluginmenu = `
╭───❮ *𝑷𝑳𝑼𝑮𝑰𝑵* ❯
│  𝑷𝑳𝑼𝑮𝑰𝑵𝑺
│  𝑰𝑵𝑺𝑻𝑨𝑳𝑳 <𝑮𝒊𝒕𝒔 𝑼𝑹𝑳>
╰─────────────⦁⳹
  `

  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
  
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `
    ${botname} あ⁩ 」\n
    Hii ${name} 𝑩𝑬𝑩𝒀 🤭
    
    *${ucpn}* 
   
╭───❮ *𝕌 𝕊 𝔼 ℝ* ❯
│  *𝑵𝑨𝑴𝑬* ${name}
│  *𝑮𝑶𝑳𝑫* ${credit}
│  *𝑹𝑶𝑳𝑬* ${role}
│  *𝑳𝑬𝑽𝑬𝑳* ${level}
│  *𝑿𝑷:* ${exp}
╰─────────────⦁⳹
   
╭───❮ *𝕀 ℕ 𝔽 𝕆* ❯
│  *𝑩𝑶𝑻 𝑵𝑨𝑴𝑬* ${botname}
│  *𝑴𝑶𝑫𝑬* ${mode}
│  *𝑷𝑹𝑬𝑭𝑰𝑿* [ ${usedPrefix} ]
│  *𝑼𝑷𝑻𝑰𝑴𝑬* ${muptime}
│  *𝑫𝑨𝑻𝑨𝑩𝑨𝑺𝑬* ${totalreg}
╰─────────────⦁⳹

╭───❮ *𝕀 ℕ 𝔽 𝕆 ☢ ℂ 𝕄 𝔻* ❯
│  *${totalfeatures}* 𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑺
╰─────────────⦁⳹
     ${readMore}

╭───❮ *ℕ𝕆𝕋𝕀ℂ𝔼* ❯
│  *𝑹𝒆𝒑𝒍𝒚 𝒘𝒊𝒕𝒉 𝒕𝒉𝒆 𝒏𝒖𝒎𝒃𝒆𝒓*
│  *𝒕𝑜 𝒈𝒆𝒕 𝒓𝒆𝒔𝒑𝒆𝒄𝒕𝒆𝒅 𝑴𝒆𝒏𝒖*
╰─────────────⦁⳹
╭──────➪
│  *1.* 𝑩𝑶𝑻 𝑴𝑬𝑵𝑼
│  *2.* 𝑶𝑾𝑵𝑬𝑹 𝑴𝑬𝑵𝑼
│  *3.* 𝑮𝑹𝑶𝑼𝑷 𝑴𝑬𝑵𝑼
│  *4.* 𝑭𝑼𝑵 𝑴𝑬𝑵𝑼
│  *5.* 𝑹𝑬𝑨𝑪𝑻𝑰𝑶𝑵 𝑴𝑬𝑵𝑼
│  *6.* 𝑫𝑶𝑾𝑵𝑳𝑶𝑫𝑬𝑹 𝑴𝑬𝑵𝑼
│  *7.* 𝑮𝑨𝑴𝑬 𝑴𝑬𝑵𝑼
│  *8.* 𝑳𝑶𝑮𝑶 𝑴𝑬𝑵𝑼
│  *9.* 𝑺𝑻𝑰𝑪𝑲𝑬𝑹 𝑴𝑬𝑵𝑼
│  *10.* 𝑨𝑼𝑫𝑰𝑶 𝑴𝑬𝑵𝑼
│  *11.* 𝑵𝑬𝑾𝑺 𝑴𝑬𝑵𝑼
│  *12.* 𝑬𝑪𝑶𝑵𝑶𝑴𝒀 𝑴𝑬𝑵𝑼
│  *13.* 𝑨𝑵𝑰𝑴𝑬 𝑴𝑬𝑵𝑼
│  *14.* 𝑵𝑺𝑭𝑾 𝑴𝑬𝑵𝑼
│  *15.* 𝑻𝑶𝑶𝑳𝑺 𝑴𝑬𝑵𝑼
│  *16.* 𝑨𝑰 𝑴𝑬𝑵𝑼
│  *17.* 𝑹𝑬𝑳𝑰𝑮𝑰𝑶𝑵 𝑴𝑬𝑵𝑼
│  *18.* 𝑷𝑳𝑼𝑮𝑰𝑵 𝑴𝑬𝑵𝑼
╰─────────────⦁⳹
 ${readMore}` 
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: fcontact })
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 150 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: botmenu
      }, { quoted:fcontact });
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: ownermenu
      }, { quoted:fcontact });
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: funmenu
      }, { quoted:fcontact });
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: reactmenu
      }, { quoted:fcontact });
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: dlmenu
      }, { quoted:fcontact });
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: logomenu
      }, { quoted:fcontact });
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: stickermenu
      }, { quoted:fcontact });
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: audiomenu
      }, { quoted:fcontact });
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: newsmenu
      }, { quoted:fcontact });
      } else if (choice === "12") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: economy
      }, { quoted:fcontact });
      } else if (choice === "13") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: animemenu
      }, { quoted:fcontact });
      } else if (choice === "14") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: nsfwmenu
      }, { quoted:fcontact });
      } else if (choice === "15") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: toolsmenu
      }, { quoted:fcontact });
      } else if (choice === "16") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: Aimenu
      }, { quoted:fcontact });
      } else if (choice === "17") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: religionmenu
      }, { quoted:fcontact });
      } else if (choice === "18") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: pluginmenu
      }, { quoted:fcontact });
      } else {
        m.reply('Invalid choice. Please reply with a valid number.');
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["downloader"];
  handler.command = ['menu', 'mia', 'luci'];
  handler.limit = true;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Kolkata").format("HH")
    let res = "Good morning ☀️"
    if (time >= 4) {
     res = "Good Morning 🌄"
    }
    if (time >= 10) {
     res = "Good Afternoon ☀️"
    }
    if (time >= 15) {
     res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
     res = "Good Night 🌙"
    }
    return res
   }
  
