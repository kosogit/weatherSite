document.addEventListener('DOMContentLoaded',()=>{
    const inputbx = document.getElementById("inputbox");
    const weatherifo = document.getElementById("weatherinfo");
    const city = document.getElementById("cityname");
    const temperaturedisplay = document.getElementById("temperature");
    const descriptiondisplay = document.getElementById("description");
    const error = document.getElementById("error-message");
    const but = document.getElementById("btn");

    const API_key = "bf35c8fcf4cb9fc7b7f35e2b9645eae7";

    but.addEventListener("click", async ()=>{
       const city = inputbx.value.trim();
       if(!city) return;
       try{
        const weather = await fetchdata(city);
         display(weather);
       }catch{
          showerror();
       }

    })
    async function fetchdata(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
        const respond = await fetch(url);

        if(!respond.ok){
            throw new Error("city not found!");
        }

        const data = await respond.json()
        return data;
    }
    function display(data){
        console.log(data);
        const {name, main, weather} = data;
        city.textContent = name;
        temperaturedisplay.textContent =`Temperature : ${main.temp}`;
        descriptiondisplay.textContent = `Weather :${weather[0].description}`;

        weatherifo.classList.remove("hidden");
        error.classList.add("hidden")

    }
    function showerror(){
        error.classList.remove("hidden");
        weatherifo.classList.add("hidden");
    }
    
})