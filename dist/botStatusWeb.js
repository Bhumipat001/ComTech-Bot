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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHttpServer = startHttpServer;
const http = __importStar(require("http"));
const uptime_1 = require("./commands/uptime");
function startHttpServer() {
    const server = http.createServer((req, res) => {
        if (req.url === "/events") {
            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            });
            const sendUptime = () => {
                const uptimeString = (0, uptime_1.getUptimeString)();
                res.write(`data: Uptime: ${uptimeString}\n\n`);
            };
            sendUptime();
            const intervalId = setInterval(sendUptime, 1000);
            req.on("close", () => {
                clearInterval(intervalId);
                res.end();
            });
        }
        else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>ComTech Bot Status</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #2c2f38;
                            color: #eaeaea;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            flex-direction: column;
                            text-align: center;
                        }

                        h1 {
                            color: #9b59b6; /* Dark purple */
                            font-size: 3rem;
                            margin-bottom: 20px;
                        }

                        .status-container {
                            background-color: #1a1c23;
                            padding: 20px 40px;
                            border-radius: 10px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                            display: inline-block;
                        }

                        .status-text {
                            font-size: 1.5rem;
                            color: #fff;
                            font-weight: 400;
                        }

                        .uptime {
                            font-size: 1.2rem;
                            color: #f39c12; /* Yellowish for uptime */
                            font-weight: 500;
                        }

                        /* Styling for loading state */
                        .loading {
                            font-size: 1.5rem;
                            color: #ccc;
                        }

                        .footer {
                            margin-top: 20px;
                            font-size: 1rem;
                            color: #aaa;
                        }
                    </style>
                </head>
                <body>
                    <h1>ComTech Bot Status</h1>
                    <div class="status-container">
                        <div id="uptime" class="status-text loading">Loading...</div>
                    </div>
                    <div class="footer">
                        © 2024 ComTechClub. All rights reserved.<br>
                        KASETSART UNIVERSITY LABORATORY SCHOOL
                    </div>

                    <script>
                        const uptimeDiv = document.getElementById('uptime');
                        const eventSource = new EventSource('/events');

                        eventSource.onmessage = (event) => {
                            uptimeDiv.textContent = event.data;
                        };

                        eventSource.onerror = () => {
                            uptimeDiv.textContent = "Connection lost. Refresh to reconnect.";
                        };
                    </script>
                </body>
                </html>
            `);
            res.end();
        }
    });
    server.listen(8080, () => {
        console.log("HTTP server running on port 8080");
    });
}
