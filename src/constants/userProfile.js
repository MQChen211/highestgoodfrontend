export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE'
export const EDIT_USER_PROFILE = 'EDIT_USER_PROFILE'
export const EDIT_FIRST_NAME = 'EDIT_FIRST_NAME'
export const ASSIGN_TEAM_TO_TEAMS_LIST = 'ASSIGN_TEAM_TO_TEAMS_LIST'

export const getUserProfile = data => ({
	type: GET_USER_PROFILE,
	payload: data
})

export const editFirstName = data => ({
	type: EDIT_FIRST_NAME,
	payload: data
})

export const editUserProfile = data => ({
	type: EDIT_USER_PROFILE,
	payload: data
})

export const updateTeamsListActionCreator = (payload) => ({
	type: ASSIGN_TEAM_TO_TEAMS_LIST,
	payload
})