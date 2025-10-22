'use client'

import { useState } from "react";
import Forecast from "@/components/Forecast";
import Navbar from "@/components/Navbar";
import Weather from "@/components/Weather";

export default function Home() {
	const [searchCity, setSearchCity] = useState<string>('London, GB')

	return (
		<div className="flex flex-col gap-0 min-w-80 text-3xl">
			<Navbar setSearchCity={setSearchCity}/>
			<main className="flex flex-col items-center justify-between p-2.5 gap-2">
				<Weather searchCity={searchCity}/>
				<Forecast searchCity={searchCity}/>
			</main>
		</div>
	);
}
