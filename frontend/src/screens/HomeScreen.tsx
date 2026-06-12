import { useState } from "react";
import { Text, View, Button, StyleSheet, FlatList } from "react-native";
import ExpenseCard from "../components/ExpenseCard";
import { Expense } from "../types/expense";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import SummaryCard from "../components/SummaryCard";



type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList , "Home">;



export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const expense: Expense[] = [
    {
      id: "1",
      title: "Pizza",
      amount: 500,
      category: "Food",
    },
    {
      id: "2",
      title: "Uber",
      amount: 200,
      category: "Travel",
    },
    {
      id: "3",
      title: "Movie",
      amount: 300,
      category: "Entertainment",
    },
  ];

  const totalExpenses = expenses.reduce((sum,expense) => sum + expense.amount ,0)
  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text
        style={styles.header}
      >
        Expense Tracker
      </Text>
      <SummaryCard total={totalExpenses} />

      <CustomButton
        title="Add Expense"
        onPress={() => navigation.navigate("AddExpense")}
      />

      <Text style={styles.sectionTitle}>Recent Expeses</Text>

      <FlatList
        data={expense}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseCard expense={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
  },
});