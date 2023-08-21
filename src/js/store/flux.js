const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			characters: [],
			planets: [],
			favorites: [],
			urlBase: "https://www.swapi.tech/api",
			//Aqui estan todos los estados globales de la aplicacion
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			],
			//estado persona
			persona: { nombre: "Adriana" }
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => { //es para acceder a una accion en particular, con getActions se accede a todas
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore(); //aqui se obtiene todo el store de "demo"

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ ...store, demo: demo }); //se hace esto para no perder a persona
			},
			setPersona: () => {
				let store = getStore() //obtenemos los estados contenidos en estado store con getStore
				let actions = getActions()
				let alexis = actions.loadSomeData()
				let maria = { nombre: "Maria", edad: 22 }
				setStore({ ...store, persona: maria }) //spread, mantener elementos viejos y cambiar el que nos interesa
			},
			fetchGenerico: async (path, method = "GET", data = null) => { //fetch tiene dos elementos: url y un objeto
				const BASE_URL = process.env.BASE_URL
				let url = BASE_URL + path

				let obj = {
					method: method,
					headers: {
						"Content-Type": "appication/json"
					},
					body: JSON.stringify(data)
				}

				if (method == "GET") {
					obj = {
						method: method,
						headers: {
							"Content-Type": "appication/json"
						}
					}
				}

				let response = await fetch(url, obj)

				//response.ok == True significa que la respuesta tiene status 200-299
				if (response.ok) {
					let responseObj = await response.json() //transformar esa respuesta toma tiempo entonces se pone await. Tranformacion de la promesa en json a objeto en javascript
					return responseObj, true
				} else {
					let responseObj = await response.json()
					alert("Hubo un error en la peticion" + response.statusText)
					return responseObj, false
				}
			},
			getCharacters: () => {
				fetch(`${getStore().urlBase}/people`)
					.then((response) => response.json())
					.then((data) => {
						for (let item of data.results) {
							fetch(item.url)
								.then((response) => response.json())
								.then((data) => {
									setStore({
										characters: [...getStore().characters, data.result]
									})
								}).catch((err) => {
									console.log(err)
								})
						}
					}
					).catch((err) => {
						console.log(err)
					})
			},
			getPlanets: () => {
				fetch(`${getStore().urlBase}/planets`)
					.then((response) => response.json())
					.then((data) => {
						for (let item of data.results) {
							fetch(item.url)
								.then((response) => response.json())
								.then((data) => {
									setStore({
										planets: [...getStore().planets, data.result]
									})
								}).catch((err) => {
									console.log(err)
								})
						}
					}
					).catch((err) => {
						console.log(err)
					})
			},

			addFavorite: (fav) => {
				let store = getStore()
				let verifyFav = store.favorites.some((item) => item._id == fav._id)
				if (verifyFav) {
					let newFavorites = store.favorites.filter((item) => item._id != fav._id)
					setStore({
						favorites: newFavorites
					})
					console.log("Debo borrar")
				} else {
					setStore({
						favorites: [...store.favorites, fav]
					})
				}
			},

			deleteTask: (id) => {
				let store = getStore()
				console.log(id)
				let newFavorites = store.favorites.filter((item) => item._id != id)
				setStore({
					favorites: newFavorites
				})
			}

		}
	};
};

export default getState;
