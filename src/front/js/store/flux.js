const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      // login: null,
      user: null,
      // admin debiese venir como atributo de usuario pero se usa esto temporlamente
      admin: true,
      imageData: {},
      demo: {
        users: [
          {
            id: 1,
            name: "bryan",
            lastname: "alburquenque",
            username: "baal",
            email: "bryan@gmail.com",
            password: "123456",
            admin: true,
          },
          {
            id: 2,
            name: "demian",
            lastname: "hernandez",
            username: "demian",
            email: "demian@gmail.com",
            password: "123456",
            admin: true,
          },
          {
            id: 3,
            name: "lys",
            lastname: "4geeks",
            username: "lys",
            email: "lys@gmail.com",
            password: "123456",
            admin: true,
          },
          {
            id: 4,
            name: "dummy",
            lastname: "dummy",
            username: "dummy",
            email: "dummy@gmail.com",
            password: "123456",
            admin: false,
          },
        ],
        profiles: [
          {
            id: 1,
            name: "bryan",
            photo: "www.link_a_foto.com",
            description: "Bienvenido a mi perfil, disfrutalo!",
            user_id: 1,
          },
          {
            id: 2,
            name: "demian",
            photo: "www.link_a_foto.com",
            description: "Artidochelone principal partnership",
            user_id: 2,
          },
          {
            id: 3,
            name: "lys",
            photo: "www.link_a_foto.com",
            description: "Bienvenido a mi perfil, disfrutalo!",
            user_id: 3,
          },
          {
            id: 4,
            name: "lys",
            photo: "www.link_a_foto.com",
            description: "Dummy User",
            user_id: 4,
          },
        ],
        posts: [
          {
            id: 1,
            title: "imagen 1",
            description: "Imagen random para pobrar",
            image: "www.cualquie_ruta_de_imagen.com/cambiaresto",
            created: "24-06-2022",
            owner_id: 1,
          },
          {
            id: 2,
            title: "imagen 2",
            description: "Otra imagen",
            image: "www.cualquie_ruta_de_imagen.com/cambiaresto",
            created: "24-06-2022",
            owner_id: 2,
          },
          {
            id: 3,
            title: "imagen 3",
            description: "Tercera imagen",
            image: "www.cualquie_ruta_de_imagen.com/cambiaresto",
            created: "24-06-2022",
            owner_id: 2,
          },
        ],
        comments: [
          {
            id: 1,
            text: "Que gran trabajo! #magnifico",
            created: "24-06-2022",
            emisor_id: 1,
            receptor_id: 2,
          },
          {
            id: 2,
            text: "Falta iluminacion",
            created: "24-06-2022",
            emisor_id: 1,
            receptor_id: 2,
          },
          {
            id: 3,
            text: "Das clases ?",
            created: "24-06-2022",
            emisor_id: 3,
            receptor_id: 2,
          },
          {
            id: 4,
            text: "OJala pudiera haccer eso",
            created: "24-06-2022",
            emisor_id: 3,
            receptor_id: 2,
          },
        ],
        hashtag: [
          { id: 1, label: "magnifico", count: 1, created: "24-06-2022" },
        ],
      },
      profiles: [],
    },
    actions: {
      postRegister: async (data) => {
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(process.env.BACKEND_URL + "/api/register", requestOptions)
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
            return setStore({ user: data.user });
          })
          .catch((error) => console.log("mensaje error: ", error));
      },
      loginRemember: () =>
        setStore({ user: JSON.parse(sessionStorage.getItem("user")) }),
      logout: () => {
        sessionStorage.removeItem("user");
        return setStore({ user: null });
      },
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
      // demoLogin:() => {
      //   fetch(process.env.BACKEND_URL + "/api/hello", requestOptions)
      //   const {login, user} = getStore();
      //   if (!login){
      //     setStore({login: true})
      //     setStore({user: "baal"})
      //   } else {
      //     setStore({login: false})
      //     setStore({user: null})
      //   }
      // },

      //getProfiles: async () => {

      //var requestOptions = {
      //   method: 'GET',
      //  redirect: 'follow'
      // };

      //await fetch(process.env.BACKEND_URL + "/api/alluser", requestOptions)
      //  .then(response => response.json())
      //  .then(result => { console.log(result),
      //    setStore({profiles: result})})
      //  .catch(error => console.log('error', error));

      // }
    },
    demoActions: {

    }
  };
};

export default getState;
