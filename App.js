import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion'
import axios from 'axios'


const App = () => {

	// Declaramos nuestros States
	const [ moneda, guardarMoneda ] = useState('');
	const [ criptomoneda, guardarCriptomoneda ] = useState('')
	const [ consultarAPI, guardarConsultarAPI] = useState(false)
	const [ resultado, guardarResultado ] = useState({})
	const [ cargando, guardarcargando ] = useState(false)


  useEffect( () => {
		const cotizarCriptomoneda = async () => {
			if(consultarAPI){
				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`		//Concatenamos nuestros states de criptomonedas y moneda
				const resultado = await axios.get(url)
				guardarcargando(true)

				// Agregamos un retraso de 3 segundos para mostrar el spinner
				setTimeout(() => {
					guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
					guardarConsultarAPI(false)
					guardarcargando(false)
				}, 3000)
			}
		}

		cotizarCriptomoneda()

	}, [consultarAPI])

	// Hacemos la validación de que se muestre el Spinner
	const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2"/> : <Cotizacion resultado={resultado} />

	return (
		<>  
			<Header />

			<Image
				style={styles.image}
				source={ require('./assets/img/cryptomonedas.png') }
			/>
			<ScrollView>
				<View style={styles.contenido}>
					<Formulario 
						moneda={moneda}
						criptomoneda={criptomoneda}
						guardarMoneda={guardarMoneda}
						guardarCriptomoneda={guardarCriptomoneda}
						guardarConsultarAPI={guardarConsultarAPI}
					/>
				</View>
				<View style={{ marginTop: 25 }}>
					{componente}
				</View>

			
				
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: "20%",
		marginHorizontal: "2.5%",
		marginTop: -30
	},
	contenido: {
		marginHorizontal: "2.5%"
	}
});


export default App;
