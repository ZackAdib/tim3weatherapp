function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = newName.value;

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=64f60853740a1ee3ba20d0fb595c97d5&units=metric')
    .then(response => response.json())
    .then(data => {
        
      const weatherInfo = document.getElementById('weatherInfo');
      weatherInfo.innerHTML = `
        <p class="date" >${getCurrentDate()}</p>
        <div class="tengah">
        <img class="ikon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />
        <p class="mainTemp" >${data.main.temp.toFixed()}°C</p>
        </div>
        <p class="desc" >${data.weather[0].description}</p>
        <div class="mores">
        <p class="more" >Feels Like: ${data.main.feels_like.toFixed()}°C</p>
        <p class="more" >Humidity: ${data.main.humidity}%</p>
        <p class="more" >Wind: ${data.wind.speed} m/s</p>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
    });



fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
.then(response => response.json())
.then(data => {

    
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed()+ "°";
        
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed() + "°";
    }
   


    


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    return currentDate.toLocaleDateString('en-US', options);
  }

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "Jakarta";
    GetInfo();
}



var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];


function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }



