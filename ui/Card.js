import { StyleSheet, View, Dimensions } from "react-native";


function Card ({children}) {
  return (
    <View style={styles.card}>{children}</View>
  )
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    backgroundColor: '#3b021f',
    borderRadius: 8,
    //shadows in android:
    elevation: 4,
    //shadows in ios:
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});