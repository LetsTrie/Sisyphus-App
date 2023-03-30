import logger from '../config/logger';
import { ToastAndroid } from 'react-native';

const errorLog = (message) => {
  logger.error(message);
  // ToastAndroid.showWithGravity(
  //   message,
  //   ToastAndroid.SHORT,
  //   ToastAndroid.CENTER,
  // );
};

export { errorLog };
