import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({ moneda, criptomoneda, guardarMoneda, guardarCriptomoneda, guardarConsultarAPI  }) => {

    const [ criptomonedas, guardarCriptomonedas ] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const resultado = await axios.get(url)
        console.log(resultado.data.Data)
        guardarCriptomonedas(resultado.data.Data)
             
        }
        consultarAPI()
    }, [])

    // Function para guardar nuestras monedas
    const obtenerMoneda = moneda => { 
        guardarMoneda(moneda)
    }

    // Funcion para obtener las criptomonedas
    const obtenerCriptomoneda = cripto => { 
        guardarCriptomoneda(cripto)
    }

    // validacion de campos llenados para llamar a la API de Consulta de Precio
    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta()
            return
        }
        guardarConsultarAPI(true)
    }

    // Alert con mensaje
    const mostrarAlerta = () => {
        Alert.alert(
            'Error....',
            'Ambos Campos son Obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

    return(
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={ moneda }
                onValueChange={ moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar Americano" value="USD" />
                <Picker.Item  label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue = {criptomoneda}
                onValueChange={  cripto => obtenerCriptomoneda(cripto)  }
                itemStyle={{  height:120 }}
                >
               <Picker.Item label="- Seleccione -" value=''/>
                { (criptomonedas).map( cripto=> ( 
                    <Picker.Item  key={ cripto.CoinInfo.Id } label={ cripto.CoinInfo.FullName } value={ cripto.CoinInfo.Name }/>
                ) ) }
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: "Lato-Black",
        fontSize: 22,
        textTransform: "uppercase",
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: "#5E49E2",
        padding: 10,
        marginTop: 20
    },
    textoCotizar: {
        color: "#FFF",
        fontSize: 18,
        fontFamily: "Lato-Black",
        textTransform: "uppercase",
        textAlign: "center"
    }
});

export default Formulario;