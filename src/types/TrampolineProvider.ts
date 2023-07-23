export type TrampolineProvider = {
  request(params: {method: string, params?: object }): Promise<unknown>;
}
