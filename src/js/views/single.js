import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom"; //importar hook useParams
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams(); //es un hook que nos ayuda a leer la info de la URL
	/*Paso 3: traernos la variable dinamica definida en el layout.js, :theid */
	//usando params.theid
	//Como en el paso 2 habiamos hecho la navegacion con Link to, usando el indice del arreglo,
	//params.theid tiene relacionado el indice del mismo arreglo
	return (
		<div className="jumbotron">
			<h1 className="display-4">This will show the demo element: {store.demo[params.theid].title}</h1>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};