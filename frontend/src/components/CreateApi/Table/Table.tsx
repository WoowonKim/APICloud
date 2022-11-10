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
  setDepth: React.Dispatch<React.SetStateAction<number>>;
  depth: number;
}

const Table = ({
  activeTab,
  selectedController,
  selectedApi,
  data,
  state,
  responseType,
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [propertiesIndex, setPropertiesIndex] = useState(-1);
  const [final, setFinal] = useState<PropertiesType>();
  const [propertiesIndexList, setPropertiesIndexList] = useState<number[]>([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);
  const [nameList, setNameList] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const path =
    activeTab === 2
      ? state.data[selectedController].apis[selectedApi].parameters
      : activeTab === 3
      ? state.data[selectedController].apis[selectedApi].queries
      : activeTab === 4
      ? state.data[selectedController].apis[selectedApi].requestBody.properties
      : activeTab === 5 &&
        (responseType === "fail" || responseType === "success")
      ? state.data[selectedController].apis[selectedApi].responses[responseType]
          .responseBody.properties
      : state.data[selectedController].apis[selectedApi].parameters;

  const getDepth = (
    idx: number,
    datas: any,
    isAdd: boolean,
    isNew: boolean,
    isDelete: boolean
  ) => {
    const newData = {
      dtoName: "",
      name: "",
      type: "String",
      collectionType: "",
      properties: [],
      required: true,
    };

    const queue = [path, "flag"];
    const levels = [0];

    while (queue.length !== 1) {
      const current = queue.shift();
      if (JSON.stringify(current) === JSON.stringify(datas)) {
        if (current && typeof current !== "string" && isDelete) {
          current.splice(idx, 1);
        } else if (current && typeof current !== "string" && isAdd && isNew) {
          if (
            current.length > idx + 1 &&
            current[idx].properties.length === 0
          ) {
            current[idx].properties.push(newData);
          }
        } else if (current && typeof current !== "string" && isAdd) {
          current.push(newData);
        }
        break;
      }

      if (current === "flag") {
        levels.push(0);
        queue.push("flag");
      }

      if (current && current !== "flag" && typeof current !== "string") {
        levels[levels.length - 1]++;
        for (let item of current) {
          queue.push(item.properties);
        }
      }
    }
    return levels.length + 1;
  };

  const defaultColumn: Partial<ColumnDef<PropertiesType | HeadersType>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue<string>();
      const [value, setValue] = useState<string>(initialValue);

      const onBlur = (temp?: string) => {
        table.options.meta?.updateData(index, id, temp ? temp : value);
        if (temp) {
          setValue(id === "type" && temp === "List" ? "String" : temp);
        }
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue, data]);

      let tablePath =
        activeTab === 5
          ? activeTab === 5 &&
            (responseType === "fail" || responseType === "success") &&
            rootPath.responses[responseType].responseBody.properties[index]
              ?.collectionType === "List"
          : activeTab === 3
          ? rootPath.queries[index]?.collectionType === "List"
          : activeTab === 4
          ? rootPath.requestBody.properties[index]?.collectionType
          : rootPath.parameters[index]?.collectionType;

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
          onClick={() => getDepth(index, data, false, false, true)}
        />
      ) : id === "type" ? (
        <div className="typeInfoContainer">
          {tablePath && (
            <SelectTypes
              onBlur={onBlur}
              setValue={setValue}
              value={"List"}
              isCollection={true}
            />
          )}
          <SelectTypes onBlur={onBlur} setValue={setValue} value={value} />
          {value === "Object" && (
            <FontAwesomeIcon
              icon={faInfo}
              className="infoIcon"
              onClick={() => {
                let properties = [...propertiesIndexList];
                properties[0] = index;
                setPropertiesIndexList(properties);
                getDepth(index, data, true, true, false);
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

  useEffect(() => {
    setPropertiesIndexList([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  }, [activeTab, propertiesIndex]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: string | number, columnId: any, value: any) => {
        if (!!value && state.data) {
          const requiredValue = value === "true" ? false : true;
          const type =
            columnId === "name"
              ? "name"
              : columnId === "type"
              ? "type"
              : "required";
          const tableUpdatePath =
            activeTab === 5 &&
            (responseType === "fail" || responseType === "success")
              ? rootPath.responses[responseType].responseBody.properties
              : activeTab === 2
              ? rootPath.parameters
              : activeTab === 3
              ? rootPath.queries
              : rootPath.requestBody.properties;

          if (activeTab === 1) {
            rootPath.headers.map((row, idx) => {
              if (idx === rowIndex) {
                const headersType = columnId === "key" ? "key" : "value";
                rootPath.headers[rowIndex][headersType] = value;
              }
            });
          } else {
            tableUpdatePath.map((row, idx) => {
              if (idx === rowIndex) {
                if (type === "required") {
                  tableUpdatePath[rowIndex][type] = requiredValue;
                } else if (type === "type" && value === "List") {
                  tableUpdatePath[rowIndex].collectionType = "List";
                  tableUpdatePath[rowIndex][type] = "String";
                } else if (type === "type" && value === "X") {
                  tableUpdatePath[rowIndex].collectionType = "";
                } else {
                  tableUpdatePath[rowIndex][type] = value;
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
    responseType: string
  ) => {
    const key =
      activeTab === 5
        ? type === "name"
          ? "name"
          : type === "type"
          ? "type"
          : type === "dtoName"
          ? "dtoName"
          : type === "status"
          ? "status"
          : "required"
        : type === "name"
        ? "name"
        : type === "type"
        ? "type"
        : type === "dtoName"
        ? "dtoName"
        : "required";
    const index =
      propertiesIndexList[0] !== -1 ? propertiesIndexList[0] : propertiesIndex;
    let infoPath =
      activeTab === 5 && (responseType === "fail" || responseType === "success")
        ? rootPath.responses[responseType].responseBody
        : activeTab === 3
        ? rootPath.queries[index]
        : activeTab === 4
        ? rootPath.requestBody
        : rootPath.parameters[index];
    let i = activeTab === 2 || activeTab === 3 ? 1 : 0;
    if (depth !== 1 && (activeTab === 4 || activeTab === 5)) {
      infoPath = infoPath.properties[index];
    }
    for (i; i < depth - 1; i++) {
      if (propertiesIndexList[i] !== -1) {
        infoPath = infoPath.properties[propertiesIndexList[i]];
      }
    }
    if (depth === 1) {
      if (typeof e !== "string" && key === "required") {
        infoPath[key] = e.target.checked;
      } else if (
        typeof e !== "string" &&
        (key === "name" || key === "dtoName")
      ) {
        infoPath[key] = e.target.value;
      } else if (typeof e === "string" && key === "type") {
        if (e === "List") {
          infoPath.collectionType = "List";
          infoPath[key] = "String";
        } else if (e === "X") {
          infoPath.collectionType = "";
        } else {
          infoPath[key] = e;
        }
      }
      if (activeTab === 5) {
        if (
          typeof e !== "string" &&
          key === "status" &&
          (responseType === "fail" || responseType === "success")
        ) {
          state.data[selectedController].apis[selectedApi].responses[
            responseType
          ][key] = Number(e.target.value);
        }
      }
    } else {
      if (typeof e !== "string" && key === "dtoName") {
        infoPath[key] = e.target.value;
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
          setPropertiesIndexList={setPropertiesIndexList}
          propertiesIndexList={propertiesIndexList}
          setFinal={setFinal}
          final={final}
          getDepth={getDepth}
          setNameList={setNameList}
          nameList={nameList}
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
