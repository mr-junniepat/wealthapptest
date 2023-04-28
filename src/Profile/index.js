import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { VStack, HStack, Divider, Box } from 'native-base';
import AuthContext from '../AuthContext';
import axios from 'axios';
import { useFonts } from 'expo-font';

import { Ionicons } from '@expo/vector-icons'; 


export default function Profile() {
    const [fontsLoaded] = useFonts({
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/fonts/Lato-Bold.ttf'),
    });

    const userData = {
        portfolio: {
          id: 1,
          name: 'Portfolio Smith 1',
          uniqueId: 'a40a4493-871a-48cb-8982-4e69eb2e16b0',
          investor: {
            id: 1,
            name: 'Steve Smith',
            uniqueId: '04fc36e7-6525-491f-935f-556a351e4bc2',
            currencyCode: 'AED',
          },
        },
        portfolioCount: 3,
        language: 'English',
      };

    const { user, portfolioInfo, setPortfolioInfo } = useContext(AuthContext);
    const { portfolio, portfolioCount, language } = userData;
    const { investor } = portfolioInfo;
    return (
        <Box border="1" borderRadius="md">
            <VStack space="4" divider={<Divider />}>
                <HStack px="4" pt="4">
                    <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={{ width: 50, height: 50, borderRadius: 75 }}
                    />
                    <Text fontWeight="bold" fontSize="20px" style={{ fontFamily: 'Lato-Regular' }}>{portfolioInfo?.portfolio?.investor?.name || "user"}</Text>
                </HStack>
                <Box px="4">
                    <Text>Portfolio Count: {portfolioCount}</Text>
                    <Text color="#fff" style={{ fontFamily: 'Lato-Regular' }}> Currency: ({portfolioInfo?.portfolio.investor?.currencyCode || "USD"})</Text>
                    <Text>Language: {language}</Text>
                </Box>
                <Box px="4" pb="4">
                    
                </Box>
            </VStack>
      </Box>
    )
}