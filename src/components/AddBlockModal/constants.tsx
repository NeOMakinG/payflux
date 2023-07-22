import { Conditions, Functions } from "../../shared/functions";
import { WhitelistedAddresses } from "../FormModal/subComponents/WhitelistedAddresses";

export const blocksByMode: Record<Conditions | Functions, JSX.Element | null> =
  {
    [Conditions.IDENTITY]: null,
    [Conditions.RATE_LIMIT]: null,
    [Conditions.RATE_TRESHOLD]: null,
    [Conditions.REFERRALS]: null,
    [Conditions.TIME]: null,
    [Conditions.TOKEN_HOLDING]: null,
    [Conditions.WHITELIST]: <WhitelistedAddresses />,
    [Functions.ADD]: null,
    [Functions.DIVIDE]: null,
    [Functions.MULTIPLY]: null,
    [Functions.PAYMENT]: null,
    [Functions.SUBTRACT]: null,
  };
