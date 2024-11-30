"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUptimeInteraction = exports.setStartTime = exports.registerUptimeCommand = void 0;
let startTime;
const registerUptimeCommand = (client) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.application.commands.create({
        name: "uptime",
        description: "Get the bot's uptime",
    });
});
exports.registerUptimeCommand = registerUptimeCommand;
const setStartTime = (start) => {
    startTime = start;
};
exports.setStartTime = setStartTime;
const handleUptimeInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = Date.now();
    const uptime = currentTime - startTime;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    yield interaction.reply(`Uptime: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``);
});
exports.handleUptimeInteraction = handleUptimeInteraction;
