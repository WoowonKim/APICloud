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
import UseAutosizeTextArea from "./UseAutoSizeTextArea";
import {
  ControllerType,
  HeadersType,
  PropertiesType,
} from "../../../pages/CreateApi/ApisType";
import TableInfo from "./TableInfo";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

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

const Table = ({
  activeTab,
  selectedController,
  selectedApi,
  data,
  state,
  responseType,
}: Props) => {
  const defaultColumn: Partial<ColumnDef<PropertiesType | HeadersType>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue<string>();
      const [value, setValue] = useState<string>(initialValue);

      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      const deleteApi = () => {
        if (activeTab === 1) {
          state.data[selectedController].apis[selectedApi].headers.splice(
            index,
            1
          );
        } else if (activeTab === 2) {
          state.data[selectedController].apis[selectedApi].parameters.splice(
            index,
            1
          );
        } else if (activeTab === 3 || activeTab === 4) {
          const tab = activeTab === 3 ? "query" : "requestBody";
          state.data[selectedController].apis[selectedApi][
            tab
          ].properties.splice(index, 1);
        } else if (
          activeTab === 5 &&
          (responseType === "fail" || responseType === "success")
        ) {
          state.data[selectedController].apis[selectedApi].responses[
            responseType
          ].responseBody.properties.splice(index, 1);
        }
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      const textAreaRef = useRef<HTMLTextAreaElement>(null);
      UseAutosizeTextArea(textAreaRef.current, value);

      return id === "required" ? (
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="tableInput"
          type="checkbox"
        />
      ) : id === "delete" ? (
        <FontAwesomeIcon
          icon={faRemove}
          className="removeIcon"
          onClick={deleteApi}
        />
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
            {
              accessorKey: "delete",
              footer: (props) => props.column.id,
              size: 50,
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
            {
              accessorKey: "delete",
              footer: (props) => props.column.id,
              size: 50,
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
                {
                  accessorKey: "delete",
                  footer: (props) => props.column.id,
                  size: 50,
                },
              ],
            },
          ],
    [activeTab]
  );

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
        if (!!value && state.data) {
          const newValue = value === "true" ? false : true;
          const type =
            columnId === "name"
              ? "name"
              : columnId === "type"
              ? "type"
              : "required";
          if (activeTab === 1) {
            state.data[selectedController].apis[selectedApi].headers.map(
              (row, idx) => {
                if (idx === rowIndex && state.data) {
                  const type = columnId === "key" ? "key" : "value";
                  state.data[selectedController].apis[selectedApi].headers[
                    rowIndex
                  ][type] = value;
                }
              }
            );
          } else if (activeTab === 2) {
            state.data[selectedController].apis[selectedApi].parameters.map(
              (row, idx) => {
                if (idx === rowIndex && state.data) {
                  if (type === "required") {
                    state.data[selectedController].apis[selectedApi].parameters[
                      rowIndex
                    ][type] = newValue;
                  } else {
                    state.data[selectedController].apis[selectedApi].parameters[
                      rowIndex
                    ][type] = value;
                  }
                }
              }
            );
          } else if (activeTab === 3 || activeTab === 4) {
            const tab = activeTab === 3 ? "query" : "requestBody";
            state.data[selectedController].apis[selectedApi][
              tab
            ].properties.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                if (type === "required") {
                  state.data[selectedController].apis[selectedApi][
                    tab
                  ].properties[rowIndex][type] = newValue;
                } else {
                  state.data[selectedController].apis[selectedApi][
                    tab
                  ].properties[rowIndex][type] = value;
                }
              }
            });
          } else if (
            activeTab === 5 &&
            (responseType === "fail" || responseType === "success")
          ) {
            state.data[selectedController].apis[selectedApi].responses[
              responseType
            ].responseBody.properties.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                if (type === "required") {
                  state.data[selectedController].apis[selectedApi].responses[
                    responseType
                  ].responseBody.properties[rowIndex][type] = newValue;
                } else {
                  state.data[selectedController].apis[selectedApi].responses[
                    responseType
                  ].responseBody.properties[rowIndex][type] = value;
                }
              }
            });
          }
        }
      },
    },
    debugTable: true,
  });

  const handleBasicInfo = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    type: string,
    responseType?: string
  ) => {
    const key =
      type === "name"
        ? "name"
        : type === "type"
        ? "type"
        : type === "dtoName"
        ? "dtoName"
        : "required";
    if (activeTab === 3 && state.data) {
      if (typeof e !== "string" && key === "required") {
        state.data[selectedController].apis[selectedApi].query[key] =
          e.target.checked;
      } else if (
        typeof e !== "string" &&
        (key === "name" || key === "dtoName")
      ) {
        state.data[selectedController].apis[selectedApi].query[key] =
          e.target.value;
      } else if (typeof e === "string" && key === "type") {
        state.data[selectedController].apis[selectedApi].query[key] = e;
      }
    } else if (activeTab === 4 && state.data) {
      if (typeof e !== "string" && key === "required") {
        state.data[selectedController].apis[selectedApi].requestBody[key] =
          e.target.checked;
      } else if (
        typeof e !== "string" &&
        (key === "name" || key === "dtoName")
      ) {
        state.data[selectedController].apis[selectedApi].requestBody[key] =
          e.target.value;
      } else if (typeof e === "string" && key === "type") {
        state.data[selectedController].apis[selectedApi].requestBody[key] = e;
      }
    } else if (activeTab === 5 && state.data) {
      const response = responseType === "fail" ? "fail" : "success";
      const key2 =
        type === "name"
          ? "name"
          : type === "type"
          ? "type"
          : type === "dtoName"
          ? "dtoName"
          : type === "status"
          ? "status"
          : "required";
      if (typeof e !== "string" && key2 === "required") {
        state.data[selectedController].apis[selectedApi].responses[
          response
        ].responseBody[key2] = e.target.checked;
      } else if (
        typeof e !== "string" &&
        (key2 === "name" || key2 === "dtoName")
      ) {
        state.data[selectedController].apis[selectedApi].responses[
          response
        ].responseBody[key2] = e.target.value;
      } else if (typeof e !== "string" && key2 === "status") {
        state.data[selectedController].apis[selectedApi].responses[response][
          key2
        ] = Number(e.target.value);
      } else if (typeof e === "string" && key2 === "type") {
        state.data[selectedController].apis[selectedApi].responses[
          response
        ].responseBody[key2] = e;
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
