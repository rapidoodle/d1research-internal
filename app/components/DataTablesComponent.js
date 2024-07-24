import DataTable, { createTheme } from 'react-data-table-component';
import '../styles/consolidated-estimates.css';
import PageSpinner from './PageSpinner';

export default function DataTableComponent({columns, data, key, loading}) {

	return (
		<DataTable
			columns={columns}
            highlightOnHover
            striped
            keyField={key}
			fixedHeader
			data={data}
			progressPending={loading} 
			progressComponent={<PageSpinner />}
		/>
	);
};