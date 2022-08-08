const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      // login: null,
      user: null,
      googleUser: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
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
            alert('Successfully registered')
          })
          .catch((error) => console.log("error !!!", data, error));
      },
      // login fetch
      login: async (event, user, pass) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          cors: 'no-cors',
          body: JSON.stringify({
            username: user,
            password: pass
          }),
        };
        await fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // deberia guardar toda la info de user que esta en el serializador
            console.log(data);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            return setStore({ user: data.user });
          })
          .catch((error) => console.log("mensaje error: ", error));
      },
      loginRemember: ()=>setStore({user:JSON.parse(sessionStorage.getItem('user'))})
      ,
      logout: () => {
        sessionStorage.removeItem('user');       
        return setStore({ user: null });
      },
      googleLogin: async (googleData) => {
        const res = await fetch('/api/google-login', {
          method: 'POST',
          body: JSON.stringify({
            token: googleData.tokenId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await res.json();
        setStore({googleUser:true});
        fetch('/api/googleuser', {
          method: 'POST',
          body:JSON.stringify({
            googleUser:data
          }),
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(res=res.json())
        .then(data=>{
          setStore({user:data.user})
          sessionStorage.setItem('user', JSON.stringify(data.user))
         })
        .catch(error=>console.log(error))
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

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
