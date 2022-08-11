import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			// En caso de que el usuario refresque la pagina se mantiene su sesión abierta
			// usando sessionStorage, y solo se cerrara cuando decida cerrar sesión o cuando
			// salga del navegador.
			if (sessionStorage.getItem('user')){
				state.actions.loginRemember();
			}
			// Almacena todos los cambios que haga el usuario en su session storage
			// Otros usuarios no podran ver las modificaciones, pero servira para 
			// mostrar el funcionamineto de la pagina
			if (sessionStorage.getItem('users')){
				state.actions.loadChanges('users');
			}
			if (sessionStorage.getItem('posts')){
				state.actions.loadChanges('posts');
			}
			if (sessionStorage.getItem('comments')){
				state.actions.loadChanges('comments');
			}
			if (sessionStorage.getItem('hashtags')){
				state.actions.loadChanges('hashtags');
			}
			if (sessionStorage.getItem('profiles')){
				state.actions.loadChanges('profiles');
			}
		}, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
