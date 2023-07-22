export type TrampolineProvider = {
  request(params: {method: string}): Promise<unknown>;
}
