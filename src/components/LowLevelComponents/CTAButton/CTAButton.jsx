import React from 'react';
import './CTAButton.scss';

function CTAButton({ variant = 'primary', onClick, text, type = 'button' }) {
	const getBtnStyle = () => {
		switch (variant) {
			case 'primary':
				return 'btn-primary';
			case 'secondary':
				return 'btn-secondary';
			case 'delete':
				return 'btn-delete';
			default:
				return 'btn-primary';
		}
	};

	return (
		<button
			className={getBtnStyle()}
			onClick={onClick}
			type={type}
		>
			{text}
		</button>
	);
}

export default CTAButton;
