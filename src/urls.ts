const baseUrl: string = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://localhost:8000';

export const ACTION_CARD_URL = `${baseUrl}/actioncards/`;
export const LATEST_ACTION_CARD_URL = `${baseUrl}/actioncards/latest/`
export const ACTION_URL = `${baseUrl}/actions/`;
export const SURVEY_RESPONSE_URL = `${baseUrl}/surveyresponses/`;
export const USER_SURVEY_RESPONSE_URL = `${baseUrl}/surveyresponses/user/`;
export const SIGN_IN_URL = `${baseUrl}/token/`;
export const SIGN_OUT_URL = `${baseUrl}/rest-auth/louout/`;
export const CURRENT_USER_URL = `${baseUrl}/user/`;