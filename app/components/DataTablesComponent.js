import DataTable, { createTheme } from 'react-data-table-component';
import '../styles/consolidated-estimates.css';
import PageSpinner from './PageSpinner';

export default function DataTableComponent({columns, data, key, loading}) {
	const customStyles = {
		headCells: {
		  style: {
			flexGrow: 0, // Disable flex-grow
		  },
		},
		cells: {
		  style: {
			flexGrow: 0, // Disable flex-grow
		  },
		},
	  };

	return (
		<DataTable
			columns={columns}
            highlightOnHover
            striped
            keyField={key}
			fixedHeader
    		customStyles={customStyles}
			data={data}
			progressPending={loading} 
			progressComponent={<PageSpinner />}
		/>
	);
};