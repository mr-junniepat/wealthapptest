// src/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Box, Text, VStack, HStack, Card, Image, Avatar } from 'native-base';
import AuthContext from '../AuthContext';
import axios from 'axios';
import {Dimensions} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


const Home = () => {
    const { user, portfolioInfo, setPortfolioInfo } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] =  useState("");



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


  const renderItem = ({ item }) => (
    <Card style={{ ...styles.card, backgroundColor: getRandomColor() }}>
      <VStack>
        <HStack>
          <Image source={{ uri: item.security?.logoUrl }} alt={item.security?.name} width="50px" height="50px" marginRight="10px" />
            <VStack>
                <Text fontWeight="bold">{item.security?.symbol}</Text>
                <Text>{formatCurrency((item?.marketPrice * 3.67).toFixed(1))}</Text>
            </VStack>
        </HStack>
      </VStack>
    </Card>
  );


  return (
    <Box flex={1} p={4}>
        
        <HStack marginBottom="20px">
            <Avatar bg="green.500" source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }} />
            <Box marginLeft="10px">
                <Text>Hello</Text>
                <Text fontWeight="bold" marginTop="-6px" fontSize="20px">{portfolioInfo?.portfolio?.investor?.name || "----"}</Text>
            </Box>
        </HStack>

        <Box backgroundColor="#289BF6" marginBottom="20px" padding="15px" borderRadius="10px">
            <Text color="#fff" marginBottom="3px">My balance</Text>
            <Text color="#fff" fontSize="25px" fontWeight="bold">{formatCurrency(portfolioInfo?.marketValue || "000")}</Text>
            <Text color="#fff" marginBottom="7px">Valuation Currency ({portfolioInfo?.currencyCode || "USD"})</Text>
            
        </Box>


    <Box>
        <HStack> 
            <Text fontSize="lg" mb={4} fontWeight="bold">My portfolio</Text>
        </HStack>
        <FlatList
            style={{ height: 100 }}
            data={portfolioInfo?.securityValuations}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    </Box>

    <Box marginTop="20px">
    <Text fontSize="lg" mb={4} fontWeight="bold">Stock Chart</Text>
        <LineChart
            data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
                {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#289BF6",
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(40, 155, 246, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#EAF6FF"
            }
            }}
            bezier
            style={{
            borderRadius: 5
            }}
        />
    </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    width: 170,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Home;

