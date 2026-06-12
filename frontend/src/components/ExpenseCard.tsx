import { StyleSheet, Text, View } from "react-native";

import { Expense } from "../types/expense";

interface Props {
  expense: Expense;
}

export default function ExpenseCard({ expense }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.category}>{expense.category}</Text>
      <Text style={styles.amount}>{expense.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create(({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation:3
  },
  title: {
    fontSize: 18,
    fontWeight:'600'
  },
  category: {
    color: '#666',
    marginTop:4
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:8
  }
}))
