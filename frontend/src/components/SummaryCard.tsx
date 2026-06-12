

import { View, Text, StyleSheet } from "react-native";



interface SummaryCardProps {
    total: number;
};


export default function SummaryCard({ total }: SummaryCardProps) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Total Expenses</Text>
        <Text style={styles.amount}>₹{total}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: "#2563EB",
        padding: 20,
        borderRadius: 16,
       marginBottom:20
    },
    label: {
        color: '#fff',
        fontSize:14
    },
    amount: {
        color: '#fff',
        fontSize: 30,
        fontWeight: "bold",
        marginTop:5
    }
});