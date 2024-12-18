import { Client, GatewayIntentBits, CommandInteraction } from 'discord.js';
import * as dotenv from 'dotenv';
import { registerPingCommand, handlePingInteraction } from './commands/ping';
import { registerUptimeCommand, handleUptimeInteraction, setStartTime } from './commands/uptime';

import { startHttpServer } from './botStatusWeb';
startHttpServer();

dotenv.config();
const token = process.env.DISCORD_TOKEN;

if (!token) {
    console.error('DISCORD_TOKEN is not set in the .env file!');
    process.exit(1);
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once('ready', async () => {
    console.log(`Bot is online! Logged in as ${client.user?.tag}`);

    await registerPingCommand(client);
    await registerUptimeCommand(client);

    setStartTime(Date.now());
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const commandInteraction = interaction as CommandInteraction;

    if (commandInteraction.commandName === 'ping') {
        await handlePingInteraction(commandInteraction);
    } else if (commandInteraction.commandName === 'uptime') {
        await handleUptimeInteraction(commandInteraction);
    }
});

client.login(token).catch((error) => {
    console.error('Failed to login:', error);
});