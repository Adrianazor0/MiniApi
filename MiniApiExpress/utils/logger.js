import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(timestamp(
    timestamp({
        format: 'yyyy-MM-dd' + 'HH:mm:ss', // 2022-01-25 03:23:10.350 PM
    })
  ), json()),
  transports: [
        new winston.transports.File({
        filename: 'logs.txt',
        }),
    ],
    
});

export default logger;
