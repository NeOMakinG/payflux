import { Conditions, Functions } from "../../shared/functions";

export type FnDefinition = () => { def: string; use: string };

export type ContractFnToCode = Record<Functions, FnDefinition>;

export type ConditionDefinition = () => { def?: string, use: string, var?: string, construct?: string };

export type ContractConditionsToCode = Partial<Record<Conditions, ConditionDefinition>>;