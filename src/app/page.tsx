'use client'

import Forecast from "@/components/Forecast";
import Navbar from "@/components/Navbar";
import Weather from "@/components/Weather";
import utcToLocal from "@/utils/utcToLocal";

export default function Home() {


	return (
		<div className="flex flex-col gap-0 min-w-80 text-3xl">
			<Navbar/>
			<main className="flex flex-col items-center justify-between p-2.5 gap-2">
				<Weather/>
				<Forecast/>
			</main>
		</div>
	);
}
