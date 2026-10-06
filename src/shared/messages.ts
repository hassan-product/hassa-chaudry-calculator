// Codes and the words a person sees, taken word for word from Decisions 8 and 9.
// Errors are states the calculator is in; notices are refusals that leave the state as it was.

export type ErrorCode = 'DIVIDE_BY_ZERO' | 'NUMBER_TOO_LARGE' | 'NUMBER_TOO_SMALL'

export type NoticeCode = 'DIGIT_LIMIT' | 'PASTE_UNREADABLE' | 'PASTE_AMBIGUOUS_DECIMAL' | 'PASTE_BRACKETS'

export const ERROR_TEXT: Readonly<Record<ErrorCode, string>> = {
  DIVIDE_BY_ZERO: 'Cannot divide by zero',
  NUMBER_TOO_LARGE: 'Number too large',
  NUMBER_TOO_SMALL: 'Number too small',
}

export const NOTICE_TEXT: Readonly<Record<NoticeCode, string>> = {
  DIGIT_LIMIT: '15 digits maximum',
  PASTE_UNREADABLE: "Couldn't read that as a number",
  PASTE_AMBIGUOUS_DECIMAL: 'Unclear which mark is the decimal point',
  PASTE_BRACKETS: 'Use a minus sign for negative numbers',
}

export const FAULT_TEXT =
  'Something went wrong inside the calculator. It was not caused by anything you entered. Your tape and memory are kept. Press C or Escape to start again.'
