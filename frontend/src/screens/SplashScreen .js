import React ,{useEffect} from 'react';
import {View , Image, Text,  StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

const SplashScreen = ({naviagtion}) =>{
  useEffect(()=>{
    const timer = setTimeout(()=>{
      naviagtion.reset ({
        index: 0,
        routes: [{name:'Login'}],
      });
    }, 3000);
    return ()=> clearTimeout(timer);
  }, [naviagtion]);
  return(
    <View style={Styles.container}>
      <View style ={styles.content}>
        <Text style ={styles.title}>CRUSH</Text>
        <Text style={styles.subtitle}>Your goals, one task at a time</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
});

export default SplashScreen;

