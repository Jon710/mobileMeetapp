import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';

import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';

import {
  Container,
  DateSelect,
  DateButton,
  DateText,
  Empty,
  List,
} from './styles';
import api from '~/services/api';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadMeetups(selectedPage = 1) {
    if (selectedPage > 1 && !hasMore) return;

    const response = await api.get('meetups', {
      params: { date, page: selectedPage },
    });
    console.tron.log('teste', response.data);
    setMeetups(response.data);
    console.tron.log('hehe', meetups);
    setMeetups(
      selectedPage > 1
        ? [...meetups, ...response.data.rows]
        : response.data.rows
    );
    console.tron.log('hehe', meetups);

    setHasMore(response.data.total_pages > selectedPage);
    setPage(selectedPage);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMeetups();
    }
  }, [isFocused, date]); // eslint-disable-line

  function handleSubDate() {
    setDate(subDays(date, 1));
  }

  function handleAddDate() {
    setDate(addDays(date, 1));
  }

  async function handleRegister(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('Success', 'Inscrito!');
    } catch (error) {
      Alert.alert('Error', 'Erro ao se inscrever.');
    }
  }

  return (
    <>
      <Container>
        <DateSelect>
          <DateButton onPress={handleSubDate}>
            <Icon name="chevron-left" size={25} color="#984cc7" />
          </DateButton>
          <DateText>{format(date, 'dd/MM/Y')}</DateText>
          <DateButton onPress={handleAddDate}>
            <Icon name="chevron-right" size={25} color="#984cc7" />
          </DateButton>
        </DateSelect>

        {loading && <Loading />}

        {!loading &&
          (meetups.length ? (
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  data={item}
                  handleRegister={() => handleRegister(item.id)}
                />
              )}
              onRefresh={loadMeetups}
              refreshing={refreshing}
              onEndReached={() => loadMeetups(page + 1)}
              onEndReachedThreshold={0.2}
            />
          ) : (
            <Empty>
              <Icon name="event-busy" size={45} color="rgba(0, 0, 0, .15)" />
            </Empty>
          ))}
      </Container>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
