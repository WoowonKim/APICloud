import React, {
  useCallback,
  useEffect,
  useMemo,
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
import "./Table.scss";
import UseAutosizeTextArea from "./UseAutoSizeTextArea";
import {
  DataType,
  HeaderType,
  PropertiesType,
} from "../../../pages/CreateApi/ApisType";
import TableInfo from "./TableInfo";

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
  data: PropertiesType[] | HeaderType[];
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  wholeData: DataType;
}

const Table = ({
  activeTab,
  selectedController,
  selectedApi,
  data,
  setData,
  wholeData,
}: Props) => {
  const defaultColumn: Partial<ColumnDef<PropertiesType | HeaderType>> = {
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
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="tableInput"
          type="checkbox"
          checked={value === "true" ? true : false}
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

  const columns = useMemo<ColumnDef<PropertiesType | HeaderType>[]>(
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
                  accessorKey: "status",
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
                  accessorKey: "status1",
                  footer: (props) => props.column.id,
                },
                {
                  accessorKey: "type1",
                  footer: (props) => props.column.id,
                },
                {
                  accessorKey: "required1",
                  footer: (props) => props.column.id,
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
        setData((old: DataType) => {
          let copy = JSON.parse(JSON.stringify(old));
          if (!!value) {
            if (activeTab === 1) {
              old.controller[selectedController].apis[selectedApi].header.map(
                (row, idx) => {
                  if (idx === rowIndex) {
                    const newData = {
                      ...copy.controller[selectedController].apis[selectedApi]
                        .header[rowIndex],
                      [columnId]: value,
                    };
                    copy.controller[selectedController].apis[
                      selectedApi
                    ].header[rowIndex] = newData;
                  }
                }
              );
            } else if (activeTab === 2) {
              old.controller[selectedController].apis[
                selectedApi
              ].parameters.map((row, idx) => {
                if (idx === rowIndex) {
                  const newValue = value === "true" ? "false" : "true";
                  const newData = {
                    ...copy.controller[selectedController].apis[selectedApi]
                      .parameters[rowIndex],
                    [columnId]: columnId === "required" ? newValue : value,
                  };
                  copy.controller[selectedController].apis[
                    selectedApi
                  ].parameters[rowIndex] = newData;
                }
              });
            } else if (activeTab === 3) {
              old.controller[selectedController].apis[
                selectedApi
              ].query.properties.map((row, idx) => {
                if (idx === rowIndex) {
                  const newData = {
                    ...copy.controller[selectedController].apis[selectedApi]
                      .query.properties[rowIndex],
                    [columnId]: value,
                  };
                  copy.controller[selectedController].apis[
                    selectedApi
                  ].query.properties[rowIndex] = newData;
                }
              });
            } else if (activeTab === 4) {
              old.controller[selectedController].apis[
                selectedApi
              ].requestBody.properties.map((row, idx) => {
                if (idx === rowIndex) {
                  const newData = {
                    ...copy.controller[selectedController].apis[selectedApi]
                      .requestBody.properties[rowIndex],
                    [columnId]: value,
                  };
                  copy.controller[selectedController].apis[
                    selectedApi
                  ].requestBody.properties[rowIndex] = newData;
                }
              });
            } else {
              old.controller[selectedController].apis[
                selectedApi
              ].responses.fail.properties.map((row, idx) => {
                if (idx === rowIndex) {
                  const newData = {
                    ...copy.controller[selectedController].apis[selectedApi]
                      .responses.fail.properties[rowIndex],
                    [columnId]: value,
                  };
                  copy.controller[selectedController].apis[
                    selectedApi
                  ].responses.fail.properties[rowIndex] = newData;
                }
              });
              old.controller[selectedController].apis[
                selectedApi
              ].responses.success.properties.map((row, idx) => {
                if (idx === rowIndex) {
                  const newData = {
                    ...copy.controller[selectedController].apis[selectedApi]
                      .responses.success.properties[rowIndex],
                    [columnId]: value,
                  };
                  copy.controller[selectedController].apis[
                    selectedApi
                  ].responses.success.properties[rowIndex] = newData;
                }
              });
            }
          }
          return copy;
        });
      },
    },
    debugTable: true,
  });

  const handleBasicInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    responseType?: string
  ) => {
    setData((old: DataType) => {
      let copy = JSON.parse(JSON.stringify(old));
      if (activeTab === 3) {
        copy.controller[selectedController].apis[selectedApi].query = {
          ...old.controller[selectedController].apis[selectedApi].query,
          [type]: type === "required" ? e.target.checked : e.target.value,
        };
      } else if (activeTab === 4) {
        copy.controller[selectedController].apis[selectedApi].requestBody = {
          ...old.controller[selectedController].apis[selectedApi].requestBody,
          [type]: type === "required" ? e.target.checked : e.target.value,
        };
      } else if (activeTab === 5 && responseType) {
        if (responseType === "fail") {
          copy.controller[selectedController].apis[selectedApi].responses.fail =
            {
              ...old.controller[selectedController].apis[selectedApi].responses
                .fail,
              [type]: type === "required" ? e.target.checked : e.target.value,
            };
        } else if (responseType === "success") {
          copy.controller[selectedController].apis[
            selectedApi
          ].responses.success = {
            ...old.controller[selectedController].apis[selectedApi].responses
              .success,
            [type]: type === "required" ? e.target.checked : e.target.value,
          };
        }
      }
      return copy;
    });
  };

  return (
    <div>
      <TableInfo
        activeTab={activeTab}
        handleBasicInfo={handleBasicInfo}
        selectedApi={selectedApi}
        selectedController={selectedController}
        wholeData={wholeData}
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
