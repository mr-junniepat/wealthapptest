import React from 'react';
import { ScrollView, FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { ListItem, Left, Box, Right, Thumbnail, Text } from 'native-base';
import DataTable from 'react-native-datatable-component';

const FixedColumnTable = ({ data, itemName }) => {

  // Extract headers
  const headers = [
    'Date', 'Type', 'Qty', 'Amount', 'currency', 'currencyunit',
     'NetAmount', 'Total'
  ];



  const tableData =  data.content?.map(item => ({
    Date: item.tradeDate,
    Type: item.trxType,
    Qty: item.qty,
    Amount: item.grossAmount.toFixed(2),
    currency: item.securityCurrencyCode,
    currencyunit: item.priceInSecurityCurrency.toFixed(2),
    NetAmount: item.netAmountInSecurityCurrency,
    Total: item.grossAmountInSecurityCurrency,
}));




  return (
    <Box p={2}>
        <Box style={{ marginBottom: 10 }}>
            <Text>Transaction History: </Text>
            <Text fontSize="30px">{itemName}</Text>
        </Box>
        
        <View style={styles.container}>
            <ScrollView horizontal>
                <View style={{ borderWidth: 1, borderColor: '#f2f2f2' }}>
                    <DataTable
                        headerLabelStyle={{ color: 'grey', fontSize: 12 }} 
                        backgroundColor="#ffffff"
                        data={tableData}
                        colNames={headers}
                        noOfPages={10}
                    />
                </View>
            </ScrollView>
        </View>

    </Box>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    fixedColumn: {
      position: 'absolute',
      left: 0,
      zIndex: 1
    },
    headerRow: {
      backgroundColor: '#f1f8ff',
      borderBottomWidth: 1,
      borderColor: '#ccc'
    },
    row: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderColor: '#ccc'
    },
    cellText: {
      fontSize: 12
    }
});





export default FixedColumnTable;
