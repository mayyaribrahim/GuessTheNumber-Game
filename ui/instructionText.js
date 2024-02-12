import { Text, StyleSheet } from "react-native";

function InstructionText ({children, style}){
  return <Text style={[style, styles.instructionText ]}>{children}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color:'#ddb52f',
    fontSize: 24,
  },
});

