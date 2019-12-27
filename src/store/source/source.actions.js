export const ADD_SOURCE = 'source/ADD_SOURCE';
export const ADD_SOURCES = 'source/ADD_SOURCES';
export const CLEAR_SOURCES = 'source/CLEAR_SOURCES';

export const addSource = source => dispatch => dispatch({ source, type: ADD_SOURCES });
export const addSources = sources => dispatch => dispatch({ sources, type: ADD_SOURCE });
export const clearSources = { type: CLEAR_SOURCES };
