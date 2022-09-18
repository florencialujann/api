import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Select, MenuItem } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { api } from '../../apiServices/api';
// regex for email validation

const Childrens = () => {
	const [childrens, setChildrens] = useState([]);
	const [iserror, setIserror] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);

	let columns = [
		{ title: 'NOMBRE', field: 'name' },
		{ title: 'FECHANACIMIENTO', field: 'dateofbirth', type: 'date' },
		{
			title: 'GRUPO SANGUINEO',
			field: 'bloodgroup',
			editComponent: ({ value, onRowDataChange, rowData }) => (
				<Select
					value={value}
					onChange={(event) => {
						onRowDataChange({
							...rowData,
							bloodgroup: event.target.value,
						});
					}}
				>
					<MenuItem value={'A+'}>A+</MenuItem>
					<MenuItem value={'A-'}>A-</MenuItem>
					<MenuItem value={'B+'}>B+</MenuItem>
					<MenuItem value={'B-'}>B-</MenuItem>
					<MenuItem value={'O+'}>O+</MenuItem>
					<MenuItem value={'O-'}>O-</MenuItem>
					<MenuItem value={'AB+'}>AB+</MenuItem>
					<MenuItem value={'AB-'}>AB-</MenuItem>
				</Select>
			),
		},
		{
			title: 'GENERO',
			field: 'gender',
			editComponent: ({ value, onRowDataChange, rowData }) => (
				<Select
					value={value}
					onChange={(event) => {
						onRowDataChange({
							...rowData,
							gender: event.target.value,
						});
					}}
				>
					<MenuItem value={'male'}>male</MenuItem>
					<MenuItem value={'female'}>female</MenuItem>
					<MenuItem value={'other'}>other</MenuItem>
				</Select>
			),
		},
		{
			title: 'ENFERMEDADES CRONICAS',
			field: 'chronicdieses',
		},
	];

	// let data = [
	//   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
	// ]

	useEffect(() => {
		api.get(`/children`).then((res) => {
			const children = res?.data?.children;
			if (children) {
				setChildrens(children);
				console.log({ children });
			}
		});
	}, []);

	//function for updating the existing row details
	const handleRowUpdate = (newData, oldData, resolve) => {
		//validating the data inputs
		let errorList = [];
		if (newData.name === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de nombre.'
			);
		}
		if (newData.gender === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de genero.'
			);
		}
		if (newData.dateofbirth === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de fecha de nacimiento.'
			);
		}
		if (newData.bloodgroup === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el grupo sanguineo.'
			);
		}
		if (newData.chronicdieses === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de enfermedades cronicas.'
			);
		}

		if (errorList.length < 1) {
			api
				.patch(`/children`, newData)
				.then((response) => {
					console.log({ response });
					if (response.data?.error) {
						alert(response.data?.message);
						return false;
					} else {
						const updatechildrens = [...childrens];
						const index = oldData.tableData.id;
						updatechildrens[index] = newData;
						setChildrens([...updatechildrens]);
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
			.delete(`children/${oldData._id}`)
			.then((response) => {
				if (response.data?.error) {
					alert(response.data?.message);
					return false;
				} else {
					const dataDelete = [...childrens];
					const index = oldData.tableData._id;
					dataDelete.splice(index, 1);
					setChildrens([...dataDelete]);
				}
				resolve();
			})
			.catch((error) => {
				console.log({ error });
				setErrorMessages(['Delete failed! Server error']);
				setIserror(true);
				resolve();
			});
	};

	//function for adding a new row to the table
	const handleRowAdd = (newData, resolve) => {
		//validating the data inputs
		let errorList = [];
		if (newData.name === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de nombre.'
			);
		}
		if (newData.gender === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de genero.'
			);
		}
		if (newData.dateofbirth === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de fecha de nacimiento.'
			);
		}
		if (newData.bloodgroup === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de grupo sanguineo.'
			);
		}
		if (newData.chronicdieses === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de enfermedades cronicas.'
			);
		}

		if (errorList.length < 1) {
			api
				.post(`/children`, newData)
				.then((response) => {
					if (response.data?.error) {
						alert(response.data?.message);
						return false;
					} else {
						console.log({ response });
						let newchildrensdata = [...childrens];
						newchildrensdata.push(newData);
						setChildrens(newchildrensdata);
					}
					resolve();
					setErrorMessages([]);
					setIserror(false);
				})
				.catch((error) => {
					console.log({ error });

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
				title='Children Details'
				columns={columns}
				data={childrens}
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
		</div>
	);
};

export default Childrens;
