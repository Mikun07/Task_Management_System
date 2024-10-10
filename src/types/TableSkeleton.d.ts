import React from "react";
interface TableHeader {
    header: string;
}
interface TableSkeletonProps {
    headers: TableHeader[];
    rowCount: number;
}
declare const TableSkeleton: React.FC<TableSkeletonProps>;
export default TableSkeleton;
