import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View,ImageBackground,Image} from 'react-native';
import Rain from './assets/images/chuva.jpg'
import Clear from './assets/images/limpo.jpg'
import Clouds from './assets/images/nublado.jpg'
import Snow from './assets/images/Snowy.jpg'
import Drizzle from './assets/images/splash.jpg'
import Thunderstorm from './assets/images/Storm.jpg'
import axios from 'axios';

export default function App() {

  const [backGround,setBackGround] = useState(Clear);
  
  const [data, setData] = useState({});
  const [local, setLocal] = useState('');
  const apiKey = `d5579d3776be14b967cb5539c2795b27`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${local}&units=metric&appid=${apiKey}`

  const getLocalData = (event) => {
      axios
      .get(url)
      .then((response) => {
        setData(response.data)
        identificaTempo()
        setLocal("")
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(String(data
          ));
      })
    };

    function identificaTempo() {
      switch(data.weather[0].main){
        case "Clear": setBackGround(Clear);
        break;
        case "Rain": setBackGround(Rain);
        break;
        case "Drizzle": setBackGround(Drizzle);
        break;
        case "Clouds": setBackGround(Clouds);
        break;
        case "Snow": setBackGround(Snow);
        break;
        case "Thunderstorm": setBackGround(Thunderstorm);
        break;
      }
    }
    
  return (
    <ImageBackground source={{uri: backGround }} style={styles.container}>

      {data.name ? <Text style={styles.textLocal}>{data.name}</Text> : <Text style={styles.textLocal}>São Paulo</Text>}


      {data.weather ? <Text style={styles.text}>{data.weather[0].main}</Text> : <Text style={styles.text}>Clear</Text>}

      <View>
      
      {data.main    ? <Text style={styles.text}>{data.main.temp}°</Text> : <Text style={styles.text}>29°</Text>} 

      {data.weather  ? 
      <Image source={{uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}} style={styles.icon}/> : 
      <Image source={{uri: `http://openweathermap.org/img/wn/01d.png`}} style={styles.icon}/>} 
      
      </View>
    
      <TextInput
        style={styles.input}
        value={local}
        onChange={event => setLocal(event.target.value)}
        onSubmitEditing={getLocalData}
        placeholder="Search any city"
      />

      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    width:50,
    height: 50
  },
  text:{
    color: '#fffaff',
  },
  textLocal:{
    fontSize: 50,
    color: '#fffaff',
  },
  input:{
    textAlign: 'center',
    padding: .7,
    width:200,
    color:'#fffaff',
    borderRadius:25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
  


});