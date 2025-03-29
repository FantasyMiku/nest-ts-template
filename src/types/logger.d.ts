import type { TransformableInfo } from 'logform';

type ErrorLog = TransformableInfo & {
  level: 'error';
  stack: Array<string | undefined>;
};

type NonErrorLog = TransformableInfo & {
  level: Exclude<string, 'error'>;
  stack?: never; // 非 error 时 stack 不可传入
};

export type LoggerInfo = ErrorLog | NonErrorLog;
