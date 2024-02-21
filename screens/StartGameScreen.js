import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import Title from "../ui/Title";
import Card from "../ui/Card";
import InstructionText from "../ui/instructionText";

function StartGameScreen({onPickNumber}) {
  const [enterednumber, setEnterednumber] = useState('');

  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnterednumber(enteredText)
  }

  function resetInputHandler () {
    setEnterednumber('');
  }

  function ConfirmInputHandler() {
    const chosenNumber = parseInt(enterednumber);

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert(
        'Invalid number!',
        'Number has to be between 0 and 99.',
        [{ text: 'okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }

    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}> 

          <Title>Guess My Number</Title>

          <Card>

            <InstructionText>
              Enter A Number
            </InstructionText>

            <TextInput 
              style={styles.numberInput} 
              maxLength={2} 
              keyboardType="number-pad" 
              autoCapitalize="none"
              autoCorrect={false}
              value={enterednumber}
              onChangeText={numberInputHandler}
            />

            <View style={styles.buttonsContainer} >

              <View style={styles.buttonContainer} >
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>

              <View style={styles.buttonContainer} >
              <PrimaryButton onPress={ConfirmInputHandler}>Confirm</PrimaryButton>   
              {/*the onPress here is just a prop and whatever is written after it will go to the actual onPressin primary button*/}
              </View>
            
            </View>

          </Card>

        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    //marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center'
  },
 
 
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f', 
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: "center",
  },
  buttonsContainer:{
    flexDirection: 'row',
  }, 
  buttonContainer:{
    flex: 1,
  }
});