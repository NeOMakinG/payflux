export enum BlockType {
	PLUS = "Plus",
  CONDITION = "Condition",
  FUNCTION = "Function",
  START = "Start",
}

export enum Conditions {
  WHITELIST = "WHITELIST",
  IDENTITY = "IDENTITY",
  RATE_LIMIT = "RATE_LIMIT",
  RATE_TRESHOLD = "RATE_TRESHOLD",
  TOKEN_HOLDING = "TOKEN_HOLDING",
  REFERRALS = "REFERRALS",
  TIME = "TIME",
}

export enum Functions {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  PAYMENT = "PAYMENT",
}
