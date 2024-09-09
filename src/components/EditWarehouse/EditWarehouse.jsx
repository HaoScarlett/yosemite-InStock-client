import React from 'react';
import './EditWarehouse.scss';
import backbtn from '../../assets/Icons/arrow_back-24px.svg';
import { Link } from 'react-router-dom';
function EditWarehouse() {
	return (
		<>
			<section className='edit'>
				<div className='edit__header'>
					<Link to='/'>
						<img
							className='edit__header-back'
							src={backbtn}
							alt='back button'
						/>
					</Link>
					<h1>Edit Warehouse</h1>
				</div>
				<div className='edit__warehouse'></div>
				<div className='edit__contact'></div>
			</section>
		</>
	);
}

export default EditWarehouse;
