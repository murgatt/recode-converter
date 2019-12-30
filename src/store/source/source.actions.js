export const ADD_SOURCE = 'source/ADD_SOURCE';
export const ADD_SOURCES = 'source/ADD_SOURCES';
export const CLEAR_SOURCES = 'source/CLEAR_SOURCES';
export const SET_SOURCES = 'source/SET_SOURCES';

export const clearSources = { type: CLEAR_SOURCES };
// export const setSources = sources => dispatch => dispatch({ sources, type: SET_SOURCES });
export const setSources = sources => ({ sources, type: SET_SOURCES });
