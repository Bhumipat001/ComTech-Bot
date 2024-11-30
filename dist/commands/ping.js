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
exports.registerPingCommand = registerPingCommand;
exports.handlePingInteraction = handlePingInteraction;
const builders_1 = require("@discordjs/builders");
function registerPingCommand(client) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield ((_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.create(new builders_1.SlashCommandBuilder().setName('ping').setDescription('Get the bot\'s API latency').toJSON()));
    });
}
function handlePingInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.commandName === 'ping') {
            const now = Date.now();
            const createdTimestamp = interaction.createdTimestamp;
            const ping = Math.abs(now - createdTimestamp);
            yield interaction.reply(`API Latency: ${ping} ms`);
        }
    });
}
