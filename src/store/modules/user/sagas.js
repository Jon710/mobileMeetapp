import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
  updateMeetupSuccess,
  updateMeetupFailure,
  updateDetailsSuccess,
  updateDetailsFailure,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso', 'Perfil atualizado!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', 'Verifique seus dados');

    yield put(updateProfileFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { title, description, date, location, ...rest } = payload.data;

    const meetup = {
      title,
      description,
      date,
      location,
      rest,
    };

    const response = yield call(api.put, 'meetups', meetup);

    Alert.alert('Sucesso', 'Meetup atualizado!');

    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    // toast.error('Erro ao atualizar meetup.');
    yield put(updateMeetupFailure());
  }
}

export function* updateDetails({ payload }) {
  try {
    console.tron.log('cade payload', payload);
    const { title, description, date, location, id, ...rest } = payload.data;

    const meetup = {
      title,
      description,
      date,
      location,
      id,
      rest,
    };

    // const response = await api.get(`meetups/${objMeetup.meetup}`);
    const response = yield call(api.put, `meetups/${id}`, meetup);

    Alert.alert('Sucesso', 'Meetup atualizado!');

    yield put(updateDetailsSuccess(response.data));
  } catch (err) {
    // toast.error('Erro ao atualizar meetup.');
    yield put(updateDetailsFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@user/UPDATE_DETAILS_REQUEST', updateDetails),
]);
