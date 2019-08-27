import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@user/UPDATE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@user/LOCATE_MEETUP_REQUEST': {
        draft.meetup = action.payload.id;
        break;
      }
      case '@user/UPDATE_DETAILS_REQUEST': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@user/UPDATE_DETAILS_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
