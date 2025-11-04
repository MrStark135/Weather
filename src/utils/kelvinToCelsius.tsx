import round from "./round";

export default function kelvinToCelsius(temp: number)
{
    return round(temp - 273.15, 1);
}