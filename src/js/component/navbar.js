import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";




export const Navbar = () => {
	const { store, actions } = useContext(Context)
	//let [favoritesList, updatedFavList] = useState(["Luke Skywalker", "R2-D2", "Darth Vader"]);

	// const deleteTask = (index) => {
	// 	let arregloTemporal = favoritesList.slice() //copiar el estado lista
	// 	arregloTemporal = arregloTemporal.filter((item, index2) => { return index2 != index }) //devuelve todos los elementos con indice diferente al del elemento al que se le dio click
	// 	updatedFavList(arregloTemporal)
	// };


	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<div className="container"> {/*se pone container para generar margen a los lados*/}
				<Link to="/">
					<span className="navbar-brand mb-0"><img className="mb-2" style={{ height: "90px" }} src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png" ></img></span>
				</Link>

				<div className="ml-auto">
					<div className="dropdown">
						<a className=" border-2 btn btn-outline-light mb-2" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "14px" }}>
							Favorites {store.favorites.length}
						</a>

						<ul className="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownMenuLink" style={{ width: "200px" }}>

							<>{ //recordar agregar siempre el elemento key para .map
								store.favorites.map((item, index) => {
									{
										return (<li key={item._id}>
											<div className=" fav-hover  dropdown-item ">
												<div className=" fav-hover d-flex justify-content-between" >{item.properties?.name}
													<button className="button-hover" style={{ border: "none", backgroundColor: "white" }} onClick={() => { actions.deleteTask(item._id) }} type="button" >
														<i className="fa fa-trash " style={{ color: "gray" }}></i>
													</button></div>
											</div>
										</li>)
									}
								})
							}</>

						</ul>
					</div>
				</div>

			</div>

		</nav>
	);
};
