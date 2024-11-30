import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();
const token = process.env.DISCORD_TOKEN;

if (!token) {
    console.error('DISCORD_TOKEN is not set in the .env file!');
    process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user?.tag}`);
});

client.login(token).catch((error) => {
    console.error('Failed to login:', error);
});