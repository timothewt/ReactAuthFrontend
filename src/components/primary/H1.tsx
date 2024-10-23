import TitleProps from "../../models/TitleProps";

const H1 = ({ text, className="" }: TitleProps) => {
	return (
		<h1 className={className + " text-4xl font-bold block"}>
			{text}
		</h1>
	)
}

export default H1;
