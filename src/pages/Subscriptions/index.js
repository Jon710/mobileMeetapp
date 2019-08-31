import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';

import { Container, List, Empty } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    setLoading(true);

    const response = await api.get('subscriptions');
    console.tron.log('subsc', response.data);

    setSubscriptions(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`/meetups/${id}`);
      Alert.alert('Success', 'Meetup cancelado!');
      loadSubscriptions();
    } catch (error) {
      Alert.alert('Error', 'Erro!');
    }
  }

  return (
    <>
      <Container>
        {loading && <Loading />}

        {!loading &&
          (subscriptions.length ? (
            <List
              data={subscriptions}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  data={item.Meetup}
                  handleCancel={() => handleCancel(item.id)}
                />
              )}
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

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
