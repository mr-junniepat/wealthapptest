// src/TransactionHistory.js
import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { ListItem, Left, Right, Thumbnail, Text } from 'native-base';
import axios from 'axios';
import AuthContext from '../AuthContext';
import { useRoute } from '@react-navigation/native';
import FixedColumnTable from "../components/TablulateData";

const TransactionHistory = () => {
  const { user, portfolioInfo, setPortfolioInfo, transactions, setTransactions } = useContext(AuthContext);
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { itemId, itemName } = route.params;

  const fetchTransactionHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://casestudy-api-1.accesswealth.io/api/transactions/search?securityIds=${itemId}&portfolioIds=1&`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTransactionsData(response.data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);



  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
            {transactionsData === null ? <Text> Data loading... </Text> :  <FixedColumnTable data={transactionsData} itemName={itemName} />}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});

export default TransactionHistory;
