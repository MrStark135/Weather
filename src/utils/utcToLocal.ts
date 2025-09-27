export default function utcToLocal(utc: number, timezone: number) {
	// Create a local date from the UTC string
	// *1000 is to convert seconds to milliseconds
	let t = new Date(utc * 1000);

	// Get the offset in ms
	var offset = timezone * 1000;

	// console.log(offset);

	// Subtract from the UTC time to get local
	// for some reason it gives me the offset negative
	t.setTime(t.getTime() - offset);

	// do whatever
	var d = [t.getFullYear(), t.getMonth(), t.getDate()].join('/');
	d += ' ' + t.toLocaleTimeString();
	return d;
}