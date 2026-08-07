

import styles from "./Table.module.css"

function Table({ columns, tableData, data }) {
    const rows = Array.isArray(tableData) ? tableData : Array.isArray(data) ? data : []

    return (
        <section>
            <div className={styles.tableContainer}>
                {rows.length === 0 ? (
                    <p className={styles.emptyState}>Nenhum dado encontrado.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.field}>{column.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id ?? row[columns[0]?.field] ?? index}>
                                    {columns.map((col) => (
                                        <td key={col.field}>{row[col.field]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    )
}

export default Table