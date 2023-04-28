// src/LoginForm.js
import React, { useContext, useState } from 'react';
import { Box, VStack, Input, Button, Icon, Text, Heading, FormControl, Pressable } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from '../AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
      });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://casestudy-api-1.accesswealth.io/api/authenticate',
        { username: email, password }
      );

      console.log("response", response)
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data);
        navigation.navigate('HomeStack', { screen: 'Home' });
      }
    } catch (error) {
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Error occurred while logging in'
      );
    }
  };

  return (
    <Box flex={1} p={4} style={{ fontFamily: 'Lato-Regular' }}>
      <VStack space={4}>
        <Heading marginTop="180px" marginBottom="-5px" style={{ fontFamily: 'Lato-Regular' }}>Hi, Welcome Back!</Heading>
        <Text color="#555" style={{ fontFamily: 'Lato-Regular' }}>Hey, you've been missed</Text>

            <FormControl w="100%" marginTop="60px">
                <FormControl.Label style={{ fontFamily: 'Lato-Regular' }}>Username</FormControl.Label>
                <Input placeholder="Email"
                 h="50px"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => setEmail(value)} />
            </FormControl>

            <FormControl w="100%">
                <FormControl.Label  style={{ fontFamily: 'Lato-Regular' }}>Password</FormControl.Label>
                <Input
                placeholder="Password"
                type="password"
                h="50px"
                value={password}
                onChangeText={(value) => setPassword(value)}
                type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" 
                />
            </FormControl>

        {errorMessage && (
          <Text color="red.500" textAlign="center">
            {errorMessage}
          </Text>
        )}

        <Button h="50px" marginTop="20px" background="#1573FE" style={{ fontFamily: 'Lato-Regular', fontSize: '15px' }} onPress={handleLogin}>Login</Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
