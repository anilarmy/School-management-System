import React from 'react';

const Table = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border">
                        {columns.map((col) => (
                            <th key={col.key} className="p-4 font-semibold text-muted">
                                {col.label}
                            </th>
                        ))}
                        {actions && <th className="p-4 font-semibold text-muted">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-white/5 transition-colors">
                            {columns.map((col) => (
                                <td key={col.key} className="p-4">
                                    {row[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="p-4">
                                    {actions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="p-8 text-center text-muted">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
