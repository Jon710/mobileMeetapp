import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import Button from '~/components/Button';
import { Container, Banner, Info, Title, InfoRow, InfoText } from './styles';

export default function Meetup({ data, handleRegister }) {
  return (
    <Container>
      <Banner source={{ uri: data.File && data.File.url }} />
      <Info>
        <Title>{data.title}</Title>
        <InfoRow>
          <Icon name="event" size={15} color="#999" />
          <InfoText>
            {format(parseISO(data.date), "dd/MM/Y - HH'h'mm")}
          </InfoText>
        </InfoRow>
        <InfoRow>
          <Icon name="location-on" size={15} color="#999" />
          <InfoText>{data.location}</InfoText>
        </InfoRow>
        <InfoRow last={!data.past}>
          <Icon name="person" size={15} color="#999" />
          <InfoText>Organizador: {data.User.name}</InfoText>
        </InfoRow>
        {handleRegister && !data.past && (
          <Button onPress={handleRegister}>Inscrever</Button>
        )}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    past: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    File: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleRegister: PropTypes.func,
};

Meetup.defaultProps = {
  handleRegister: null,
};
