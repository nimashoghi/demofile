import {EventEmitter} from "events"
import {DemoFile} from "./demo"
import * as GameEventTypes from "./eventtypes"
import {GameEvent} from "./gameevent"
import {ICSVCMsg_GameEventList} from "./protobufs/netmessages"

interface GameEventEvent<T> {
    name: string
    event: T
}

export declare interface GameEvents {
    on(
        event: "event",
        listener: (event: GameEventTypes.INonSpecificGameEvent) => void,
    ): this
    on(
        event: "server_spawn",
        listener: (event: GameEventTypes.IEventServerSpawn) => void,
    ): this
    on(
        event: "server_pre_shutdown",
        listener: (event: GameEventTypes.IEventServerPreShutdown) => void,
    ): this
    on(
        event: "server_shutdown",
        listener: (event: GameEventTypes.IEventServerShutdown) => void,
    ): this
    on(
        event: "server_cvar",
        listener: (event: GameEventTypes.IEventServerCvar) => void,
    ): this
    on(
        event: "server_message",
        listener: (event: GameEventTypes.IEventServerMessage) => void,
    ): this
    on(
        event: "server_addban",
        listener: (event: GameEventTypes.IEventServerAddban) => void,
    ): this
    on(
        event: "server_removeban",
        listener: (event: GameEventTypes.IEventServerRemoveban) => void,
    ): this
    on(
        event: "player_connect",
        listener: (event: GameEventTypes.IEventPlayerConnect) => void,
    ): this
    on(
        event: "player_info",
        listener: (event: GameEventTypes.IEventPlayerInfo) => void,
    ): this
    on(
        event: "player_disconnect",
        listener: (event: GameEventTypes.IEventPlayerDisconnect) => void,
    ): this
    on(
        event: "player_activate",
        listener: (event: GameEventTypes.IEventPlayerActivate) => void,
    ): this
    on(
        event: "player_connect_full",
        listener: (event: GameEventTypes.IEventPlayerConnectFull) => void,
    ): this
    on(
        event: "player_say",
        listener: (event: GameEventTypes.IEventPlayerSay) => void,
    ): this
    on(
        event: "cs_round_start_beep",
        listener: (event: GameEventTypes.IEventCsRoundStartBeep) => void,
    ): this
    on(
        event: "cs_round_final_beep",
        listener: (event: GameEventTypes.IEventCsRoundFinalBeep) => void,
    ): this
    on(
        event: "round_time_warning",
        listener: (event: GameEventTypes.IEventRoundTimeWarning) => void,
    ): this
    on(
        event: "team_info",
        listener: (event: GameEventTypes.IEventTeamInfo) => void,
    ): this
    on(
        event: "team_score",
        listener: (event: GameEventTypes.IEventTeamScore) => void,
    ): this
    on(
        event: "teamplay_broadcast_audio",
        listener: (event: GameEventTypes.IEventTeamplayBroadcastAudio) => void,
    ): this
    on(
        event: "gameui_hidden",
        listener: (event: GameEventTypes.IEventGameuiHidden) => void,
    ): this
    on(
        event: "items_gifted",
        listener: (event: GameEventTypes.IEventItemsGifted) => void,
    ): this
    on(
        event: "player_team",
        listener: (event: GameEventTypes.IEventPlayerTeam) => void,
    ): this
    on(
        event: "player_class",
        listener: (event: GameEventTypes.IEventPlayerClass) => void,
    ): this
    on(
        event: "player_death",
        listener: (event: GameEventTypes.IEventPlayerDeath) => void,
    ): this
    on(
        event: "player_hurt",
        listener: (event: GameEventTypes.IEventPlayerHurt) => void,
    ): this
    on(
        event: "player_chat",
        listener: (event: GameEventTypes.IEventPlayerChat) => void,
    ): this
    on(
        event: "player_score",
        listener: (event: GameEventTypes.IEventPlayerScore) => void,
    ): this
    on(
        event: "player_spawn",
        listener: (event: GameEventTypes.IEventPlayerSpawn) => void,
    ): this
    on(
        event: "player_shoot",
        listener: (event: GameEventTypes.IEventPlayerShoot) => void,
    ): this
    on(
        event: "player_use",
        listener: (event: GameEventTypes.IEventPlayerUse) => void,
    ): this
    on(
        event: "player_changename",
        listener: (event: GameEventTypes.IEventPlayerChangename) => void,
    ): this
    on(
        event: "player_hintmessage",
        listener: (event: GameEventTypes.IEventPlayerHintmessage) => void,
    ): this
    on(
        event: "game_init",
        listener: (event: GameEventTypes.IEventGameInit) => void,
    ): this
    on(
        event: "game_newmap",
        listener: (event: GameEventTypes.IEventGameNewmap) => void,
    ): this
    on(
        event: "game_start",
        listener: (event: GameEventTypes.IEventGameStart) => void,
    ): this
    on(
        event: "game_end",
        listener: (event: GameEventTypes.IEventGameEnd) => void,
    ): this
    on(
        event: "round_start",
        listener: (event: GameEventTypes.IEventRoundStart) => void,
    ): this
    on(
        event: "round_announce_match_point",
        listener: (event: GameEventTypes.IEventRoundAnnounceMatchPoint) => void,
    ): this
    on(
        event: "round_announce_final",
        listener: (event: GameEventTypes.IEventRoundAnnounceFinal) => void,
    ): this
    on(
        event: "round_announce_last_round_half",
        listener: (
            event: GameEventTypes.IEventRoundAnnounceLastRoundHalf,
        ) => void,
    ): this
    on(
        event: "round_announce_match_start",
        listener: (event: GameEventTypes.IEventRoundAnnounceMatchStart) => void,
    ): this
    on(
        event: "round_announce_warmup",
        listener: (event: GameEventTypes.IEventRoundAnnounceWarmup) => void,
    ): this
    on(
        event: "round_end",
        listener: (event: GameEventTypes.IEventRoundEnd) => void,
    ): this
    on(
        event: "round_end_upload_stats",
        listener: (event: GameEventTypes.IEventRoundEndUploadStats) => void,
    ): this
    on(
        event: "round_officially_ended",
        listener: (event: GameEventTypes.IEventRoundOfficiallyEnded) => void,
    ): this
    on(
        event: "ugc_map_info_received",
        listener: (event: GameEventTypes.IEventUgcMapInfoReceived) => void,
    ): this
    on(
        event: "ugc_map_unsubscribed",
        listener: (event: GameEventTypes.IEventUgcMapUnsubscribed) => void,
    ): this
    on(
        event: "ugc_map_download_error",
        listener: (event: GameEventTypes.IEventUgcMapDownloadError) => void,
    ): this
    on(
        event: "ugc_file_download_finished",
        listener: (event: GameEventTypes.IEventUgcFileDownloadFinished) => void,
    ): this
    on(
        event: "ugc_file_download_start",
        listener: (event: GameEventTypes.IEventUgcFileDownloadStart) => void,
    ): this
    on(
        event: "begin_new_match",
        listener: (event: GameEventTypes.IEventBeginNewMatch) => void,
    ): this
    on(
        event: "round_start_pre_entity",
        listener: (event: GameEventTypes.IEventRoundStartPreEntity) => void,
    ): this
    on(
        event: "teamplay_round_start",
        listener: (event: GameEventTypes.IEventTeamplayRoundStart) => void,
    ): this
    on(
        event: "hostname_changed",
        listener: (event: GameEventTypes.IEventHostnameChanged) => void,
    ): this
    on(
        event: "difficulty_changed",
        listener: (event: GameEventTypes.IEventDifficultyChanged) => void,
    ): this
    on(
        event: "finale_start",
        listener: (event: GameEventTypes.IEventFinaleStart) => void,
    ): this
    on(
        event: "game_message",
        listener: (event: GameEventTypes.IEventGameMessage) => void,
    ): this
    on(
        event: "dm_bonus_weapon_start",
        listener: (event: GameEventTypes.IEventDmBonusWeaponStart) => void,
    ): this
    on(
        event: "survival_announce_phase",
        listener: (event: GameEventTypes.IEventSurvivalAnnouncePhase) => void,
    ): this
    on(
        event: "break_breakable",
        listener: (event: GameEventTypes.IEventBreakBreakable) => void,
    ): this
    on(
        event: "break_prop",
        listener: (event: GameEventTypes.IEventBreakProp) => void,
    ): this
    on(
        event: "player_decal",
        listener: (event: GameEventTypes.IEventPlayerDecal) => void,
    ): this
    on(
        event: "entity_killed",
        listener: (event: GameEventTypes.IEventEntityKilled) => void,
    ): this
    on(
        event: "bonus_updated",
        listener: (event: GameEventTypes.IEventBonusUpdated) => void,
    ): this
    on(
        event: "player_stats_updated",
        listener: (event: GameEventTypes.IEventPlayerStatsUpdated) => void,
    ): this
    on(
        event: "achievement_event",
        listener: (event: GameEventTypes.IEventAchievementEvent) => void,
    ): this
    on(
        event: "achievement_increment",
        listener: (event: GameEventTypes.IEventAchievementIncrement) => void,
    ): this
    on(
        event: "achievement_earned",
        listener: (event: GameEventTypes.IEventAchievementEarned) => void,
    ): this
    on(
        event: "achievement_write_failed",
        listener: (event: GameEventTypes.IEventAchievementWriteFailed) => void,
    ): this
    on(
        event: "physgun_pickup",
        listener: (event: GameEventTypes.IEventPhysgunPickup) => void,
    ): this
    on(
        event: "flare_ignite_npc",
        listener: (event: GameEventTypes.IEventFlareIgniteNpc) => void,
    ): this
    on(
        event: "helicopter_grenade_punt_miss",
        listener: (
            event: GameEventTypes.IEventHelicopterGrenadePuntMiss,
        ) => void,
    ): this
    on(
        event: "user_data_downloaded",
        listener: (event: GameEventTypes.IEventUserDataDownloaded) => void,
    ): this
    on(
        event: "ragdoll_dissolved",
        listener: (event: GameEventTypes.IEventRagdollDissolved) => void,
    ): this
    on(
        event: "gameinstructor_draw",
        listener: (event: GameEventTypes.IEventGameinstructorDraw) => void,
    ): this
    on(
        event: "gameinstructor_nodraw",
        listener: (event: GameEventTypes.IEventGameinstructorNodraw) => void,
    ): this
    on(
        event: "map_transition",
        listener: (event: GameEventTypes.IEventMapTransition) => void,
    ): this
    on(
        event: "entity_visible",
        listener: (event: GameEventTypes.IEventEntityVisible) => void,
    ): this
    on(
        event: "set_instructor_group_enabled",
        listener: (
            event: GameEventTypes.IEventSetInstructorGroupEnabled,
        ) => void,
    ): this
    on(
        event: "instructor_server_hint_create",
        listener: (
            event: GameEventTypes.IEventInstructorServerHintCreate,
        ) => void,
    ): this
    on(
        event: "instructor_server_hint_stop",
        listener: (
            event: GameEventTypes.IEventInstructorServerHintStop,
        ) => void,
    ): this
    on(
        event: "read_game_titledata",
        listener: (event: GameEventTypes.IEventReadGameTitledata) => void,
    ): this
    on(
        event: "write_game_titledata",
        listener: (event: GameEventTypes.IEventWriteGameTitledata) => void,
    ): this
    on(
        event: "reset_game_titledata",
        listener: (event: GameEventTypes.IEventResetGameTitledata) => void,
    ): this
    on(
        event: "weaponhud_selection",
        listener: (event: GameEventTypes.IEventWeaponhudSelection) => void,
    ): this
    on(
        event: "vote_ended",
        listener: (event: GameEventTypes.IEventVoteEnded) => void,
    ): this
    on(
        event: "vote_started",
        listener: (event: GameEventTypes.IEventVoteStarted) => void,
    ): this
    on(
        event: "vote_changed",
        listener: (event: GameEventTypes.IEventVoteChanged) => void,
    ): this
    on(
        event: "vote_passed",
        listener: (event: GameEventTypes.IEventVotePassed) => void,
    ): this
    on(
        event: "vote_failed",
        listener: (event: GameEventTypes.IEventVoteFailed) => void,
    ): this
    on(
        event: "vote_cast",
        listener: (event: GameEventTypes.IEventVoteCast) => void,
    ): this
    on(
        event: "vote_options",
        listener: (event: GameEventTypes.IEventVoteOptions) => void,
    ): this
    on(
        event: "endmatch_mapvote_selecting_map",
        listener: (
            event: GameEventTypes.IEventEndmatchMapvoteSelectingMap,
        ) => void,
    ): this
    on(
        event: "endmatch_cmm_start_reveal_items",
        listener: (
            event: GameEventTypes.IEventEndmatchCmmStartRevealItems,
        ) => void,
    ): this
    on(
        event: "inventory_updated",
        listener: (event: GameEventTypes.IEventInventoryUpdated) => void,
    ): this
    on(
        event: "cart_updated",
        listener: (event: GameEventTypes.IEventCartUpdated) => void,
    ): this
    on(
        event: "store_pricesheet_updated",
        listener: (event: GameEventTypes.IEventStorePricesheetUpdated) => void,
    ): this
    on(
        event: "gc_connected",
        listener: (event: GameEventTypes.IEventGcConnected) => void,
    ): this
    on(
        event: "item_schema_initialized",
        listener: (event: GameEventTypes.IEventItemSchemaInitialized) => void,
    ): this
    on(
        event: "client_loadout_changed",
        listener: (event: GameEventTypes.IEventClientLoadoutChanged) => void,
    ): this
    on(
        event: "add_player_sonar_icon",
        listener: (event: GameEventTypes.IEventAddPlayerSonarIcon) => void,
    ): this
    on(
        event: "add_bullet_hit_marker",
        listener: (event: GameEventTypes.IEventAddBulletHitMarker) => void,
    ): this
    on(
        event: "verify_client_hit",
        listener: (event: GameEventTypes.IEventVerifyClientHit) => void,
    ): this
    on(
        event: "other_death",
        listener: (event: GameEventTypes.IEventOtherDeath) => void,
    ): this
    on(
        event: "item_purchase",
        listener: (event: GameEventTypes.IEventItemPurchase) => void,
    ): this
    on(
        event: "bomb_beginplant",
        listener: (event: GameEventTypes.IEventBombBeginplant) => void,
    ): this
    on(
        event: "bomb_abortplant",
        listener: (event: GameEventTypes.IEventBombAbortplant) => void,
    ): this
    on(
        event: "bomb_planted",
        listener: (event: GameEventTypes.IEventBombPlanted) => void,
    ): this
    on(
        event: "bomb_defused",
        listener: (event: GameEventTypes.IEventBombDefused) => void,
    ): this
    on(
        event: "bomb_exploded",
        listener: (event: GameEventTypes.IEventBombExploded) => void,
    ): this
    on(
        event: "bomb_dropped",
        listener: (event: GameEventTypes.IEventBombDropped) => void,
    ): this
    on(
        event: "bomb_pickup",
        listener: (event: GameEventTypes.IEventBombPickup) => void,
    ): this
    on(
        event: "defuser_dropped",
        listener: (event: GameEventTypes.IEventDefuserDropped) => void,
    ): this
    on(
        event: "defuser_pickup",
        listener: (event: GameEventTypes.IEventDefuserPickup) => void,
    ): this
    on(
        event: "announce_phase_end",
        listener: (event: GameEventTypes.IEventAnnouncePhaseEnd) => void,
    ): this
    on(
        event: "cs_intermission",
        listener: (event: GameEventTypes.IEventCsIntermission) => void,
    ): this
    on(
        event: "bomb_begindefuse",
        listener: (event: GameEventTypes.IEventBombBegindefuse) => void,
    ): this
    on(
        event: "bomb_abortdefuse",
        listener: (event: GameEventTypes.IEventBombAbortdefuse) => void,
    ): this
    on(
        event: "hostage_follows",
        listener: (event: GameEventTypes.IEventHostageFollows) => void,
    ): this
    on(
        event: "hostage_hurt",
        listener: (event: GameEventTypes.IEventHostageHurt) => void,
    ): this
    on(
        event: "hostage_killed",
        listener: (event: GameEventTypes.IEventHostageKilled) => void,
    ): this
    on(
        event: "hostage_rescued",
        listener: (event: GameEventTypes.IEventHostageRescued) => void,
    ): this
    on(
        event: "hostage_stops_following",
        listener: (event: GameEventTypes.IEventHostageStopsFollowing) => void,
    ): this
    on(
        event: "hostage_rescued_all",
        listener: (event: GameEventTypes.IEventHostageRescuedAll) => void,
    ): this
    on(
        event: "hostage_call_for_help",
        listener: (event: GameEventTypes.IEventHostageCallForHelp) => void,
    ): this
    on(
        event: "vip_escaped",
        listener: (event: GameEventTypes.IEventVipEscaped) => void,
    ): this
    on(
        event: "vip_killed",
        listener: (event: GameEventTypes.IEventVipKilled) => void,
    ): this
    on(
        event: "player_radio",
        listener: (event: GameEventTypes.IEventPlayerRadio) => void,
    ): this
    on(
        event: "bomb_beep",
        listener: (event: GameEventTypes.IEventBombBeep) => void,
    ): this
    on(
        event: "weapon_fire",
        listener: (event: GameEventTypes.IEventWeaponFire) => void,
    ): this
    on(
        event: "weapon_fire_on_empty",
        listener: (event: GameEventTypes.IEventWeaponFireOnEmpty) => void,
    ): this
    on(
        event: "grenade_thrown",
        listener: (event: GameEventTypes.IEventGrenadeThrown) => void,
    ): this
    on(
        event: "weapon_outofammo",
        listener: (event: GameEventTypes.IEventWeaponOutofammo) => void,
    ): this
    on(
        event: "weapon_reload",
        listener: (event: GameEventTypes.IEventWeaponReload) => void,
    ): this
    on(
        event: "weapon_zoom",
        listener: (event: GameEventTypes.IEventWeaponZoom) => void,
    ): this
    on(
        event: "silencer_detach",
        listener: (event: GameEventTypes.IEventSilencerDetach) => void,
    ): this
    on(
        event: "inspect_weapon",
        listener: (event: GameEventTypes.IEventInspectWeapon) => void,
    ): this
    on(
        event: "weapon_zoom_rifle",
        listener: (event: GameEventTypes.IEventWeaponZoomRifle) => void,
    ): this
    on(
        event: "player_spawned",
        listener: (event: GameEventTypes.IEventPlayerSpawned) => void,
    ): this
    on(
        event: "item_pickup",
        listener: (event: GameEventTypes.IEventItemPickup) => void,
    ): this
    on(
        event: "item_remove",
        listener: (event: GameEventTypes.IEventItemRemove) => void,
    ): this
    on(
        event: "ammo_pickup",
        listener: (event: GameEventTypes.IEventAmmoPickup) => void,
    ): this
    on(
        event: "item_equip",
        listener: (event: GameEventTypes.IEventItemEquip) => void,
    ): this
    on(
        event: "enter_buyzone",
        listener: (event: GameEventTypes.IEventEnterBuyzone) => void,
    ): this
    on(
        event: "exit_buyzone",
        listener: (event: GameEventTypes.IEventExitBuyzone) => void,
    ): this
    on(
        event: "buytime_ended",
        listener: (event: GameEventTypes.IEventBuytimeEnded) => void,
    ): this
    on(
        event: "enter_bombzone",
        listener: (event: GameEventTypes.IEventEnterBombzone) => void,
    ): this
    on(
        event: "exit_bombzone",
        listener: (event: GameEventTypes.IEventExitBombzone) => void,
    ): this
    on(
        event: "enter_rescue_zone",
        listener: (event: GameEventTypes.IEventEnterRescueZone) => void,
    ): this
    on(
        event: "exit_rescue_zone",
        listener: (event: GameEventTypes.IEventExitRescueZone) => void,
    ): this
    on(
        event: "silencer_off",
        listener: (event: GameEventTypes.IEventSilencerOff) => void,
    ): this
    on(
        event: "silencer_on",
        listener: (event: GameEventTypes.IEventSilencerOn) => void,
    ): this
    on(
        event: "buymenu_open",
        listener: (event: GameEventTypes.IEventBuymenuOpen) => void,
    ): this
    on(
        event: "buymenu_close",
        listener: (event: GameEventTypes.IEventBuymenuClose) => void,
    ): this
    on(
        event: "round_prestart",
        listener: (event: GameEventTypes.IEventRoundPrestart) => void,
    ): this
    on(
        event: "round_poststart",
        listener: (event: GameEventTypes.IEventRoundPoststart) => void,
    ): this
    on(
        event: "grenade_bounce",
        listener: (event: GameEventTypes.IEventGrenadeBounce) => void,
    ): this
    on(
        event: "hegrenade_detonate",
        listener: (event: GameEventTypes.IEventHegrenadeDetonate) => void,
    ): this
    on(
        event: "flashbang_detonate",
        listener: (event: GameEventTypes.IEventFlashbangDetonate) => void,
    ): this
    on(
        event: "smokegrenade_detonate",
        listener: (event: GameEventTypes.IEventSmokegrenadeDetonate) => void,
    ): this
    on(
        event: "smokegrenade_expired",
        listener: (event: GameEventTypes.IEventSmokegrenadeExpired) => void,
    ): this
    on(
        event: "molotov_detonate",
        listener: (event: GameEventTypes.IEventMolotovDetonate) => void,
    ): this
    on(
        event: "decoy_detonate",
        listener: (event: GameEventTypes.IEventDecoyDetonate) => void,
    ): this
    on(
        event: "decoy_started",
        listener: (event: GameEventTypes.IEventDecoyStarted) => void,
    ): this
    on(
        event: "tagrenade_detonate",
        listener: (event: GameEventTypes.IEventTagrenadeDetonate) => void,
    ): this
    on(
        event: "inferno_startburn",
        listener: (event: GameEventTypes.IEventInfernoStartburn) => void,
    ): this
    on(
        event: "inferno_expire",
        listener: (event: GameEventTypes.IEventInfernoExpire) => void,
    ): this
    on(
        event: "inferno_extinguish",
        listener: (event: GameEventTypes.IEventInfernoExtinguish) => void,
    ): this
    on(
        event: "decoy_firing",
        listener: (event: GameEventTypes.IEventDecoyFiring) => void,
    ): this
    on(
        event: "bullet_impact",
        listener: (event: GameEventTypes.IEventBulletImpact) => void,
    ): this
    on(
        event: "player_footstep",
        listener: (event: GameEventTypes.IEventPlayerFootstep) => void,
    ): this
    on(
        event: "player_jump",
        listener: (event: GameEventTypes.IEventPlayerJump) => void,
    ): this
    on(
        event: "player_blind",
        listener: (event: GameEventTypes.IEventPlayerBlind) => void,
    ): this
    on(
        event: "player_falldamage",
        listener: (event: GameEventTypes.IEventPlayerFalldamage) => void,
    ): this
    on(
        event: "door_moving",
        listener: (event: GameEventTypes.IEventDoorMoving) => void,
    ): this
    on(
        event: "round_freeze_end",
        listener: (event: GameEventTypes.IEventRoundFreezeEnd) => void,
    ): this
    on(
        event: "mb_input_lock_success",
        listener: (event: GameEventTypes.IEventMbInputLockSuccess) => void,
    ): this
    on(
        event: "mb_input_lock_cancel",
        listener: (event: GameEventTypes.IEventMbInputLockCancel) => void,
    ): this
    on(
        event: "nav_blocked",
        listener: (event: GameEventTypes.IEventNavBlocked) => void,
    ): this
    on(
        event: "nav_generate",
        listener: (event: GameEventTypes.IEventNavGenerate) => void,
    ): this
    on(
        event: "achievement_info_loaded",
        listener: (event: GameEventTypes.IEventAchievementInfoLoaded) => void,
    ): this
    on(
        event: "spec_target_updated",
        listener: (event: GameEventTypes.IEventSpecTargetUpdated) => void,
    ): this
    on(
        event: "spec_mode_updated",
        listener: (event: GameEventTypes.IEventSpecModeUpdated) => void,
    ): this
    on(
        event: "hltv_changed_mode",
        listener: (event: GameEventTypes.IEventHltvChangedMode) => void,
    ): this
    on(
        event: "cs_game_disconnected",
        listener: (event: GameEventTypes.IEventCsGameDisconnected) => void,
    ): this
    on(
        event: "cs_win_panel_round",
        listener: (event: GameEventTypes.IEventCsWinPanelRound) => void,
    ): this
    on(
        event: "cs_win_panel_match",
        listener: (event: GameEventTypes.IEventCsWinPanelMatch) => void,
    ): this
    on(
        event: "cs_match_end_restart",
        listener: (event: GameEventTypes.IEventCsMatchEndRestart) => void,
    ): this
    on(
        event: "cs_pre_restart",
        listener: (event: GameEventTypes.IEventCsPreRestart) => void,
    ): this
    on(
        event: "show_freezepanel",
        listener: (event: GameEventTypes.IEventShowFreezepanel) => void,
    ): this
    on(
        event: "hide_freezepanel",
        listener: (event: GameEventTypes.IEventHideFreezepanel) => void,
    ): this
    on(
        event: "freezecam_started",
        listener: (event: GameEventTypes.IEventFreezecamStarted) => void,
    ): this
    on(
        event: "player_avenged_teammate",
        listener: (event: GameEventTypes.IEventPlayerAvengedTeammate) => void,
    ): this
    on(
        event: "achievement_earned_local",
        listener: (event: GameEventTypes.IEventAchievementEarnedLocal) => void,
    ): this
    on(
        event: "item_found",
        listener: (event: GameEventTypes.IEventItemFound) => void,
    ): this
    on(
        event: "repost_xbox_achievements",
        listener: (event: GameEventTypes.IEventRepostXboxAchievements) => void,
    ): this
    on(
        event: "match_end_conditions",
        listener: (event: GameEventTypes.IEventMatchEndConditions) => void,
    ): this
    on(
        event: "round_mvp",
        listener: (event: GameEventTypes.IEventRoundMvp) => void,
    ): this
    on(
        event: "client_disconnect",
        listener: (event: GameEventTypes.IEventClientDisconnect) => void,
    ): this
    on(
        event: "gg_player_levelup",
        listener: (event: GameEventTypes.IEventGgPlayerLevelup) => void,
    ): this
    on(
        event: "ggtr_player_levelup",
        listener: (event: GameEventTypes.IEventGgtrPlayerLevelup) => void,
    ): this
    on(
        event: "assassination_target_killed",
        listener: (
            event: GameEventTypes.IEventAssassinationTargetKilled,
        ) => void,
    ): this
    on(
        event: "ggprogressive_player_levelup",
        listener: (
            event: GameEventTypes.IEventGgprogressivePlayerLevelup,
        ) => void,
    ): this
    on(
        event: "gg_killed_enemy",
        listener: (event: GameEventTypes.IEventGgKilledEnemy) => void,
    ): this
    on(
        event: "gg_final_weapon_achieved",
        listener: (event: GameEventTypes.IEventGgFinalWeaponAchieved) => void,
    ): this
    on(
        event: "gg_bonus_grenade_achieved",
        listener: (event: GameEventTypes.IEventGgBonusGrenadeAchieved) => void,
    ): this
    on(
        event: "switch_team",
        listener: (event: GameEventTypes.IEventSwitchTeam) => void,
    ): this
    on(
        event: "gg_leader",
        listener: (event: GameEventTypes.IEventGgLeader) => void,
    ): this
    on(
        event: "gg_team_leader",
        listener: (event: GameEventTypes.IEventGgTeamLeader) => void,
    ): this
    on(
        event: "gg_player_impending_upgrade",
        listener: (
            event: GameEventTypes.IEventGgPlayerImpendingUpgrade,
        ) => void,
    ): this
    on(
        event: "write_profile_data",
        listener: (event: GameEventTypes.IEventWriteProfileData) => void,
    ): this
    on(
        event: "trial_time_expired",
        listener: (event: GameEventTypes.IEventTrialTimeExpired) => void,
    ): this
    on(
        event: "update_matchmaking_stats",
        listener: (event: GameEventTypes.IEventUpdateMatchmakingStats) => void,
    ): this
    on(
        event: "player_reset_vote",
        listener: (event: GameEventTypes.IEventPlayerResetVote) => void,
    ): this
    on(
        event: "enable_restart_voting",
        listener: (event: GameEventTypes.IEventEnableRestartVoting) => void,
    ): this
    on(
        event: "sfuievent",
        listener: (event: GameEventTypes.IEventSfuievent) => void,
    ): this
    on(
        event: "start_vote",
        listener: (event: GameEventTypes.IEventStartVote) => void,
    ): this
    on(
        event: "player_given_c4",
        listener: (event: GameEventTypes.IEventPlayerGivenC4) => void,
    ): this
    on(
        event: "gg_reset_round_start_sounds",
        listener: (event: GameEventTypes.IEventGgResetRoundStartSounds) => void,
    ): this
    on(
        event: "tr_player_flashbanged",
        listener: (event: GameEventTypes.IEventTrPlayerFlashbanged) => void,
    ): this
    on(
        event: "tr_mark_complete",
        listener: (event: GameEventTypes.IEventTrMarkComplete) => void,
    ): this
    on(
        event: "tr_mark_best_time",
        listener: (event: GameEventTypes.IEventTrMarkBestTime) => void,
    ): this
    on(
        event: "tr_exit_hint_trigger",
        listener: (event: GameEventTypes.IEventTrExitHintTrigger) => void,
    ): this
    on(
        event: "bot_takeover",
        listener: (event: GameEventTypes.IEventBotTakeover) => void,
    ): this
    on(
        event: "tr_show_finish_msgbox",
        listener: (event: GameEventTypes.IEventTrShowFinishMsgbox) => void,
    ): this
    on(
        event: "tr_show_exit_msgbox",
        listener: (event: GameEventTypes.IEventTrShowExitMsgbox) => void,
    ): this
    on(
        event: "reset_player_controls",
        listener: (event: GameEventTypes.IEventResetPlayerControls) => void,
    ): this
    on(
        event: "jointeam_failed",
        listener: (event: GameEventTypes.IEventJointeamFailed) => void,
    ): this
    on(
        event: "teamchange_pending",
        listener: (event: GameEventTypes.IEventTeamchangePending) => void,
    ): this
    on(
        event: "material_default_complete",
        listener: (event: GameEventTypes.IEventMaterialDefaultComplete) => void,
    ): this
    on(
        event: "cs_prev_next_spectator",
        listener: (event: GameEventTypes.IEventCsPrevNextSpectator) => void,
    ): this
    on(
        event: "nextlevel_changed",
        listener: (event: GameEventTypes.IEventNextlevelChanged) => void,
    ): this
    on(
        event: "seasoncoin_levelup",
        listener: (event: GameEventTypes.IEventSeasoncoinLevelup) => void,
    ): this
    on(
        event: "tournament_reward",
        listener: (event: GameEventTypes.IEventTournamentReward) => void,
    ): this
    on(
        event: "start_halftime",
        listener: (event: GameEventTypes.IEventStartHalftime) => void,
    ): this
    on(
        event: "hltv_status",
        listener: (event: GameEventTypes.IEventHltvStatus) => void,
    ): this
    on(
        event: "hltv_cameraman",
        listener: (event: GameEventTypes.IEventHltvCameraman) => void,
    ): this
    on(
        event: "hltv_rank_camera",
        listener: (event: GameEventTypes.IEventHltvRankCamera) => void,
    ): this
    on(
        event: "hltv_rank_entity",
        listener: (event: GameEventTypes.IEventHltvRankEntity) => void,
    ): this
    on(
        event: "hltv_fixed",
        listener: (event: GameEventTypes.IEventHltvFixed) => void,
    ): this
    on(
        event: "hltv_chase",
        listener: (event: GameEventTypes.IEventHltvChase) => void,
    ): this
    on(
        event: "hltv_message",
        listener: (event: GameEventTypes.IEventHltvMessage) => void,
    ): this
    on(
        event: "hltv_title",
        listener: (event: GameEventTypes.IEventHltvTitle) => void,
    ): this
    on(
        event: "hltv_chat",
        listener: (event: GameEventTypes.IEventHltvChat) => void,
    ): this
    on(
        event: "hltv_changed_target",
        listener: (event: GameEventTypes.IEventHltvChangedTarget) => void,
    ): this
}

/**
 * Manages game events for a demo file.
 */
export class GameEvents extends EventEmitter {
    public gameEventList: GameEvent[] = []
    private _tickEvents: Array<GameEventEvent<any>> = []

    public listen(demo: DemoFile) {
        demo.on("svc_GameEventList", this._handleGameEventList.bind(this))

        demo.on("svc_GameEvent", msg => {
            const event = this.gameEventList[msg.eventid]
            if (!event) {
                return
            }

            const eventVars = event.messageToObject(msg)

            // buffer game events until the end of the tick
            this._tickEvents.push({
                name: event.name,
                event: eventVars,
            })
        })

        demo.on("tickend", () => {
            this._tickEvents.forEach(event => {
                this.emit(event.name, event.event)

                this.emit("event", {
                    name: event.name,
                    event: event.event,
                })
            })

            this._tickEvents = []
        })
    }

    private _handleGameEventList(
        msg: RequiredNonNullable<ICSVCMsg_GameEventList>,
    ) {
        for (const descriptor of msg.descriptors) {
            this.gameEventList[descriptor.eventid] = new GameEvent(descriptor)
        }
    }
}
