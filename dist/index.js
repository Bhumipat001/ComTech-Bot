"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const ping_1 = require("./commands/ping");
const uptime_1 = require("./commands/uptime");
const Hello_World_1 = require("./Hello World");
(0, Hello_World_1.startHttpServer)();
dotenv.config();
const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('DISCORD_TOKEN is not set in the .env file!');
    process.exit(1);
}
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
client.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`Bot is online! Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
    yield (0, ping_1.registerPingCommand)(client);
    yield (0, uptime_1.registerUptimeCommand)(client);
    (0, uptime_1.setStartTime)(Date.now());
}));
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const commandInteraction = interaction;
    if (commandInteraction.commandName === 'ping') {
        yield (0, ping_1.handlePingInteraction)(commandInteraction);
    }
    else if (commandInteraction.commandName === 'uptime') {
        yield (0, uptime_1.handleUptimeInteraction)(commandInteraction);
    }
}));
client.login(token).catch((error) => {
    console.error('Failed to login:', error);
});
