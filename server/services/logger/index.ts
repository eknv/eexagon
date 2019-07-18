import { createLogger, format, transports } from 'winston'

interface ILoggerService {
  info: any;
}


class LoggerService implements ILoggerService {
  info: any;
  error: any;
  warn: any;
  debug: any;

  constructor() {
    const winstonTransports = [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY/MM/DD HH:mm' }),
          format.printf(
            info => `${info.timestamp} - ${info.level}: ${info.message}`
          )
        ),
      }),
    ]

    const logger = createLogger({
      level: 'info',
      transports: winstonTransports,
      exceptionHandlers: winstonTransports,
    })

    return new Proxy(this, {
      // @ts-ignore
      get: (target:any, propKey:any) => logger[propKey],
    })
  }
}

export const logger = new LoggerService() // Default logger
export { LoggerService }
