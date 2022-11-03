import React, { useEffect, useMemo, useRef, useState } from "react";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, RowData, ColumnResizeMode } from "@tanstack/react-table";
import "./Table.scss";
import UseAutosizeTextArea from "./UseAutoSizeTextArea";
import { ControllerType, HeadersType, PropertiesType } from "../../../pages/CreateApi/ApisType";
import TableInfo from "./TableInfo";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// createApi에서 받아오는 props의 type 설정
interface Props {
  activeTab: number;
  selectedController: number;
  selectedApi: number;
  data: PropertiesType[] | HeadersType[];
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  responseType?: string;
}

const Table = ({ activeTab, selectedController, selectedApi, data, state, responseType }: Props) => {
  const defaultColumn: Partial<ColumnDef<PropertiesType | HeadersType>> = {
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

      return id === "required" ? (
        <input value={(value as string) || ""} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} className="tableInput" type="checkbox" />
      ) : (
        <textarea
          value={(value as string) || ""}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="tableInput"
          ref={textAreaRef}
          rows={1}
        />
      );
    },
  };

  const columns = useMemo<ColumnDef<PropertiesType | HeadersType>[]>(
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
              header: responseType ? responseType : "",
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
          ],
    [activeTab]
  );

  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>("onChange");

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: string | number, columnId: any, value: any) => {
        if (!!value && state.data) {
          const newValue = value === "true" ? false : true;
          const type = columnId === "name" ? "name" : columnId === "type" ? "type" : "required";
          if (activeTab === 1) {
            state.data[selectedController].apis[selectedApi].headers.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                const type = columnId === "key" ? "key" : "value";
                state.data[selectedController].apis[selectedApi].headers[rowIndex][type] = value;
              }
            });
          } else if (activeTab === 2) {
            state.data[selectedController].apis[selectedApi].parameters.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                if (type === "required") {
                  state.data[selectedController].apis[selectedApi].parameters[rowIndex][type] = newValue;
                } else {
                  state.data[selectedController].apis[selectedApi].parameters[rowIndex][type] = value;
                }
              }
            });
          } else if (activeTab === 3 || activeTab === 4) {
            const tab = activeTab === 3 ? "query" : "requestBody";
            state.data[selectedController].apis[selectedApi][tab].properties.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                if (type === "required") {
                  state.data[selectedController].apis[selectedApi][tab].properties[rowIndex][type] = newValue;
                } else {
                  state.data[selectedController].apis[selectedApi][tab].properties[rowIndex][type] = value;
                }
              }
            });
          } else if (activeTab === 5 && (responseType === "fail" || responseType === "success")) {
            state.data[selectedController].apis[selectedApi].responses[responseType].properties.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                if (type === "required") {
                  state.data[selectedController].apis[selectedApi].responses[responseType].properties[rowIndex][type] = newValue;
                } else {
                  state.data[selectedController].apis[selectedApi].responses[responseType].properties[rowIndex][type] = value;
                }
              }
            });
          }
        }
      },
    },
    debugTable: true,
  });

  const handleBasicInfo = (e: React.ChangeEvent<HTMLInputElement>, type: string, responseType?: string) => {
    const value = type === "name" ? "name" : type === "type" ? "type" : type === "dtoName" ? "dtoName" : "required";
    if (activeTab === 3 && state.data) {
      if (value === "required") {
        state.data[selectedController].apis[selectedApi].query[value] = e.target.checked;
      } else {
        state.data[selectedController].apis[selectedApi].query[value] = e.target.value;
      }
    } else if (activeTab === 4 && state.data) {
      if (value === "required") {
        state.data[selectedController].apis[selectedApi].requestBody[value] = e.target.checked;
      } else {
        state.data[selectedController].apis[selectedApi].requestBody[value] = e.target.value;
      }
    } else if (activeTab === 5 && state.data) {
      const response = responseType === "fail" ? "fail" : "success";
      const value2 = type === "status" ? "status" : type === "type" ? "type" : "required";
      if (value2 === "required") {
        state.data[selectedController].apis[selectedApi].responses[response][value2] = e.target.checked;
      } else {
        state.data[selectedController].apis[selectedApi].responses[response]["type"] = e.target.value;
      }
    }
  };

  return (
    <div>
      <TableInfo
        activeTab={activeTab}
        handleBasicInfo={handleBasicInfo}
        selectedApi={selectedApi}
        selectedController={selectedController}
        state={state}
        responseType={responseType}
      />
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
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? "isResizing" : ""}`,
                        style: {
                          transform:
                            columnResizeMode === "onEnd" && header.column.getIsResizing()
                              ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
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
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
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
