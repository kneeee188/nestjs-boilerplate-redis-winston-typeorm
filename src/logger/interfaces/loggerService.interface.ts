export abstract class ILoggerService {
  getNow: () => void;
  info: (data) => void;
}
