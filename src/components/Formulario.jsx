import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({
	guardarMoneda,
	guardarCriptomoneda,
}) => {
	// state de listado de criptomonedas
	const [listacripto, guardarCriptomonedas] = useState([]);
	const [error, guardarError] = useState(false);

	const MONEDAS = [
		{ codigo: 'USD', nombre: 'Dolar Americano' },
		{ codigo: 'MXN', nombre: 'Peso mexicano' },
		{ codigo: 'EUR', nombre: 'Euro' },
		{ codigo: 'GBP', nombre: 'Libra esterlina' },
	];

	const [moneda, SelectMonedas] = useMoneda(
		'Elige tu moneda',
		'',
		MONEDAS
	);

	const [criptomoneda, SelectCripto] = useCriptomoneda(
		'Elige tu criptomoneda',
		'',
		listacripto
	);

	// Ejecutar API
	useEffect(() => {
		const consultarAPI = async () => {
			const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
			const resultado = await axios.get(url);
			guardarCriptomonedas(resultado.data.Data);
		};
		consultarAPI();
	}, []);
	const cotizarMoneda = e => {
		e.preventDefault();

		if (moneda === '' || criptomoneda === '') {
			guardarError(true);
			return;
		}

		guardarError(false);
		guardarMoneda(moneda);
		guardarCriptomoneda(criptomoneda);
	};

	return (
		<form onSubmit={cotizarMoneda}>
			{error ? (
				<Error mensaje='Todos los campos son obligatorios' />
			) : null}
			<SelectMonedas />
			<SelectCripto />
			<Boton type='submit' values='Calcular' />
		</form>
	);
};

export default Formulario;
