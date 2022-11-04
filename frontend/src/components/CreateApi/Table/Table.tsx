import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  ColumnResizeMode,
} from "@tanstack/react-table";
import "./Table.scss";
import {
  ControllerType,
  HeadersType,
  PropertiesType,
} from "../../../pages/CreateApi/ApisType";
import TableInfo from "./TableInfo";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faRemove } from "@fortawesome/free-solid-svg-icons";
import SelectTypes from "../SelectTypes/SelectTypes";
import DtoInputModal from "../DtoInputModal/DtoInputModal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [propertiesIndex, setPropertiesIndex] = useState(-1);

  const addProperties = (index: number, flag?: boolean) => {
    const commonPath = state.data[selectedController].apis[selectedApi];
    const newData = {
      dtoName: "",
      name: "",
      type: "",
      collectionType: "",
      properties: [],
      required: true,
    };
    if (
      activeTab === 2 &&
      (commonPath.parameters[index].properties.length === 0 || flag)
    ) {
      commonPath.parameters[index].properties.push(newData);
    } else if (
      activeTab === 3 &&
      (commonPath.queries[index].properties.length === 0 || flag)
    ) {
      commonPath.queries[index].properties.push(newData);
    } else if (
      activeTab === 4 &&
      (commonPath.requestBody.properties[index].properties.length === 0 || flag)
    ) {
      commonPath.requestBody.properties[index].properties.push(newData);
    } else if (
      activeTab === 5 &&
      (responseType === "fail" || responseType === "success") &&
      (commonPath.responses[responseType].responseBody.properties[index]
        .properties.length === 0 ||
        flag)
    ) {
      commonPath.responses[responseType].responseBody.properties[
        index
      ].properties.push(newData);
    }
  };

  const deleteRow = (index: number, depth: number, propIndex?: number) => {
    if (activeTab === 1) {
      state.data[selectedController].apis[selectedApi].headers.splice(index, 1);
    } else if (activeTab === 2 || activeTab === 3) {
      const tab = activeTab === 3 ? "queries" : "parameters";
      let rootPath =
        depth === 2 && propIndex
          ? state.data[selectedController].apis[selectedApi][tab][propIndex]
              .properties
          : state.data[selectedController].apis[selectedApi][tab];
      rootPath.splice(index, 1);
    } else if (activeTab === 4) {
      let rootPath =
        depth === 2 && propIndex
          ? state.data[selectedController].apis[selectedApi].requestBody
              .properties[propIndex].properties
          : state.data[selectedController].apis[selectedApi].requestBody
              .properties;

      rootPath.splice(index, 1);
    } else if (
      activeTab === 5 &&
      (responseType === "fail" || responseType === "success")
    ) {
      let rootPath =
        depth === 2 && propIndex
          ? state.data[selectedController].apis[selectedApi].responses[
              responseType
            ].responseBody.properties[propIndex].properties
          : state.data[selectedController].apis[selectedApi].responses[
              responseType
            ].responseBody.properties;
      rootPath.splice(index, 1);
    }
  };

  const defaultColumn: Partial<ColumnDef<PropertiesType | HeadersType>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue<string>();
      const [value, setValue] = useState<string>(initialValue);

      const onBlur = (temp?: string) => {
        table.options.meta?.updateData(index, id, temp ? temp : value);
        if (temp) {
          setValue(temp);
        }
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return id === "required" ? (
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onBlur()}
          className="tableInput"
          type="checkbox"
        />
      ) : id === "delete" ? (
        <FontAwesomeIcon
          icon={faRemove}
          className="removeIcon"
          onClick={() => deleteRow(index, 1)}
        />
      ) : id === "type" ? (
        <div className="typeInfoContainer">
          <SelectTypes onBlur={onBlur} setValue={setValue} value={value} />
          {value === "Object" && (
            <FontAwesomeIcon
              icon={faInfo}
              className="infoIcon"
              onClick={() => {
                addProperties(index);
                setPropertiesIndex(index);
                setIsModalVisible(!isModalVisible);
              }}
            />
          )}
        </div>
      ) : (
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onBlur()}
          className="tableInput"
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
          } else if (activeTab === 2 || activeTab === 3) {
            const tab = activeTab === 3 ? "queries" : "parameters";
            state.data[selectedController].apis[selectedApi][tab].map(
              (row, idx) => {
                if (idx === rowIndex && state.data) {
                  if (type === "required") {
                    state.data[selectedController].apis[selectedApi][tab][
                      rowIndex
                    ][type] = newValue;
                  } else {
                    state.data[selectedController].apis[selectedApi][tab][
                      rowIndex
                    ][type] = value;
                  }
                }
              }
            );
          } else if (activeTab === 4) {
            state.data[selectedController].apis[
              selectedApi
            ].requestBody.properties.map((row, idx) => {
              if (idx === rowIndex && state.data) {
                if (type === "required") {
                  state.data[selectedController].apis[
                    selectedApi
                  ].requestBody.properties[rowIndex][type] = newValue;
                } else {
                  state.data[selectedController].apis[
                    selectedApi
                  ].requestBody.properties[rowIndex][type] = value;
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
    depth: number,
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
    if (activeTab === 4 && state.data) {
      let rootPath =
        depth === 1
          ? state.data[selectedController].apis[selectedApi].requestBody
          : state.data[selectedController].apis[selectedApi].requestBody
              .properties[propertiesIndex];
      if (typeof e !== "string" && key === "required") {
        rootPath[key] = e.target.checked;
      } else if (
        typeof e !== "string" &&
        (key === "name" || key === "dtoName")
      ) {
        rootPath[key] = e.target.value;
      } else if (typeof e === "string" && key === "type") {
        rootPath[key] = e;
      }
    } else if (activeTab === 5 && state.data) {
      const response = responseType === "fail" ? "fail" : "success";
      let rootPath =
        depth === 1
          ? state.data[selectedController].apis[selectedApi].responses[response]
              .responseBody
          : state.data[selectedController].apis[selectedApi].responses[response]
              .responseBody.properties[propertiesIndex];
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
        rootPath[key2] = e.target.checked;
      } else if (
        typeof e !== "string" &&
        (key2 === "name" || key2 === "dtoName")
      ) {
        rootPath[key2] = e.target.value;
      } else if (typeof e !== "string" && key2 === "status") {
        state.data[selectedController].apis[selectedApi].responses[response][
          key2
        ] = Number(e.target.value);
      } else if (typeof e === "string" && key2 === "type") {
        rootPath[key2] = e;
      }
    }
  };

  return (
    <div>
      {isModalVisible && (
        <DtoInputModal
          setIsModalVisible={setIsModalVisible}
          activeTab={activeTab}
          state={state}
          selectedController={selectedController}
          selectedApi={selectedApi}
          propertiesIndex={propertiesIndex}
          responseType={responseType}
          handleBasicInfo={handleBasicInfo}
          addProperties={addProperties}
          deleteRow={deleteRow}
        />
      )}
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
