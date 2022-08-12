const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
      imageData: {},
      demo: {
        users: [
          {
            id: 1,
            name: "Bryan",
            lastname: "alburquenque",
            username: "baal",
            email: "bryan@gmail.com",
            password: "123456",
            admin: true,
          },
          {
            id: 2,
            name: "Demian",
            lastname: "hernandez",
            username: "Demian",
            email: "demian@gmail.com",
            password: "123456",
            admin: true,
          },
          {
            id: 3,
            name: "Lys",
            lastname: "4geeks",
            username: "Lys",
            email: "lys@gmail.com",
            password: "123456",
            admin: true,
          },
          {
            id: 4,
            name: "Dummy",
            lastname: "dummy",
            username: "Dummy",
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
            name: "Demian",
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
            name: "Dummy",
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
            created: "14/6/2020",
            owner_id: 1,
          },
          {
            id: 2,
            title: "imagen 2",
            description: "Otra imagen",
            image: "www.cualquie_ruta_de_imagen.com/cambiaresto",
            created: "14/6/2020",
            owner_id: 2,
          },
          {
            id: 3,
            title: "imagen 3",
            description: "Tercera imagen",
            image: "www.cualquie_ruta_de_imagen.com/cambiaresto",
            created: "14/6/2020",
            owner_id: 2,
          },
        ],
        comments: [
          {
            id: 1,
            text: "Que gran trabajo! #magnifico",
            created: "14/6/2020",
            emisor_id: 1,
            receptor_id: 2,
          },
          {
            id: 2,
            text: "Falta iluminacion",
            created: "14/6/2020",
            emisor_id: 1,
            receptor_id: 2,
          },
          {
            id: 3,
            text: "Das clases ?",
            created: "14/6/2020",
            emisor_id: 3,
            receptor_id: 1,
          },
          {
            id: 4,
            text: "OJala pudiera haccer eso",
            created: "14/6/2020",
            emisor_id: 3,
            receptor_id: 2,
          },
        ],
        hashtags: [
          { id: 1, label: "magnifico", count: 1, created: "14/6/2020" },
        ],
      },
    },
    actions: {
      loadChanges: (table) => {
        const { demo } = getStore();
        demo[table] = JSON.parse(sessionStorage.getItem(table));
        return setStore({ demo: demo });
      },
      loginRemember: () =>
        setStore({ user: JSON.parse(sessionStorage.getItem("user")) }),
      logout: () => {
        sessionStorage.removeItem("user");
        return setStore({ user: null });
      },
      comment: (e, commentData, receptorID) => {
        e.preventDefault();
        if (!commentData) return alert("Error: no puedes comentar vacio")
        const { demo, user } = getStore();
        const postID = demo.comments[demo.comments.length - 1].id;
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        demo.comments.push({
          id: postID+1,
          text: commentData,
          created: hoy.toLocaleDateString(),
          emisor_id: user.id,
          receptor_id: receptorID,
        });
        setStore({ demo: demo });
        sessionStorage.setItem("comments", JSON.stringify(demo.comments));
        return alert("Comentario exitoso")
      },
      post: async (e, file, title, description = null) => {
        e.preventDefault();
        const { demo, user } = getStore();
        if (!user)
          return alert("Prohibido: debes autentificarte para poder postear");
        if (!file || !title) return alert("Debes ingresar imagen y titulo");

        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("upload_preset", "artidochelone");

        // console.log('file: ', file)
        // fetch a cloudinary para subir la imagen.
        await fetch("https://api.cloudinary.com/v1_1/baal1992/image/upload", {
          method: "POST",
          body: formdata,
        })
          .then((res) => res.json())
          .then((data) => {
            // guardamos la respuesta
            setStore({ imageData: data });
          })
          .catch((error) => console.log(error));

        // Se crea el post para guardar en el front
        const { imageData } = getStore();
        if (imageData) {
          let idpost = demo.posts[demo.posts.length - 1].id;
          const tiempoTranscurrido = Date.now();
          const hoy = new Date(tiempoTranscurrido);
          demo.posts.push({
            id: idpost+1,
            title: title,
            description: description,
            image: imageData.url,
            created: hoy.toLocaleDateString(),
            owner_id: user.id,
          });
          setStore({ demo: demo });
          sessionStorage.setItem("posts", JSON.stringify(demo.posts));
          setStore({ imageData: null });
          return alert("Post exitoso");
        } else {
          return alert(
            "No fue posible crear el post porque no se guardo la imagen"
          );
        }
      },
      register: (e, data) => {
        e.preventDefault();
        try {
          const { demo } = getStore();
          if (demo.users.filter((user) => user.username == data.username).length > 0) {
            return alert("Error: username en uso.");
          }
          if (demo.users.filter((user) => user.email == data.email).length > 0) {
            return alert("Error: correo ya registrado");
          }
          const idUser = demo.users[demo.users.length - 1].id;
          demo.users.push({
            id: idUser+1,
            name: data.name,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            password: data.password,
          });
          demo.profiles.push({
            id: idUser+1,
            name: data.name,
            photo: null,
            description: null,
            user_id: idUser,
          });
          setStore({ demo: demo });
          sessionStorage.setItem("users", JSON.stringify(demo.users));
          sessionStorage.setItem("profiles", JSON.stringify(demo.profiles));
          alert("Usuario registrado con exito");
          return getActions().login(e, data.username, data.password);
        } catch (error) {
          alert("No se pudo crear el registro");
          return console.log(error);
        }
      },
      login: (e=null, username, password) => {
        if (!e) {
          e.preventDefault();
        }
        if (!username || !password) {
          return alert("Debes ingresar usuario y contraseña");
        }
        const { demo } = getStore();
        // console.log(demo.users.filter(user => user.username == username).map(user=> user.password))
        if (
          demo.users.filter((user) => user.username == username) &&
          password ==
            demo.users
              .filter((user) => user.username == username)
              .map((user) => user.password)[0]
        ) {
          setStore({
            user: demo.users.filter((user) => user.username == username)[0],
          });
          sessionStorage.setItem(
            "user",
            JSON.stringify(
              demo.users.filter((user) => user.username == username)[0]
            )
          );
          return console.log("login con exito");
        } else {
          return alert("Usuario o contraseña no valido");
        }
      },
    },
  };
};

export default getState;
