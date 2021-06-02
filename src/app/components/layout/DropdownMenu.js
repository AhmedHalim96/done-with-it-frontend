import React from "react";

const DropdownMenu = ({ className = "", header, items }) => {
	const [opened, setOpened] = React.useState(false);

	return (
		<div className={"dropdown " + className}>
			<h3 className="dropdown__button" onClick={_ => setOpened(!opened)}>
				{header}
				<span
					className={`dropdown__indicator dropdown__indicator-${
						opened ? "down" : "right"
					}`}
				/>
			</h3>
			{opened && (
				<ul className="dropdown__list">
					{items.map((item, index) => (
						<li className="dropdown__item" key={index}>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropdownMenu;
