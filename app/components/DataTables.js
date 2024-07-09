import DataTable, { createTheme } from 'react-data-table-component';
import '../styles/consolidated-estimates.css';

export default function DataTableComponent({columns, data, key}) {

	return (
		<DataTable
			columns={columns}
            highlightOnHover
            striped
            keyField={key}
			data={data}
		/>
	);
};