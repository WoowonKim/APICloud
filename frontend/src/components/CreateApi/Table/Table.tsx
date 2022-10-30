import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  ColumnResizeMode,
} from "@tanstack/react-table";
import "./Table.scss";
import SelectMethods from "../SelectMethods/SelectMethods";
import UseAutosizeTextArea from "./UseAutoSizeTextArea";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export type ColumnType = {
  key?: string;
  value?: string;
  type?: string;
  status?: number;
  description?: string;
  required?: boolean;
  in?: string;
  name?: string;
};

// createApi에서 받아오는 props의 type 설정
interface Props {
  activeTab: number;
}

const Table = ({ activeTab }: Props) => {
  const defaultColumn: Partial<ColumnDef<ColumnType>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue<string>();
      const [value, setValue] = useState<string>(initialValue);

      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      const textAreaRef = useRef<HTMLTextAreaElement>(null);
      UseAutosizeTextArea(textAreaRef.current, value);

      return id === "method" ? (
        <SelectMethods />
      ) : (
        <textarea
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="tableInput"
          ref={textAreaRef}
          rows={1}
        />
      );
    },
  };

  const columns = useMemo<ColumnDef<ColumnType>[]>(
    () =>
      activeTab === 1
        ? [
            {
              accessorKey: "key",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "value",
              footer: (props) => props.column.id,
            },
          ]
        : activeTab === 2 || activeTab === 3 || activeTab === 4
        ? [
            {
              accessorKey: "name",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "type",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "required",
              footer: (props) => props.column.id,
            },
          ]
        : [
            {
              header: "success",
              footer: (props) => props.column.id,
              columns: [
                {
                  accessorKey: "name",
                  footer: (props) => props.column.id,
                },
                {
                  accessorKey: "type",
                  footer: (props) => props.column.id,
                },
                {
                  accessorKey: "required",
                  footer: (props) => props.column.id,
                },
              ],
            },
            {
              header: "fail",
              footer: (props) => props.column.id,
              columns: [
                {
                  accessorKey: "name1",
                  footer: (props) => props.column.id,
                },
                {
                  accessorKey: "type1",
                  footer: (props) => props.column.id,
                },
                {
                  accessorKey: "required1s",
                  footer: (props) => props.column.id,
                },
              ],
            },
          ],
    [activeTab]
  );

  const [data, setData] = useState<ColumnType[]>([
    {
      key: "",
      value: "",
      type: "",
      status: 200,
      description: "",
    },
  ]);

  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: string | number, columnId: any, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <div>
      {activeTab === 3 || activeTab === 4 ? (
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id="name" />
          <label htmlFor="type">type</label>
          <input type="text" id="type" />
          <label htmlFor="required">required</label>
          <input type="checkbox" id="required" />
        </div>
      ) : activeTab === 5 ? (
        <div>
          <div>
            <p>Success</p>
            <label htmlFor="successName">name</label>
            <input type="text" id="successName" />
            <label htmlFor="successType">type</label>
            <input type="text" id="successType" />
            <label htmlFor="successRequired">required</label>
            <input type="checkbox" id="successRequired" />
          </div>
          <div>
            <p>Fail</p>
            <label htmlFor="failName">name</label>
            <input type="text" id="failName" />
            <label htmlFor="failType">type</label>
            <input type="text" id="failType" />
            <label htmlFor="failRequired">required</label>
            <input type="checkbox" id="failRequired" />
          </div>
        </div>
      ) : (
        <></>
      )}
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
                        style: {
                          transform:
                            columnResizeMode === "onEnd" &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : "",
                        },
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
