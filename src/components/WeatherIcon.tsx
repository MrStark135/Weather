import cn from "@/utils/cn"
import React from "react"

// type Props = {
// 	icon: string,
// 	alt: string
// 	iconClassName: string
// }

export default function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & {icon: string} & {alt: string} & {iconClassName: string}) {
	return (
		<div className={cn("flex items-center", props.className)}><img
			src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
			alt={props.alt}
			className={cn("w-20 h-20 object-cover relative", props.iconClassName)}
		/></div>
	)
}