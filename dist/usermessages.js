"use strict";
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
const assert_1 = __importDefault(require("assert"));
const events_1 = require("events");
const net = __importStar(require("./net"));
/**
 * Handles user messages for a demo file.
 */
class UserMessages extends events_1.EventEmitter {
    listen(demo) {
        demo.on("svc_UserMessage", this._handleUserMessage.bind(this));
    }
    _handleUserMessage(msg) {
        const um = net.findUserMessageByType(msg.msgType);
        if (!um) {
            return;
        }
        if (this.listenerCount(um.name) || this.listenerCount("message")) {
            const msgInst = um.class.decode(msg.msgData);
            assert_1.default(msgInst, "unable to decode user message");
            this.emit(um.name, msgInst);
            this.emit("message", {
                name: um.name,
                msg: msgInst,
            });
        }
    }
}
exports.UserMessages = UserMessages;
//# sourceMappingURL=usermessages.js.map