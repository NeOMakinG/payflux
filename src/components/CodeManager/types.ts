import { Functions } from "../../shared/functions";

export type FnDefinition = () => { def: string; use: string };

export type ContractFnToCode = Record<Functions, FnDefinition>;