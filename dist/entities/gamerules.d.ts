import { CCSGameRulesProxy } from "../sendtabletypes";
import { Networkable } from "./networkable";
/**
 * Represents the game rules.
 */
export declare class GameRules extends Networkable<CCSGameRulesProxy> {
  /**
   * @returns Is the game currently in 'warmup' mode?
   */
  readonly isWarmup: boolean;
  /**
   * @deprecated Use `GameRules#roundsPlayed` instead.
   */
  readonly roundNumber: number;
  /**
   * This value is incremented when the scores are updated at round end.
   * If you need to keep track of the current round number, store this value
   * at each `round_start`.
   *
   * @returns Total number of rounds played.
   */
  readonly roundsPlayed: number;
  /**
   * @returns 'first', 'second', 'halftime' or 'postgame'
   */
  readonly phase: string;
}
//# sourceMappingURL=gamerules.d.ts.map
