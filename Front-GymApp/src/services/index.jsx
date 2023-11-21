//conexión con el servidor para traer la información de las actividades
export const getAllActivitiesServices = async (token, searchParams) => {
	const response = await fetch(
		`${import.meta.env.VITE_APP_BACKEND}/activities?${searchParams.toString()}`,{
			method: 'GET',
			headers: {
				Authorization: token,
			},
		}
	);

	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

//conexión con el servidor para traer la información de la actividad
//añadir aqui un header , hacer el fetch igual que la función de abajo, getuserdatasevices, modf. la ruta. 
export const getSigleActivityService = async (id, token) => {
	const response = await fetch(
		`${import.meta.env.VITE_APP_BACKEND}/activity/${id}`,
	
 {
	method: 'GET',
	headers: {
	Authorization: token,
	},
 }
);
	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

//Se actualiza la ruta a la correspondiente a editar coincidiendo con la del back
export const editActivityService = async (id, data, token) => {
	console.log('token', token);
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/activity/${id}`, {
		method: 'PUT',
		headers: {
			Authorization: token,
		},
		body: data,
	});

	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

//Se borra una activity por su id
export const deleteActivityService = async (id, token) => {
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/activity/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};
//Se le da like a una activity por su id
export const likeActivityService = async (id, token) => {
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/activity/${id}/like`, {
		method: 'POST',
		headers: {
			Authorization: token,
		},
	});
	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

//Obtener la lista de actividades favoritas de un usuario
export const getUserFavoritesActivitiesService = async (token) => {
	const response = await fetch(
		`${import.meta.env.VITE_APP_BACKEND}/activities/user`, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		}
	);

	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

//conexión con el servidor para el login del usuario
export const loginUserServices = async (email, password) => {
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}

	return json.data;
};
// Añadir Registro de usuarios

export const registerUserService = async (user) => {
	console.log(`${import.meta.env.VITE_APP_BACKEND}`);
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});
	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
};

export const getUserDataService = async ({ token }) => {
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/User`, {
		headers: {
			Authorization: token,
		},
	});

	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

export const addActivityService = async (data, token) => {
	console.log('token', token);
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/activity`, {
		method: 'POST',
		headers: {
			Authorization: token,
		},
		body: data,
	});

	const json = await response.json();
	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};
