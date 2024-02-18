import React, { useEffect, useState } from 'react'
import { SearchForWeather } from './SearchForWeather'

export const Wether = () => {
    const [city, setCity] = useState('multan')
    const [response, setResponse] = useState({})
    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=c79919145d564617907125732231812%20&q=${city}&days=6&aqi=yes&alerts=no`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                setResponse(data)
            });
    }, [city])

    const test = () => {
        console.log(response)
    }

    return (
        <div style={{ overflow: 'hidden' }} className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">


            {/* <!-- Component Start --> */}
            <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-6xl font-bold">{response.current?.temp_c}°C</span>
                        <span className="font-semibold mt-1 text-gray-500">{response.location?.name}, {response.location?.country}</span>
                    </div>
                    <img style={{ transform: 'scale(1.8)', imageRendering: 'pixelated', width: '80px', filter: 'drop-shadow(4px 3px 1px gray)' }} src={response.current?.condition.icon} alt="" />
                </div>
                <div className="flex justify-between mt-12" style={{ overflow: 'auto' }}>
                    {
                        response.forecast?.forecastday[0].hour.map((e) => {
                            const time = new Date(e.time)
                            const formattedHours = (time.getHours() % 12) || 12;
                            const amPm = time.getHours() < 12 ? 'AM' : 'PM';
                            const formattedTime = `${formattedHours}:${String(time.getMinutes()).padStart(2, '0')}`;
                            return (
                                <div className="flex flex-col items-center ml-5 pb-4">
                                    <span className="font-semibold text-lg">{e.temp_c}°C</span>
                                    <div className="weather_img h-14 w-14"><img style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={e.condition.icon} alt="weather_icon" /></div>

                                    <span className="font-semibold mt-1 text-sm">{`${formattedTime}`}</span>
                                    <span className="text-xs font-semibold text-gray-400">{amPm}</span>
                                </div>)
                        })
                    }
                </div>
            </div><br />
            <SearchForWeather setCity={setCity} />
            <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-6 rounded-xl ring-8 ring-white ring-opacity-40">
                {
                    response.forecast?.forecastday.map((e) => {
                        const date = new Date(e.date)
                        //fri, 22 jan
                        return (
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm w-1/4">{date.toDateString()}</span>
                                <div className="flex items-center justify-end w-1/4 pr-10">
                                    <span className="font-semibold">{e.day.avghumidity}%</span>
                                    <svg class="w-6 h-6 fill-current ml-1" viewBox="0 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1,0,0,1,-4,-2)">
                                            <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" style={{ fillRule: "nonzero" }}></path>
                                        </g>
                                    </svg>
                                </div>
                                <img src={e.day.condition.icon} alt="weather_condition" />
                                <span className="font-semibold text-lg w-1/4 text-right">{e.day.mintemp_c}° / {e.day.maxtemp_c}°</span>
                            </div>)
                    })

                }
            </div>
            {/* <!-- Component End  --> */}
            <button onClick={test} className="test" style={{ padding: '5px 10px', color: 'white', background: 'black' }}>Testing Btn</button>
        </div>
    )
}
