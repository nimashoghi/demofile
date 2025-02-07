import assert from "assert"
import {EventEmitter} from "events"
import {DemoFile} from "./demo"
import * as net from "./net"
import {UserMessageName} from "./net"
import {
    ICCSUsrMsg_AchievementEvent,
    ICCSUsrMsg_AdjustMoney,
    ICCSUsrMsg_AmmoDenied,
    ICCSUsrMsg_BarTime,
    ICCSUsrMsg_CallVoteFailed,
    ICCSUsrMsg_ClientInfo,
    ICCSUsrMsg_CloseCaption,
    ICCSUsrMsg_CloseCaptionDirect,
    ICCSUsrMsg_CurrentTimescale,
    ICCSUsrMsg_Damage,
    ICCSUsrMsg_DesiredTimescale,
    ICCSUsrMsg_DisconnectToLobby,
    ICCSUsrMsg_DisplayInventory,
    ICCSUsrMsg_Fade,
    ICCSUsrMsg_GameTitle,
    ICCSUsrMsg_Geiger,
    ICCSUsrMsg_GlowPropTurnOff,
    ICCSUsrMsg_HintText,
    ICCSUsrMsg_HudMsg,
    ICCSUsrMsg_HudText,
    ICCSUsrMsg_ItemDrop,
    ICCSUsrMsg_ItemPickup,
    ICCSUsrMsg_KeyHintText,
    ICCSUsrMsg_KillCam,
    ICCSUsrMsg_MarkAchievement,
    ICCSUsrMsg_MatchEndConditions,
    ICCSUsrMsg_MatchStatsUpdate,
    ICCSUsrMsg_PlayerStatsUpdate,
    ICCSUsrMsg_ProcessSpottedEntityUpdate,
    ICCSUsrMsg_QuestProgress,
    ICCSUsrMsg_RadioText,
    ICCSUsrMsg_RawAudio,
    ICCSUsrMsg_ReloadEffect,
    ICCSUsrMsg_ReportHit,
    ICCSUsrMsg_RequestState,
    ICCSUsrMsg_ResetHud,
    ICCSUsrMsg_RoundBackupFilenames,
    ICCSUsrMsg_Rumble,
    ICCSUsrMsg_SayText,
    ICCSUsrMsg_SayText2,
    ICCSUsrMsg_SendAudio,
    ICCSUsrMsg_SendLastKillerDamageToClient,
    ICCSUsrMsg_SendPlayerItemDrops,
    ICCSUsrMsg_SendPlayerItemFound,
    ICCSUsrMsg_ServerRankRevealAll,
    ICCSUsrMsg_ServerRankUpdate,
    ICCSUsrMsg_Shake,
    ICCSUsrMsg_ShowMenu,
    ICCSUsrMsg_StopSpectatorMode,
    ICCSUsrMsg_TextMsg,
    ICCSUsrMsg_Train,
    ICCSUsrMsg_VGUIMenu,
    ICCSUsrMsg_VoiceMask,
    ICCSUsrMsg_VoteFailed,
    ICCSUsrMsg_VotePass,
    ICCSUsrMsg_VoteSetup,
    ICCSUsrMsg_VoteStart,
    ICCSUsrMsg_WarmupHasEnded,
    ICCSUsrMsg_XpUpdate,
    ICCSUsrMsg_XRankGet,
    ICCSUsrMsg_XRankUpd,
} from "./protobufs/cstrike15_usermessages"
import {ICSVCMsg_UserMessage} from "./protobufs/netmessages"

interface IUserMessageEvent {
    name: string
    msg: any
}

