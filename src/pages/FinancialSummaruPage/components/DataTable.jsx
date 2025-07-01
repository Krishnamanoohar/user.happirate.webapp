import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DataTable = ({ columns, data, stickyHeader = false }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (sortDirection === "asc") {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/60">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className={`bg-gray-50/90 ${
              stickyHeader ? "sticky top-0 z-10" : ""
            }`}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-100/90 transition-colors"
                      : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable &&
                      sortColumn === column.key &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200/60 bg-white">
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50/80 transition-colors duration-200"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-3 whitespace-nowrap text-sm"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
