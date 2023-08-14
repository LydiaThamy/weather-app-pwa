import { Component } from '@angular/core';
import { Weather } from './models/weather';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  weather !: Weather
  city !: string

  constructor(private service: WeatherService) { }

  getWeather(city: string) {
    // console.log(`city: ${city}`) // test form

    // get promise from api
    this.service.getWeatherFromApi(city)

      .then(data => { // data is an object

        // console.log(`data: ${data}`)
        // console.log(`city: ${city}`)
        // console.log(`description: ${data.weather[0].description}`)
        // console.log(`icon: ${data.weather[0].icon}`)
        // console.log(`temp: ${(data.main.temp-32)*5/9}`)
        // console.log(`date: ${new Date(data.dt)}`)

        this.weather = new Weather()
        this.weather.city = city
        this.weather.description = data.weather[0].description
        this.weather.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        // 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png',
        this.weather.temp = data.main.temp - 273.15
        // this.weather.temp = (data.main.temp - 32) * 5 / 9
        this.weather.date = new Date(data.dt * 1000)


        console.log(`weather: ${JSON.stringify(this.weather)}`)
      })
      .catch(error => console.log(error))

  }

}
