import TitleProps from "../../models/TitleProps";

const H2 = ({ text, className="" }: TitleProps) => {
	return (
		<h2 className={className + " text-2xl font-bold"}>
			{text}
		</h2>
	)
}

export default H2;
export {};
