import React from 'react';
import './InOutStock.scss';

export default function InOutStock({ inStock }) {
	if (inStock) {
		return <span className='inOutStock inStock'>IN STOCK</span>;
	} else {
		return <span className='inOutStock outStock'>OUT OF STOCK</span>;
	}
}
