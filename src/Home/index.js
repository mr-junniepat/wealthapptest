// src/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Card, Image, Avatar, Skeleton } from 'native-base';
import AuthContext from '../AuthContext';
import axios from 'axios';
import {Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TimeSeriesGraph from '../components/FinancialGraph';
import { useFonts } from 'expo-font';

import { Ionicons } from '@expo/vector-icons'; 



const Home = () => {
    const { user, portfolioInfo, setPortfolioInfo } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] =  useState("");
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/fonts/Lato-Bold.ttf'),
    });



  useEffect(() => {
    const fetchPortfolioValuation = async () => {
        try {
          const response = await axios.get(
            'https://casestudy-api-1.accesswealth.io/api/portfolio/valuation?',
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
  
          if (response.status === 200) {
            setPortfolioInfo(response.data);
          }
        } catch (error) {
          console.error('Error fetching portfolio valuation:', error);
        }
      };
  
      fetchPortfolioValuation();

  }, []);


  const getRandomColor = () => {
    const random = () => Math.floor(Math.random() * 256);
    const r = random();
    const g = random();
    const b = random();
    const a = 0.1; // Opacity value between 0 and 1
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED',
    }).format(value);
  };



//   onPress={() => navigation.navigate('HomeStack', { screen: 'Portfolio' })}
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory', { itemId: item.security?.id, itemName: item.security?.name })}>
    <Card paddingTop="15px" paddingBottom="10px" style={{ ...styles.card, backgroundColor: getRandomColor() }}>
      <VStack>
        <HStack>
          <Image source={{ uri: item.security?.logoUrl }} alt={item.security?.name} width="40px" height="40px" marginRight="10px" />
            <VStack>
                <Text fontWeight="bold" style={{ fontFamily: 'Lato-Black' }}>{item.security?.symbol}</Text>
                <Text fontSize="12px" style={{ fontFamily: 'Lato-Regular' }}> {item.security?.name?.substring(0,18)}</Text>
            </VStack>
        </HStack>
        <Text fontWeight="bold" marginTop="15px" marginBottom="10px" fontSize="16px" style={{ fontFamily: 'Lato-Black' }}>{formatCurrency((item?.marketPrice * 3.67).toFixed(1))}</Text>
      </VStack>
    </Card>
    </TouchableOpacity>

  );
  
if (portfolioInfo === null) {
        <Box>
            <Skeleton h="40" rounded="md" startColor="primary.100"/>
            <Skeleton.Text px="4" />
            <Skeleton px="4"  h="90" my="4" rounded="md"  />
        </Box>
}

  return (
    <Box style={styles.box} flex={1} backgroundColor="#ffffff"> 

        <Box backgroundColor="#F5F5F5" p={4}>
            <HStack marginBottom="20px" justifyContent="space-between">
                <HStack>
                    <Avatar bg="green.500" source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }} />
                    <Box marginLeft="10px">
                        <Text style={{ fontFamily: 'Lato-Regular' }}>Hello</Text>
                        <Text fontWeight="bold" marginTop="-6px" fontSize="20px" style={{ fontFamily: 'Lato-Regular' }}>{portfolioInfo?.portfolio?.investor?.name || "user"}</Text>
                    </Box>
                </HStack>
                
                <Box padding="10px"><Ionicons name="notifications-outline" size={24} color="black" /></Box>
            </HStack>

            <Box backgroundColor="#0066FF" marginBottom="20px" padding="15px" borderRadius="10px">
                <Text color="#fff" marginBottom="3px" style={{ fontFamily: 'Lato-Regular' }}>My Total balance</Text>
                <Text color="#fff" fontSize="25px" fontWeight="bold" style={{ fontFamily: 'Lato-Black' }}>{formatCurrency(portfolioInfo?.marketValue || "000")}</Text>
                <Text color="#fff" marginBottom="7px" style={{ fontFamily: 'Lato-Regular' }}>Valuation Currency ({portfolioInfo?.currencyCode || "USD"})</Text>
            </Box>
        </Box>


        <Box p={4}>
            <HStack> 
                <Text fontSize="lg" mb={4} fontWeight="500" style={{ fontFamily: 'Lato-Regular' }}>Portfolio</Text>
            </HStack>
            <FlatList
                style={{ height: 120 }}
                data={portfolioInfo?.securityValuations}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </Box>

    <Box h="400px" p={4}>
        <Text fontSize="lg" mb={4} fontWeight="500" style={{ fontFamily: 'Lato-Regular' }}>Stock Chart</Text>
        <TimeSeriesGraph securityTimeSeries={portfolioInfo && portfolioInfo?.securityTimeSeries} />
    </Box>

    </Box>
  );
};

const styles = StyleSheet.create({
    box: {
        fontFamily: 'Lato-Regular',
    },
    card: {
        marginRight: 10,
        width: 190,
        height: 100,
        justifyContent: 'center',
        fontFamily: 'Lato-Regular'
    },
});

export default Home;

