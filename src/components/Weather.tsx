import kelvinToCelsius from "@/utils/kelvinToCelsius"
import utcToLocal from "@/utils/utcToLocal"
import { useQuery } from "@tanstack/react-query"
import { BsPersonStanding } from "react-icons/bs"
import { FaTemperatureHalf, FaWind } from "react-icons/fa6"
import { WiHumidity } from "react-icons/wi"
import WeatherIcon from "./WeatherIcon"

type WeatherResponse = {
	coord: {
		lon: number
		lat: number
	}
	weather: [{
		id: number
		main: string
		description: string
		icon: string
	}]
	base: string
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		humidity: number
		sea_level: number
		grnd_level: number
	}
	visibility: number
	wind: {
		speed: number
		deg: number
		gust: number
	}
	clouds: {
		all: number
	}
	dt: number
	sys: {
		type: number
		id: number
		country: string
		sunrise: number
		sunset: number
	}
	timezone: number
	id: number
	name: string
	cod: number
}


export default function Weather() {
	const { isPending, error, data, isFetching } = useQuery<WeatherResponse>({
		queryKey: ['weatherData'],
		queryFn: async () => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.NEXT_PUBLIC_API_KEY}`
		)
		return await response.json()
		},
	})

	if (isPending) return (
		<div className="flex min-h-30 items-center justify-center">
			<div className="animate-bounce">Loading...</div>
		</div>
	)

	if (error) return (
		<div className="flex items-center justify-between">
			{'An error has occurred: ' + error.message}
		</div>
	)

	// console.log(data);
	
	return (
		<div className="w-full flex flex-col gap-2">
			{/* City data */}
			<div className="flex justify-center bg-emerald-200 w-full rounded-sm p-1.5">
				<div className="text-3xl font-semibold">{data.name} {data.sys.country}</div>
			</div>
			{/* Current weather data */}
			<div id="weather" className="flex items-center justify-between gap-3 bg-emerald-200 w-full rounded-sm p-2">
				{/* main weather display */}
				<div id="weatherMain" className="flex flex-col justify-center gap-2 m-3 pl-7 w-full">
					<div className="flex items-center gap-4">
						<WeatherIcon className="w-18 h-18" iconClassName="w-28 h-28" icon={data.weather[0].icon} alt={data.weather[0].description}/>
						<div className="text-4xl font-bold">
							{kelvinToCelsius(data.main.temp)}°C
						</div>
					</div>
					<div className="text-2xl capitalize">{data.weather[0].description}</div>
				</div>
				{/* additional weather info */}
				<div id="weatherAdd" className="flex gap-4 text-xl">
					<div className="flex flex-col justify-center gap-3 h-full p-5 rounded-sm bg-gray-350">
						<div>Feels like:</div>
						<div className="flex gap-3 items-center justify-between">
							<div>{kelvinToCelsius(data.main.feels_like)}°C</div>
							<div className="flex">
								<FaTemperatureHalf />
								<BsPersonStanding />
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center gap-3 h-full p-5 rounded-sm bg-gray-350">
						<div>Humidity: </div>
						<div className="flex gap-3 items-center justify-between">
							<div>{data.main.humidity}%</div>
							<WiHumidity />
						</div>
					</div>
					<div className="flex flex-col justify-center gap-3 h-full p-5 rounded-sm bg-gray-350 text-nowrap">
						<div>Wind:</div>
						<div className="flex gap-3 items-center justify-between">
							<div>{data.wind.speed}m/s</div>
							<FaWind />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}