export interface UserMessagesEventsMap {
    message: IUserMessageEvent
    VGUIMenu: RequiredNonNullable<ICCSUsrMsg_VGUIMenu>
    Geiger: RequiredNonNullable<ICCSUsrMsg_Geiger>
    Train: RequiredNonNullable<ICCSUsrMsg_Train>
    HudText: RequiredNonNullable<ICCSUsrMsg_HudText>
    SayText: RequiredNonNullable<ICCSUsrMsg_SayText>
    SayText2: RequiredNonNullable<ICCSUsrMsg_SayText2>
    TextMsg: RequiredNonNullable<ICCSUsrMsg_TextMsg>
    HudMsg: RequiredNonNullable<ICCSUsrMsg_HudMsg>
    ResetHud: RequiredNonNullable<ICCSUsrMsg_ResetHud>
    GameTitle: RequiredNonNullable<ICCSUsrMsg_GameTitle>
    Shake: RequiredNonNullable<ICCSUsrMsg_Shake>
    Fade: RequiredNonNullable<ICCSUsrMsg_Fade>
    Rumble: RequiredNonNullable<ICCSUsrMsg_Rumble>
    CloseCaption: RequiredNonNullable<ICCSUsrMsg_CloseCaption>
    CloseCaptionDirect: RequiredNonNullable<ICCSUsrMsg_CloseCaptionDirect>
    SendAudio: RequiredNonNullable<ICCSUsrMsg_SendAudio>
    RawAudio: RequiredNonNullable<ICCSUsrMsg_RawAudio>
    VoiceMask: RequiredNonNullable<ICCSUsrMsg_VoiceMask>
    RequestState: RequiredNonNullable<ICCSUsrMsg_RequestState>
    Damage: RequiredNonNullable<ICCSUsrMsg_Damage>
    RadioText: RequiredNonNullable<ICCSUsrMsg_RadioText>
    HintText: RequiredNonNullable<ICCSUsrMsg_HintText>
    KeyHintText: RequiredNonNullable<ICCSUsrMsg_KeyHintText>
    ProcessSpottedEntityUpdate: RequiredNonNullable<
        ICCSUsrMsg_ProcessSpottedEntityUpdate
    >
    ReloadEffect: RequiredNonNullable<ICCSUsrMsg_ReloadEffect>
    AdjustMoney: RequiredNonNullable<ICCSUsrMsg_AdjustMoney>
    StopSpectatorMode: RequiredNonNullable<ICCSUsrMsg_StopSpectatorMode>
    KillCam: RequiredNonNullable<ICCSUsrMsg_KillCam>
    DesiredTimescale: RequiredNonNullable<ICCSUsrMsg_DesiredTimescale>
    CurrentTimescale: RequiredNonNullable<ICCSUsrMsg_CurrentTimescale>
    AchievementEvent: RequiredNonNullable<ICCSUsrMsg_AchievementEvent>
    MatchEndConditions: RequiredNonNullable<ICCSUsrMsg_MatchEndConditions>
    DisconnectToLobby: RequiredNonNullable<ICCSUsrMsg_DisconnectToLobby>
    PlayerStatsUpdate: RequiredNonNullable<ICCSUsrMsg_PlayerStatsUpdate>
    DisplayInventory: RequiredNonNullable<ICCSUsrMsg_DisplayInventory>
    WarmupHasEnded: RequiredNonNullable<ICCSUsrMsg_WarmupHasEnded>
    ClientInfo: RequiredNonNullable<ICCSUsrMsg_ClientInfo>
    XRankGet: RequiredNonNullable<ICCSUsrMsg_XRankGet>
    XRankUpd: RequiredNonNullable<ICCSUsrMsg_XRankUpd>
    CallVoteFailed: RequiredNonNullable<ICCSUsrMsg_CallVoteFailed>
    VoteStart: RequiredNonNullable<ICCSUsrMsg_VoteStart>
    VotePass: RequiredNonNullable<ICCSUsrMsg_VotePass>
    VoteFailed: RequiredNonNullable<ICCSUsrMsg_VoteFailed>
    VoteSetup: RequiredNonNullable<ICCSUsrMsg_VoteSetup>
    ServerRankRevealAll: RequiredNonNullable<ICCSUsrMsg_ServerRankRevealAll>
    SendLastKillerDamageToClient: RequiredNonNullable<
        ICCSUsrMsg_SendLastKillerDamageToClient
    >
    ServerRankUpdate: RequiredNonNullable<ICCSUsrMsg_ServerRankUpdate>
    ItemPickup: RequiredNonNullable<ICCSUsrMsg_ItemPickup>
    ShowMenu: RequiredNonNullable<ICCSUsrMsg_ShowMenu>
    BarTime: RequiredNonNullable<ICCSUsrMsg_BarTime>
    AmmoDenied: RequiredNonNullable<ICCSUsrMsg_AmmoDenied>
    MarkAchievement: RequiredNonNullable<ICCSUsrMsg_MarkAchievement>
    MatchStatsUpdate: RequiredNonNullable<ICCSUsrMsg_MatchStatsUpdate>
    ItemDrop: RequiredNonNullable<ICCSUsrMsg_ItemDrop>
    GlowPropTurnOff: RequiredNonNullable<ICCSUsrMsg_GlowPropTurnOff>
    SendPlayerItemDrops: RequiredNonNullable<ICCSUsrMsg_SendPlayerItemDrops>
    RoundBackupFilenames: RequiredNonNullable<ICCSUsrMsg_RoundBackupFilenames>
    SendPlayerItemFound: RequiredNonNullable<ICCSUsrMsg_SendPlayerItemFound>
    ReportHit: RequiredNonNullable<ICCSUsrMsg_ReportHit>
    XpUpdate: RequiredNonNullable<ICCSUsrMsg_XpUpdate>
    QuestProgress: RequiredNonNullable<ICCSUsrMsg_QuestProgress>
}

