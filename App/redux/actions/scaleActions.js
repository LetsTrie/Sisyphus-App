import { errorLog } from '../../helpers/log';
import { latestScaleUpdate } from '../../services/scale';
import { ASSESSMENT_LIST_RENDER } from './types';

const getLatestProgress = (accessToken) => async (dispatch) => {
  try {
    const data = await latestScaleUpdate(accessToken);
    dispatch({ type: ASSESSMENT_LIST_RENDER, payload: data });
  } catch (error) {
    errorLog(error);
  }
};

export { getLatestProgress };
