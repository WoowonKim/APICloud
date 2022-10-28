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
import { ApiListType, ApiType } from "../../../pages/CreateApi/CreateApi";
import "./Table.scss";
import SelectMethods from "../SelectMethods/SelectMethods";
import UseAutosizeTextArea from "./UseAutoSizeTextArea";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// defaultColumn 설정
const defaultColumn: Partial<ColumnDef<ApiType>> = {
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

// createApi에서 받아오는 props의 type 설정
interface Props {
  datas: ApiListType[];
  data: ApiType[];
  setData: Dispatch<SetStateAction<ApiListType[]>>;
  dataIndex: number;
  url: string;
}

const Table = ({ data, setData, url, datas, dataIndex }: Props) => {
  // column 설정
  const columns = useMemo<ColumnDef<ApiType>[]>(
    () => [
      {
        accessorKey: "detailUri",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "summary",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "method",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "param",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "requestBody",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "header",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "successResponseBody",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "failResponseBody",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  // column 크기 변경 설정
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");

  const rerender = useReducer(() => ({}), {})[1];

  // table 설정
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) => {
          let copy = [...old];
          if (!!value) {
            copy[dataIndex].details.map((row, idx) => {
              if (idx === rowIndex) {
                const newData = {
                  ...copy[dataIndex].details[rowIndex]!,
                  [columnId]: value,
                };
                copy[dataIndex].details[rowIndex] = newData;
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
    <>
      <input
        type="text"
        className="commonUri"
        value={url}
        onChange={(e) => {
          let copy = [...datas];
          copy[dataIndex] = { url: e.target.value, details: [...data] };
          setData(copy);
        }}
      />
      <div>
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
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
                                    table.getState().columnSizingInfo
                                      .deltaOffset
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
                      <td
                        {...{
                          key: cell.id,
                          style: {
                            width: cell.column.getSize(),
                          },
                        }}
                      >
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
    </>
  );
};

export default Table;