export declare interface UserMessages {
    /**
     * Fired when any user message is sent.
     * @note Fired after specific event is fired.
     */
    on(message: "message", listener: (event: IUserMessageEvent) => void): this
    emit(message: "message", event: IUserMessageEvent): boolean

    on(
        message: "VGUIMenu",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_VGUIMenu>) => void,
    ): this
    on(
        message: "Geiger",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_Geiger>) => void,
    ): this
    on(
        message: "Train",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_Train>) => void,
    ): this
    on(
        message: "HudText",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_HudText>) => void,
    ): this
    on(
        message: "SayText",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_SayText>) => void,
    ): this
    on(
        message: "SayText2",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_SayText2>) => void,
    ): this
    on(
        message: "TextMsg",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_TextMsg>) => void,
    ): this
    on(
        message: "HudMsg",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_HudMsg>) => void,
    ): this
    on(
        message: "ResetHud",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ResetHud>) => void,
    ): this
    on(
        message: "GameTitle",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_GameTitle>) => void,
    ): this
    on(
        message: "Shake",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_Shake>) => void,
    ): this
    on(
        message: "Fade",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_Fade>) => void,
    ): this
    on(
        message: "Rumble",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_Rumble>) => void,
    ): this
    on(
        message: "CloseCaption",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_CloseCaption>) => void,
    ): this
    on(
        message: "CloseCaptionDirect",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_CloseCaptionDirect>,
        ) => void,
    ): this
    on(
        message: "SendAudio",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_SendAudio>) => void,
    ): this
    on(
        message: "RawAudio",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_RawAudio>) => void,
    ): this
    on(
        message: "VoiceMask",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_VoiceMask>) => void,
    ): this
    on(
        message: "RequestState",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_RequestState>) => void,
    ): this
    on(
        message: "Damage",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_Damage>) => void,
    ): this
    on(
        message: "RadioText",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_RadioText>) => void,
    ): this
    on(
        message: "HintText",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_HintText>) => void,
    ): this
    on(
        message: "KeyHintText",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_KeyHintText>) => void,
    ): this
    on(
        message: "ProcessSpottedEntityUpdate",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_ProcessSpottedEntityUpdate>,
        ) => void,
    ): this
    on(
        message: "ReloadEffect",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ReloadEffect>) => void,
    ): this
    on(
        message: "AdjustMoney",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_AdjustMoney>) => void,
    ): this
    on(
        message: "StopSpectatorMode",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_StopSpectatorMode>,
        ) => void,
    ): this
    on(
        message: "KillCam",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_KillCam>) => void,
    ): this
    on(
        message: "DesiredTimescale",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_DesiredTimescale>,
        ) => void,
    ): this
    on(
        message: "CurrentTimescale",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_CurrentTimescale>,
        ) => void,
    ): this
    on(
        message: "AchievementEvent",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_AchievementEvent>,
        ) => void,
    ): this
    on(
        message: "MatchEndConditions",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_MatchEndConditions>,
        ) => void,
    ): this
    on(
        message: "DisconnectToLobby",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_DisconnectToLobby>,
        ) => void,
    ): this
    on(
        message: "PlayerStatsUpdate",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_PlayerStatsUpdate>,
        ) => void,
    ): this
    on(
        message: "DisplayInventory",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_DisplayInventory>,
        ) => void,
    ): this
    on(
        message: "WarmupHasEnded",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_WarmupHasEnded>) => void,
    ): this
    on(
        message: "ClientInfo",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ClientInfo>) => void,
    ): this
    on(
        message: "XRankGet",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_XRankGet>) => void,
    ): this
    on(
        message: "XRankUpd",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_XRankUpd>) => void,
    ): this
    on(
        message: "CallVoteFailed",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_CallVoteFailed>) => void,
    ): this
    on(
        message: "VoteStart",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_VoteStart>) => void,
    ): this
    on(
        message: "VotePass",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_VotePass>) => void,
    ): this
    on(
        message: "VoteFailed",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_VoteFailed>) => void,
    ): this
    on(
        message: "VoteSetup",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_VoteSetup>) => void,
    ): this
    on(
        message: "ServerRankRevealAll",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_ServerRankRevealAll>,
        ) => void,
    ): this
    on(
        message: "SendLastKillerDamageToClient",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_SendLastKillerDamageToClient>,
        ) => void,
    ): this
    on(
        message: "ServerRankUpdate",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_ServerRankUpdate>,
        ) => void,
    ): this
    on(
        message: "ItemPickup",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ItemPickup>) => void,
    ): this
    on(
        message: "ShowMenu",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ShowMenu>) => void,
    ): this
    on(
        message: "BarTime",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_BarTime>) => void,
    ): this
    on(
        message: "AmmoDenied",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_AmmoDenied>) => void,
    ): this
    on(
        message: "MarkAchievement",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_MarkAchievement>,
        ) => void,
    ): this
    on(
        message: "MatchStatsUpdate",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_MatchStatsUpdate>,
        ) => void,
    ): this
    on(
        message: "ItemDrop",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ItemDrop>) => void,
    ): this
    on(
        message: "GlowPropTurnOff",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_GlowPropTurnOff>,
        ) => void,
    ): this
    on(
        message: "SendPlayerItemDrops",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_SendPlayerItemDrops>,
        ) => void,
    ): this
    on(
        message: "RoundBackupFilenames",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_RoundBackupFilenames>,
        ) => void,
    ): this
    on(
        message: "SendPlayerItemFound",
        listener: (
            msg: RequiredNonNullable<ICCSUsrMsg_SendPlayerItemFound>,
        ) => void,
    ): this
    on(
        message: "ReportHit",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_ReportHit>) => void,
    ): this
    on(
        message: "XpUpdate",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_XpUpdate>) => void,
    ): this
    on(
        message: "QuestProgress",
        listener: (msg: RequiredNonNullable<ICCSUsrMsg_QuestProgress>) => void,
    ): this

    on(
        message: keyof UserMessagesEventsMap,
        listener: (
            msg: UserMessagesEventsMap[keyof UserMessagesEventsMap],
        ) => void,
    ): this
    emit(
        message: keyof UserMessagesEventsMap,
        msg: UserMessagesEventsMap[keyof UserMessagesEventsMap],
    ): boolean
    emit(message: UserMessageName, msg: any): boolean
}

/**
 * Handles user messages for a demo file.
 */
export class UserMessages extends EventEmitter {
    public listen(demo: DemoFile) {
        demo.on("svc_UserMessage", this._handleUserMessage.bind(this))
    }

    private _handleUserMessage(msg: RequiredNonNullable<ICSVCMsg_UserMessage>) {
        const um = net.findUserMessageByType(msg.msgType)
        if (!um) {
            return
        }

        if (this.listenerCount(um.name) || this.listenerCount("message")) {
            const msgInst = um.class.decode(msg.msgData)
            assert(msgInst, "unable to decode user message")

            this.emit(um.name, msgInst)

            this.emit("message", {
                name: um.name,
                msg: msgInst,
            })
        }
    }
}
