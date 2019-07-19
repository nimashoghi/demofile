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
const _ = __importStar(require("lodash"));
class GameEvent {
    constructor(descriptor) {
        this.name = descriptor.name;
        this.id = descriptor.eventid;
        this.keyNames = descriptor.keys.map(key => key.name);
    }
    messageToObject(eventMsg) {
        assert_1.default(eventMsg.eventid === this.id);
        return _.zipObject(this.keyNames, eventMsg.keys.map(key => {
            return _.find(key, (value, name) => value !== null && name !== "type");
        }));
    }
}
exports.GameEvent = GameEvent;
//# sourceMappingURL=gameevent.js.map