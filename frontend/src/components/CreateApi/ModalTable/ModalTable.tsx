import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ApisType, DataType } from "../../../pages/CreateApi/ApisType";
import SelectMethods from "../SelectMethods/SelectMethods";
import "../ControllerAddModal/ControllerAddModal.scss";

// ControllerAddModal에서 받아오는 props의 type 설정
interface Props {
  data: ApisType[];
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

const ModalTable = ({ data, setData }: Props) => {
  const defaultColumn: Partial<ColumnDef<ApisType>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue<string>();
      const [value, setValue] = useState<string>(initialValue);

      const onBlur = (temp?: string) => {
        table.options.meta?.updateData(index, id, temp ? temp : value);
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return id === "method" ? (
        <SelectMethods onBlur={onBlur} setValue={setValue} />
      ) : (
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onBlur()}
          className="modalTableInput"
          placeholder={id === "uri" ? "/api" : "getApi"}
        />
      );
    },
  };

  const columns = useMemo<ColumnDef<ApisType>[]>(
    () => [
      {
        accessorKey: "uri",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "method",
        footer: (props) => props.column.id,
      },
    ],

    []
  );

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: string | number, columnId: any, value: any) => {
        setData((old: DataType) => {
          let copy = JSON.parse(JSON.stringify(old));
          if (!!value) {
            old.controller[copy.controller.length - 1].apis.map((row, idx) => {
              if (idx === rowIndex) {
                const newData = {
                  ...copy.controller[copy.controller.length - 1].apis[rowIndex],
                  [columnId]: value,
                };
                copy.controller[copy.controller.length - 1].apis[rowIndex] =
                  newData;
              }
            });
          }
          return copy;
        });
      },
    },
    debugTable: true,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  {...{
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                  className="tableHeadText"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <div
                    {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`,
                    }}
                  />
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ModalTable;