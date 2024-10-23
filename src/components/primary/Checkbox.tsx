const Checkbox = ({ label, checked, onChange, className }: any) => {

	return (
		<label className="flex items-center">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className={className}
			/>
			{label}
		</label>
	);
}

export default Checkbox;
