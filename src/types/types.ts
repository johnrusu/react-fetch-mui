export type TInitialState = {
  history: string[];
  [key: string]: any;
};

export type TAction = {
  payload: string;
  instanceType?: string;
  type: string;
};
