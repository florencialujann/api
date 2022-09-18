import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Select, MenuItem } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { api } from '../../apiServices/api';
// regex for email validation

const Pediatric = () => {
	const [pediatrics, setVaccines] = useState([]);
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
		api.get(`/pediatric`).then((res) => {
			const pediatric = res?.data?.pediatric;
			if (pediatric) {
				setVaccines(pediatric);
				console.log({ pediatric });
			}
		});
	}, []);

	let columns = [
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
		{ title: 'FECHA DE REGISTRO', field: 'dateofrecord', type: 'date' },
		{ title: 'PESO', field: 'weight', type: 'numeric' },
		{ title: 'ALTURA', field: 'height', type: 'numeric' },
		{ title: 'DIAMETRO CABEZA', field: 'headdiameter', type: 'numeric' },
		{ title: 'OBS', field: 'observations' },
		{ title: 'MEDICAMENTO PRESCRIPTO', field: 'prescriptiondrug' },
		{ title: 'ESTUDIOS MEDICOS', field: 'medicalstudies' },
		{ title: 'RESULTADOS', field: 'results' },
	];

	//function for updating the existing row details
	const handleRowUpdate = (newData, oldData, resolve) => {
		//validating the data inputs
		let errorList = [];
		if (newData.children === '') {
			errorList.push('Intentelo de nuevo, no has rellenado el campo de hijos.');
		}
		if (newData.dateofrecord === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de fecha de registro.'
			);
		}
		if (newData.weight === '') {
			errorList.push('Intentelo de nuevo, no has rellenado el campo de peso.');
		}
		if (newData.height === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de altura.'
			);
		}
		if (newData.headdiameter === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de diametro de cabeza.'
			);
		}
		if (newData.observations === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de observacion.'
			);
		}
		if (newData.prescriptiondrug === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de medicamento.'
			);
		}
		if (newData.medicalstudies === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de estudios medicos.'
			);
		}
		if (newData.results === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de resultados.'
			);
		}

		if (errorList.length < 1) {
			api
				.patch(`/pediatric`, newData)
				.then((response) => {
					if (response.data?.error) {
						alert(response.data?.message);
						return false;
					} else {
						const updatepediatrics = [...pediatrics];
						const index = oldData.tableData.id;
						updatepediatrics[index] = newData;
						setVaccines([...updatepediatrics]);
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
			.delete(`/pediatric/${oldData._id}`)
			.then((response) => {
				if (response.data?.error) {
					alert(response.data?.message);
					return false;
				} else {
					const dataDelete = [...pediatrics];
					const index = oldData.tableData._id;
					dataDelete.splice(index, 1);
					setVaccines([...dataDelete]);
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
		if (newData.children === '') {
			errorList.push('Intentelo de nuevo, no has rellenado el campo de hijos.');
		}
		if (newData.dateofrecord === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de fecha de registro.'
			);
		}
		if (newData.weight === '') {
			errorList.push('Intentelo de nuevo, no has rellenado el campo de peso.');
		}
		if (newData.height === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de altura.'
			);
		}
		if (newData.headdiameter === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de diametro de cabeza.'
			);
		}
		if (newData.observations === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de observaciones.'
			);
		}
		if (newData.prescriptiondrug === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de medicamentos.'
			);
		}
		if (newData.medicalstudies === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de estudios medicos.'
			);
		}
		if (newData.results === '') {
			errorList.push(
				'Intentelo de nuevo, no has rellenado el campo de resultados.'
			);
		}

		if (errorList.length < 1) {
			api
				.post(`/pediatric`, newData)
				.then((response) => {
					if (response.data?.error) {
						alert(response.data?.message);
						return false;
					} else {
						let newpediatricsdata = [...pediatrics];
						newpediatricsdata.push(newData);
						setVaccines(newpediatricsdata);
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
				title='Pediatric Details'
				columns={columns}
				data={pediatrics}
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
			<div style={{ marginTop: '20px' }}></div>
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

export default Pediatric;
