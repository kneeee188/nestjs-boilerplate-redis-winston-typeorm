export abstract class ILoggerService {
  getNow: () => void;
  info: (data) => void;
  error: (err) => void;
}
