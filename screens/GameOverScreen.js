import { Text, View, Image, StyleSheet } from 'react-native';
import Title from "../ui/Title";
import PrimaryButton from '../ui/PrimaryButton';

function GameOverScreen({roundsNumber,userNumber, onStartNewGame}) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>

      <View style={styles.imageContainer}>
        <Image source= {require('../assets/image/success.png')} style={styles.image} />
      </View>
      
      <Text style={styles.summaryText}>
        Your Phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds 
        to guess the number <Text style={styles.highlight}>{userNumber}</Text>
      </Text>

      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>

    </View>
  )
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#3b021f',
    overflow: 'hidden',
    margin: 36,
  },
  image: { 
    width: '100%',
    height: '100%',

  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: '#72063c',
  },
});