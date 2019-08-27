export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure(data) {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
    payload: { data },
  };
}

export function updateMeetupSuccess(meetup) {
  return {
    type: '@user/UPDATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function updateMeetupRequest(id) {
  console.tron.log('action', id);

  return {
    type: '@user/UPDATE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function updateDetailsSuccess(meetup) {
  return {
    type: '@user/UPDATE_DETAILS_SUCCESS',
    payload: { meetup },
  };
}

export function updateDetailsRequest(meetup) {
  return {
    type: '@user/UPDATE_DETAILS_REQUEST',
    payload: { meetup },
  };
}

export function updateDetailsFailure(meetup) {
  return {
    type: '@user/UPDATE_DETAILS_FAILURE',
    payload: { meetup },
  };
}

export function updateMeetupFailure(meetup) {
  return {
    type: '@user/UPDATE_MEETUP_FAILURE',
    payload: { meetup },
  };
}
