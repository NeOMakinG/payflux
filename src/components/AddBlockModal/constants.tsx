import { Conditions, Functions } from "../../shared/functions";

export const blocksById: Record<Conditions | Functions, JSX.Element | null> = {
  [Conditions.IDENTITY]: null,
  [Conditions.RATE_LIMIT]: null,
  [Conditions.RATE_TRESHOLD]: null,
  [Conditions.REFERRALS]: null,
  [Conditions.TIME]: null,
  [Conditions.TOKEN_HOLDING]: null,
  [Conditions.WHITELIST]: null,
  [Functions.ADD]: null,
  [Functions.DIVIDE]: null,
  [Functions.MULTIPLY]: null,
  [Functions.PAYMENT]: null,
  [Functions.SUBTRACT]: null,
};
