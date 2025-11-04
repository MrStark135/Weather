import mergercn from "@/utils/cn";
import { IoSearchOutline } from "react-icons/io5";

type Props =
{
	className?: string,
	value: string,
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
	onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

export default function SearchBar(props: Props){
	return(
		<form 
		onSubmit={props.onSubmit}
		className={mergercn("flex w-full items-center font-goorm h-9 text-2xl", props.className)}>
			<input
			onChange={props.onChange}
			className="w-full border-2 border-gray-300 focus:border-white h-full rounded-s-sm p-1 focus:outline-0"
			type="text" placeholder="Search city" value={props.value}/>
			<button className="border-2 border-gray-300 
			focus:bg-white focus:text-gray-500 focus:border-white 
			hover:bg-gray-400
			border-l-0 rounded-e-sm h-full p-1">
				<IoSearchOutline/>
			</button>
		</form>
	)
}