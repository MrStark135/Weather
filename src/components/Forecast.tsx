import kelvinToCelsius from "@/utils/kelvinToCelsius"
import utcToLocal from "@/utils/utcToLocal"
import { useQuery } from "@tanstack/react-query"
import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'; 

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

type Forecast =
{
	dt: number,
	main:{
		temp: number,
		feels_like: number,
		temp_min: number,
		temp_max: number,
		pressure: number,
		sea_level: number,
		grnd_level: number,
		humidity: number,
		temp_kf: number
	},
	weather:[
	{
		id: number,
		main: string,
		description: string,
		icon: string
	}],
	clouds:{
		all: number
	},
	wind:{
		speed: number,
		deg: number,
		gust: number
	},
	visibility: number,
	pop: number,
	sys:{
		pod: string
	},
	dt_txt: string
}

type ForecastResponse = {
	cod: string,
	message: number | string,
	cnt: number,
	list: Forecast[],
	city: {
		id: number,
		name: string,
		coord: {
			lat: number,
			lon: number
		},
		country: string,
		population: number,
		timezone: number,
		sunrise: number,
		sunset: number
	}
}

export default function Forecast() {
	const { isPending, error, data, isFetching } = useQuery<ForecastResponse>({
		queryKey: ['forecastData'],
		queryFn: async () => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${process.env.NEXT_PUBLIC_API_KEY}&cnt=40`
		)
		return await response.json()
		},
	})

	if (isPending) return (
		<div className="flex min-h-40 items-center justify-center">
			<div className="animate-bounce">Loading...</div>
		</div>
	)

	if (error) return (
		<div className="flex items-center justify-between">
			{'An error has occurred: ' + error.message}
		</div>
	)

	// Group forecasts by day
	const grouped: { [date: string]: Forecast[] } = {};
	let firstDate: string = data.list[0].dt_txt.split(' ')[0];
	let lastDate: string | undefined = data.list.pop()?.dt_txt.split(' ')[0];
	data.list.forEach((forecast, i) => {
		const date = forecast.dt_txt.split(' ')[0];
		if (date == firstDate || date == lastDate) return;
		if (!grouped[date]) grouped[date] = [];
		grouped[date].push(forecast);
	});

	return (
		<div className="flex flex-col items-center bg-emerald-200 w-full rounded-sm">
			<div className="font-semibold p-1" >Forecast</div>
			<div className="flex items-center flex-col w-full p-2">
					{(() => {
						return Object.entries(grouped).map(([date, forecasts]) => (
							<div id="forecast" className="flex items-center gap-1 p-1 bg-gray-350 rounded-sm w-full my-1" key={date}>
								<div id="forecastDate" className="px-2">
									{
										date.replaceAll('-', '.')
									}
								</div>
								<div className="w-full pr-2">
									<Line
										key={date}
										className="max-h-72 min-h-52 inline-block"
										options={{
											responsive: true,
											maintainAspectRatio: false,
											// sometimes the chart is not resized correctly
											// onResize(chart, size) {
											// 	const forecastDate = document.getElementById('forecastDate');
											// 	const forecast = document.getElementById('forecast');

											// 	if ((forecast?.clientWidth || 0) < (size.width + (forecastDate?.clientWidth || 0) || 0))
											// 	chart.width = size.width - (forecastDate?.clientWidth || 0);
											// },
											plugins: {
												tooltip: {
													callbacks:
													{
														label: (context) => { return String(context.parsed.y) }
													},
													enabled: true,
												}
											},
											layout: {
												padding: 20,
												
											},
											scales: {
												x: {
													grid:{
														display: false,
													}
												},
												y: {
													grid: {
														color: "rgba(10, 10, 10, 15%)"
													},
													suggestedMax: 30,
													suggestedMin: 10,
													ticks: {
														callback: (value, index, tick) => { return value+"°C" },
														stepSize: 2
													}
												}
											}
										}}
										data={{
												labels: forecasts.map((forecast) => {
													return (
														(():string => {
															let time = utcToLocal(forecast.dt, data.city.timezone).split(' ')[1].slice(0, -3);
															let AM_PM = utcToLocal(forecast.dt, data.city.timezone).split(' ')[2];
															return time + " " + AM_PM;
														})()
													)
												}),
												datasets: [
													{
														label: "blue",
														data: forecasts.map((forecast) => kelvinToCelsius(forecast.main.temp)),
														borderColor: "oklch(60% 0.214 259.815)",
														hoverBorderWidth: 6,
														pointBorderColor: "gray",
														backgroundColor: "white",
													}
												]
											}}
									/>
								</div>
							</div>
						))
					})()}
			</div>
		</div>
	)
}