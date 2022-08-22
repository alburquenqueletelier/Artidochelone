const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      // login: null,
      user: null,
      // admin debiese venir como atributo de usuario pero se usa esto temporlamente
      admin: true,
      imageData: {},
      profile: null,
    },
    actions: {
      // Crear nuevo usuario
      postRegister: async (data) => {
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        await fetch(process.env.BACKEND_URL + "/api/register", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: raw
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            alert("Successfully registered");
          })
          .catch((error) => console.log("error !!!", data, error));
      },
      // login fetch
      login: async (event, user, pass) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          cors: "no-cors",
          body: JSON.stringify({
            username: user,
            password: pass,
          }),
        };
        await fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // deberia guardar toda la info de user que esta en el serializador
            console.log(data);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", JSON.stringify(data.token));
            return setStore({ user: data.user, token:data.token });
          })
          .catch((error) => console.log("mensaje error: ", error));
      },
      loginRemember: () => {
        setStore({
          user: JSON.parse(sessionStorage.getItem("user")),
          token: JSON.parse(sessionStorage.getItem("token"))                  
      })
    },
      logout: () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        return setStore({ user: null });
      },
      // Crear post (requiere usuario autentificado)
      post: async (e, file, title, description = null) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("upload_preset", "artidochelone");

        // console.log('file: ', file)
        // fetch a cloudinary para subir la imagen.
        await fetch("https://api.cloudinary.com/v1_1/baal1992/image/upload", {
          method: "POST",
          // mode: 'no-cors',
          // headers: myHeaders,
          body: formdata,
        })
          .then((res) => res.json())
          .then((data) => {
            // Fetch a la API interna para guardar la info del post

            // guardamos la respuesta
            setStore({ imageData: data });
            // imageData.url
            // console.log(imageData);
          })
          // .then(()=>{
          //   const {imageData} = getStore();
          //   console.log(imageData);
          // })
          .catch((error) => console.log(error));

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const { imageData } = getStore();

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            image: imageData.url,
            title: title,
            description: description,
          }),
        };
        // segunda api
        // console.log("url: ", imageData.url, "type", typeof imageData.url);
        // console.log("requestopti: ", requestOptions);
        await fetch(process.env.BACKEND_URL + "/api/post", requestOptions)
          .then((response) => {
            console.log("pase por response");
            return response.json();
          })
          .then((data) => {
            return console.log(data);
          })
          .catch((error) => console.log("mensaje error: ", error));
        // console.log("fileUp: ", e.target.fileUp.value);
        // console.log("title: ", e.target.title.value);
        // console.log("description: ", e.target.description.value);
        // console.log("file", file)
      },

      getProfile: async()=>{
        const response = await fetch(process.env.BACKEND_URL + "/api/profile");
        const profile = await response.json()
        return profile
      }
      ,
      getAllUsers: async()=>{
        const response = await fetch(process.env.BACKEND_URL + "/api/alluser");
        const users = await response.json()
        return users
      },
      getUserProfile: async(id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/profile/"+id);
        const user = await response.json()
        setStore({profile:user})
        return user
      }
      // Hasta aca son las funciones, OJO !
    },
  };
};

export default getState;
