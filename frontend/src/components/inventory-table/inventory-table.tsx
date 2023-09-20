import React from 'react';
import TableTop from "./table-top/table-top";
import TableRow from "./table-row/table-row";

const InventoryTable = () => {
    return (
        <div className="overflow-x-auto w-1/2 bg-white rounded shadow-lg">
            <TableTop/>
            <TableRow/>
            {/*<table className="min-w-full">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th className="text-left px-1 py-2">Header 1</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*        <tr>*/}
            {/*            <td className="px-1 py-2">HEY</td>*/}
            {/*            <td className="px-1 py-2">HEY</td>*/}
            {/*        </tr>*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    );
};

export default InventoryTable;
