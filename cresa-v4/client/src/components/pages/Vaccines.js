import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Select, MenuItem } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { api } from '../../apiServices/api';
// regex for email validation

const Vaccines = () => {
	const [vaccines, setVaccines] = useState([]);
	const [iserror, setIserror] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);
	const [childs, setChilds] = useState([]);

	// let data = [
	//   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
	// ]

	useEffect(() => {
		api.get(`/children`).then((res) => {
			const childz = res?.data?.children;
			if (childz) {
				setChilds(childz);
				console.log({ childz });
			}
		});
		api.get(`/vaccine`).then((res) => {
			const vaccine = res?.data?.vaccines;
			if (vaccine) {
				setVaccines(vaccine);
				console.log({ vaccine });
			}
		});
	}, []);

	let columns = [
		{ title: 'NOMBRE VACUNA', field: 'name' },
		{
			title: 'NOMBRE HIJO',
			field: 'children',
			editComponent: ({ value, onRowDataChange, rowData }) => (
				<Select
					value={value}
					onChange={(event) => {
						onRowDataChange({
							...rowData,
							children: event.target.value,
						});
					}}
				>
					{childs?.map((data, i) => (
						<MenuItem key={i} value={data.name}>
							{data.name}
						</MenuItem>
					))}
				</Select>
			),
		},
		{ title: 'CANT DOSIS', field: 'doses', type: 'numeric' },
		{ title: 'LUGAR DE APLICACION', field: 'placeofApplication' },
		{ title: 'FECHA DE APLICACION', field: 'dateofApplication', type: 'date' },
	];

	//function for updating the existing row details
	const handleRowUpdate = (newData, oldData, resolve) => {
		//validating the data inputs
		let errorList = [];
		if (newData.name === '') {
			errorList.push('Intentalo de nuevo, no has ingresado el nombre.');
		}
		if (newData.children === '') {
			errorList.push('Intentalo de nuevo, no has ingresado el hijo.');
		}
		if (newData.placeofApplication === '') {
			errorList.push(
				'Intentalo de nuevo, no has ingresado el lugar de aplicacion.'
			);
		}
		if (newData.dateofApplication === '') {
			errorList.push(
				'Intentalo de nuevo, la fecha de aplicacion no puede estar vacia.'
			);
		}

		if (errorList.length < 1) {
			api
				.patch(`/vaccine`, newData)
				.then((response) => {
					if (response.data?.error) {
						alert(response.data?.message);
						return false;
					} else {
						const updatevaccines = [...vaccines];
						const index = oldData.tableData.id;
						updatevaccines[index] = newData;
						setVaccines([...updatevaccines]);
					}
					resolve();
					setIserror(false);
					setErrorMessages([]);
				})
				.catch((error) => {
					console.log({ error });

					setErrorMessages(['Update failed! Server error']);
					setIserror(true);
					resolve();
				});
		} else {
			setErrorMessages(errorList);
			setIserror(true);
			resolve();
		}
	};

	//function for deleting a row
	const handleRowDelete = (oldData, resolve) => {
		console.log({ errdata: oldData?._id });
		api
			.delete(`vaccine/${oldData._id}`)
			.then((response) => {
				if (response.data?.error) {
					alert(response.data?.message);
					return false;
				} else {
					const dataDelete = [...vaccines];
					const index = oldData.tableData._id;
					dataDelete.splice(index, 1);
					setVaccines([...dataDelete]);
				}
				resolve();
			})
			.catch((error) => {
				console.log({ error });
				setErrorMessages(['Delete failed! Error de servidor']);
				setIserror(true);
				resolve();
			});
	};

	//function for adding a new row to the table
	const handleRowAdd = (newData, resolve) => {
		//validating the data inputs
		let errorList = [];
		if (newData.name === '') {
			errorList.push('Intentalo de nuevo, no has ingresado el nombre.');
		}
		if (newData.children === '') {
			errorList.push('Intentalo de nuevo, no has ingresado el hijo.');
		}
		if (newData.placeofApplication === '') {
			errorList.push(
				'Intentalo de nuevo, no has ingresado el lugar de aplicacion.'
			);
		}
		if (newData.dateofApplication === '') {
			errorList.push(
				'Intentalo de nuevo, no has ingresado la fecha de aplicacion.'
			);
		}

		if (errorList.length < 1) {
			api
				.post(`/vaccine`, newData)
				.then((response) => {
					if (response.data?.error) {
						alert(response.data?.message);
						return false;
					} else {
						let newvaccinesdata = [...vaccines];
						newvaccinesdata.push(newData);
						setVaccines(newvaccinesdata);
					}
					resolve();
					setErrorMessages([]);
					setIserror(false);
				})
				.catch((error) => {
					setErrorMessages(['Cannot add data. Server error!']);
					setIserror(true);
					resolve();
				});
		} else {
			setErrorMessages(errorList);
			setIserror(true);
			resolve();
		}
	};

	return (
		<div className='app'>
			<br />
			<MaterialTable
				title='Vaccine Details'
				columns={columns}
				data={vaccines}
				options={{
					headerStyle: {
						borderBottomColor: 'red',
						borderBottomWidth: '3px',
						fontFamily: 'verdana',
					},
					actionsColumnIndex: -1,
				}}
				editable={{
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve) => {
							handleRowUpdate(newData, oldData, resolve);
						}),
					onRowAdd: (newData) =>
						new Promise((resolve) => {
							handleRowAdd(newData, resolve);
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve) => {
							handleRowDelete(oldData, resolve);
						}),
				}}
			/>
			<div>
				{iserror && (
					<Alert severity='error'>
						<AlertTitle>ERROR</AlertTitle>
						{errorMessages.map((msg, i) => {
							return <div key={i}>{msg}</div>;
						})}
					</Alert>
				)}
			</div>
			<div Style={{ marginTop: '20px' }}>
				<img src='/images/calendario.jpg' alt='Calender' />
			</div>
		</div>
	);
};

export default Vaccines;
