import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  background: #402845;
  flex: 1;
`;

export const DateSelect = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const DateButton = styled(TouchableOpacity)``;

export const DateText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin: 0 15px;
`;

export const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: #333;
  margin-top: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
