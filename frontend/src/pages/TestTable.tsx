import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  ColumnResizeMode,
} from "@tanstack/react-table";
import "../components/CreateApi/Table/Table.scss";
import { ApiType, DataType } from "./Test";
import SelectMethods from "../components/CreateApi/SelectMethods/SelectMethods";
import UseAutosizeTextArea from "../components/CreateApi/Table/UseAutoSizeTextArea";

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

const TestTable = ({ activeTab }: Props) => {
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
              accessorKey: "type",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "value",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "required",
              footer: (props) => props.column.id,
            },
          ]
        : activeTab === 2
        ? [
            {
              accessorKey: "name",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "in",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "required",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "type",
              footer: (props) => props.column.id,
            },
          ]
        : [
            {
              accessorKey: "status",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "description",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "type",
              footer: (props) => props.column.id,
            },
            {
              accessorKey: "name",
              footer: (props) => props.column.id,
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
  console.log(data);

  return (
    <div>
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

export default TestTable;
