import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {Dimensions, Animated} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/Feather';

const {width} = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const RowContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const IconBase = styled(Icon).attrs({size: 50, color: 'black'})``;

const IconTop = styled(IconBase).attrs({name: 'arrow-up'})`
  margin-bottom: 24px;
`;

const IconBottom = styled(IconBase).attrs({
  name: 'arrow-down',
})`
  margin-top: 24px;
`;

const Image = styled(Animated.Image)`
  width: ${width * 0.5}px;
  height: ${width * 0.5}px;
`;

const Input = styled.TextInput`
  elevation: 2;
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  padding: 8px;
  font-size: 18px;
`;

const App = () => {
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const [imageUrl, setImageUrl] = useState(
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Forange-kitten-955480082-2000.jpg',
  );

  scaleX.addListener((value) => console.log('value', value));
  scaleY.addListener((value) => console.log('value', value));

  const setScale = (position) => {
    if (position === 'x') {
      Animated.timing(scaleX, {
        toValue: scaleX._value === 1 ? -1 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.timing(scaleY, {
      toValue: scaleY._value === 1 ? -1 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container>
      <Input
        placeholder="Insert a image url here..."
        onChangeText={(text) => text && setImageUrl(text)}
      />
      <IconTop onPress={() => setScale('y')} />
      <RowContainer>
        <IconBase name="arrow-left" onPress={() => setScale('x')} />
        <Image
          style={{
            transform: [
              {
                scaleX,
              },
              {
                scaleY,
              },
            ],
          }}
          source={{
            uri: imageUrl,
          }}
        />
        <IconBase name="arrow-right" onPress={() => setScale('x')} />
      </RowContainer>
      <IconBottom onPress={() => setScale('y')} />
    </Container>
  );
};

export default App;
