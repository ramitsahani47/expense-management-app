import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import CustomButton from "../components/CustomButton";




export default function AddExpenseScreen() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");


    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
            />
            
            <CustomButton
                title="Save Expense"
                onPress={() => {
                   Alert.alert("Success", "Expense Added Successfully");
                }}
            />
      </View>
    );
};


const styles = StyleSheet.create(({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:'#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 10,
        marginBottom:15
    }
}))