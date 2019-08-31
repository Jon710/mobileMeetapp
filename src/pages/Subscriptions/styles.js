import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #402845;
  flex: 1;
  padding-top: 30px;
`;

export const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
