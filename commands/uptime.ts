import { CommandInteraction } from 'discord.js';

let startTime: number;

export const registerUptimeCommand = async (client: any) => {
    await client.application.commands.create({
        name: "uptime",
        description: "Get the bot's uptime",
    });
};

export const setStartTime = (start: number) => {
    startTime = start;
};

export const getUptimeString = (): string => {
    if (!startTime) {
        return "Bot start time is not set.";
    }

    const currentTime = Date.now();
    const uptime = currentTime - startTime;

    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export const handleUptimeInteraction = async (interaction: CommandInteraction) => {
    const uptimeString = getUptimeString();
    await interaction.reply(`Uptime: \`${uptimeString}\``);
};