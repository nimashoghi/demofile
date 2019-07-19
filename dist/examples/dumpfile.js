"use strict";
// tslint:disable:no-console
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file is an thorough example of how to log player kills,
// team scores, chat text and server cvar changes from a demo file.
const ansi_styles_1 = __importDefault(require("ansi-styles"));
const assert_1 = __importDefault(require("assert"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const demo = __importStar(require("../demo"));
const player_1 = require("../entities/player");
const colourReplacements = [
    { pattern: /\x01/g, ansi: ansi_styles_1.default.whiteBright.open },
    { pattern: /\x02/g, ansi: ansi_styles_1.default.red.open },
    { pattern: /\x03/g, ansi: ansi_styles_1.default.magenta.open },
    { pattern: /\x04/g, ansi: ansi_styles_1.default.greenBright.open },
    { pattern: /\x05/g, ansi: ansi_styles_1.default.green.open },
    { pattern: /\x06/g, ansi: ansi_styles_1.default.greenBright.open },
    { pattern: /\x07/g, ansi: ansi_styles_1.default.redBright.open },
    { pattern: /\x08/g, ansi: ansi_styles_1.default.gray.open },
    { pattern: /\x09/g, ansi: ansi_styles_1.default.yellowBright.open },
    { pattern: /\x0A/g, ansi: ansi_styles_1.default.white.open },
    { pattern: /\x0B/g, ansi: ansi_styles_1.default.blueBright.open },
    { pattern: /\x0C/g, ansi: ansi_styles_1.default.blue.open },
    { pattern: /\x0D/g, ansi: ansi_styles_1.default.magenta.open },
    { pattern: /\x0E/g, ansi: ansi_styles_1.default.magentaBright.open },
    { pattern: /\x0F/g, ansi: ansi_styles_1.default.red.open },
    { pattern: /\x10/g, ansi: ansi_styles_1.default.yellow.open },
];
const standardMessages = {
    Cstrike_Chat_All: "\x03%s\x01 : %s",
    Cstrike_Chat_AllDead: "*DEAD* \x03%s\x01 : %s",
    Game_connected: "%s connected.",
};
function teamNumberToAnsi(teamNum) {
    if (teamNum === 2 /* Terrorists */) {
        return ansi_styles_1.default.redBright.open;
    }
    if (teamNum === 3 /* CounterTerrorists */) {
        return ansi_styles_1.default.blueBright.open;
    }
    return ansi_styles_1.default.gray.open;
}
function parseDemoFile(path) {
    fs_1.default.readFile(path, (err, buffer) => {
        assert_1.default.ifError(err);
        const demoFile = new demo.DemoFile();
        function logTeamScores() {
            const teams = demoFile.teams;
            const terrorists = teams[2 /* Terrorists */];
            const cts = teams[3 /* CounterTerrorists */];
            console.log("\t%s: %s score %d\n\t%s: %s score %d", terrorists.teamName, terrorists.clanName, terrorists.score, cts.teamName, cts.clanName, cts.score);
        }
        function formatSayText(entityIndex, text) {
            text = "\x01" + text;
            // If we have an entity index set, colour 0x03 in that entity's team colour
            if (entityIndex > 0) {
                const ent = demoFile.entities.entities[entityIndex];
                if (ent instanceof player_1.Player) {
                    text = text.replace(/\x03/g, teamNumberToAnsi(ent.teamNumber));
                }
            }
            // Replace each colour code with its corresponding ANSI escape sequence
            for (const r of colourReplacements) {
                text = text.replace(r.pattern, ansi_styles_1.default.reset.open + r.ansi);
            }
            return text + ansi_styles_1.default.reset.open;
        }
        demoFile.on("start", () => {
            console.log("Demo header:", demoFile.header);
        });
        demoFile.on("end", e => {
            if (e.error) {
                console.error("Error during parsing:", e.error);
            }
            else {
                logTeamScores();
            }
            console.log("Finished.");
        });
        demoFile.conVars.on("change", e => {
            console.log("%s: %s -> %s", e.name, e.oldValue, e.value);
        });
        demoFile.gameEvents.on("player_death", e => {
            const victim = demoFile.entities.getByUserId(e.userid);
            const victimColour = teamNumberToAnsi(victim ? victim.teamNumber : 1 /* Spectator */);
            const victimName = victim ? victim.name : "unnamed";
            const attacker = demoFile.entities.getByUserId(e.attacker);
            const attackerColour = teamNumberToAnsi(attacker ? attacker.teamNumber : 1 /* Spectator */);
            const attackerName = attacker ? attacker.name : "unnamed";
            const headshotText = e.headshot ? " HS" : "";
            console.log(`${attackerColour}${attackerName}${ansi_styles_1.default.reset.open} [${e.weapon}${headshotText}] ${victimColour}${victimName}${ansi_styles_1.default.reset.open}`);
        });
        demoFile.userMessages.on("TextMsg", e => {
            const [msgText, ...params] = e.params
                .map(param => param[0] === "#"
                ? standardMessages[param.substring(1)] || param
                : param)
                .filter(s => s.length);
            const formatted = util_1.default.format(msgText, ...params);
            console.log(formatSayText(0, formatted));
        });
        demoFile.userMessages.on("SayText", e => {
            console.log(formatSayText(0, e.text));
        });
        demoFile.userMessages.on("SayText2", e => {
            const nonEmptyParams = e.params.filter(s => s.length);
            const msgText = standardMessages[e.msgName];
            const formatted = msgText
                ? util_1.default.format(msgText, ...nonEmptyParams)
                : `${e.msgName} ${nonEmptyParams.join(" ")}`;
            console.log(formatSayText(e.entIdx, formatted));
        });
        demoFile.gameEvents.on("round_end", e => {
            console.log("*** Round ended '%s' (reason: %s, tick: %d)", demoFile.gameRules.phase, e.reason, demoFile.currentTick);
            // We can't print the team scores here as they haven't been updated yet.
            // See round_officially_ended below.
        });
        demoFile.gameEvents.on("round_officially_ended", logTeamScores);
        demoFile.entities.on("create", e => {
            // We're only interested in player entities being created.
            if (!(e.entity instanceof player_1.Player)) {
                return;
            }
            console.log("%s (%s) joined the game", e.entity.name, e.entity.steamId);
        });
        demoFile.entities.on("beforeremove", e => {
            if (!(e.entity instanceof player_1.Player)) {
                return;
            }
            console.log("%s left the game", e.entity.name);
        });
        // Start parsing the buffer now that we've added our event listeners
        demoFile.parse(buffer);
    });
}
parseDemoFile(process.argv[2]);
//# sourceMappingURL=dumpfile.js.map