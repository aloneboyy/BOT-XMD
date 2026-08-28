const { cmd, commands } = require("../arslan");
const moment = require("moment-timezone");
const { fakevCard } = require('../lib/fakevCard');

cmd({
    pattern: "menu",
    alias: ["commandlist", "allmenu", "help"],
    desc: "Fetch and display all available bot commands",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        let totalCommands = 0;
        let grouped = {};

        // Group commands by category
        for (const cmd of commands) {
            if (!cmd.pattern || !cmd.category) continue;

            totalCommands++;
            if (!grouped[cmd.category]) grouped[cmd.category] = [];
            grouped[cmd.category].push(cmd.pattern);
        }

        const time = moment().tz("Africa/Kampala").format("HH:mm:ss");
        const date = moment().tz("Africa/Kampala").format("dddd, MMMM Do YYYY");

        let caption = `╭┄┄『\`KAIRO-XMD\`』\n`;
        caption += `│✦ Total Commands : *${totalCommands}*\n`;
        caption += `│✦ Time           : ${time}\n`;
        caption += `│✦ Date           : ${date}\n`;
        caption += `│✦ Platform       : kairodev.xo.je\n`;

        for (const cat in grouped) {
            caption += `│\n`;
            caption += `│✦ *${cat.toUpperCase()}*\n`;
            for (const c of grouped[cat]) {
                caption += `│  ▸ ${c}\n`;
            }
        }

        caption += `╰┄┄┄┄┄┄┄┄┄┄┄┄⪼`;

        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/x7kou9.png" },
            caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [m.sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363413253579833@newsletter",
                    newsletterName: "KAIRO DEV BOT²",
                    serverMessageId: 2,
                },
            },
        }, { quoted: fakevCard });

    } catch (err) {
        console.error("AllMenu Error:", err);
        reply("❌ Error while generating menu.");
    }
});
