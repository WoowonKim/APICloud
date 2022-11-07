import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ApisType, ControllerType } from "../../../pages/CreateApi/ApisType";
import "../ControllerAddModal/ControllerAddModal.scss";
import { faInfo, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectTypes from "../SelectTypes/SelectTypes";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";

// ControllerAddModal에서 받아오는 props의 type 설정
interface Props {
  data: ApisType[];
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  selectedController: number;
  selectedApi: number;
  propertiesIndex: number;
  responseType?: string;
  activeTab: number;
  deleteRow: (index: number, depth: number, propIndex?: number) => void;
}
const DtoModalTable = ({
  data,
  state,
  selectedApi,
  selectedController,
  propertiesIndex,
  activeTab,
  responseType,
  deleteRow,
}: Props) => {
  const defaultColumn: Partial<ColumnDef<ApisType>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue<string>();
      const [value, setValue] = useState<string>(initialValue);
      const rootPath = state.data[selectedController].apis[selectedApi];

      const onBlur = (temp?: string) => {
        table.options.meta?.updateData(index, id, temp ? temp : value);
        if (temp) {
          setValue(id === "type" && temp === "List" ? "String" : temp);
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
          onClick={() => deleteRow(index, 2, propertiesIndex)}
        />
      ) : id === "type" ? (
        <div className="typeInfoContainer">
          {activeTab === 2 &&
          rootPath.parameters[propertiesIndex].properties[index]
            .collectionType === "List" ? (
            <SelectTypes
              onBlur={onBlur}
              setValue={setValue}
              value={"List"}
              isCollection={true}
            />
          ) : activeTab === 3 &&
            rootPath.queries[propertiesIndex].properties[index]
              .collectionType === "List" ? (
            <SelectTypes
              onBlur={onBlur}
              setValue={setValue}
              value={"List"}
              isCollection={true}
            />
          ) : activeTab === 4 &&
            rootPath.requestBody.properties[propertiesIndex].properties[index]
              .collectionType === "List" ? (
            <SelectTypes
              onBlur={onBlur}
              setValue={setValue}
              value={"List"}
              isCollection={true}
            />
          ) : activeTab === 5 &&
            (responseType === "fail" || responseType === "success") &&
            rootPath.responses[responseType].responseBody.properties[
              propertiesIndex
            ].properties[index].collectionType === "List" ? (
            <SelectTypes
              onBlur={onBlur}
              setValue={setValue}
              value={"List"}
              isCollection={true}
            />
          ) : (
            <></>
          )}
          <SelectTypes onBlur={onBlur} setValue={setValue} value={value} />
          {value === "Object" && (
            <FontAwesomeIcon icon={faInfo} className="infoIcon" />
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

  const columns = useMemo<ColumnDef<ApisType>[]>(
    () => [
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
    []
  );

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: string | number, columnId: any, value: any) => {
        if (!!value) {
          const rootPath = state.data[selectedController].apis[selectedApi];
          const newValue = value === "true" ? false : true;
          const type =
            columnId === "name"
              ? "name"
              : columnId === "type"
              ? "type"
              : "required";
          if (activeTab === 2 || activeTab === 3) {
            const tab = activeTab === 3 ? "queries" : "parameters";
            rootPath[tab][propertiesIndex].properties.map((row, idx) => {
              if (idx === rowIndex && type === "required") {
                rootPath[tab][propertiesIndex].properties[rowIndex][type] =
                  newValue;
              } else if (
                idx === rowIndex &&
                (type === "name" || type === "type")
              ) {
                if (type === "type" && value === "List") {
                  rootPath[tab][propertiesIndex].properties[
                    rowIndex
                  ].collectionType = "List";
                  rootPath[tab][propertiesIndex].properties[rowIndex][type] =
                    "String";
                } else if (type === "type" && value === "X") {
                  rootPath[tab][propertiesIndex].properties[
                    rowIndex
                  ].collectionType = "";
                } else {
                  rootPath[tab][propertiesIndex].properties[rowIndex][type] =
                    value;
                }
              }
            });
          } else if (activeTab === 4) {
            rootPath.requestBody.properties[propertiesIndex].properties.map(
              (row, idx) => {
                if (idx === rowIndex && type === "required") {
                  rootPath.requestBody.properties[propertiesIndex].properties[
                    rowIndex
                  ][type] = newValue;
                } else if (
                  idx === rowIndex &&
                  (type === "name" || type === "type")
                ) {
                  if (type === "type" && value === "List") {
                    rootPath.requestBody.properties[propertiesIndex].properties[
                      rowIndex
                    ].collectionType = "List";
                    rootPath.requestBody.properties[propertiesIndex].properties[
                      rowIndex
                    ][type] = "String";
                  } else if (type === "type" && value === "X") {
                    rootPath.requestBody.properties[propertiesIndex].properties[
                      rowIndex
                    ].collectionType = "";
                  } else {
                    rootPath.requestBody.properties[propertiesIndex].properties[
                      rowIndex
                    ][type] = value;
                  }
                }
              }
            );
          } else if (
            activeTab === 5 &&
            (responseType === "fail" || responseType === "success")
          ) {
            rootPath.responses[responseType].responseBody.properties[
              propertiesIndex
            ].properties.map((row, idx) => {
              if (idx === rowIndex && type === "required") {
                rootPath.responses[responseType].responseBody.properties[
                  propertiesIndex
                ].properties[rowIndex][type] = newValue;
              } else if (
                idx === rowIndex &&
                (type === "name" || type === "type")
              ) {
                if (type === "type" && value === "List") {
                  rootPath.responses[responseType].responseBody.properties[
                    propertiesIndex
                  ].properties[rowIndex].collectionType = "List";
                  rootPath.responses[responseType].responseBody.properties[
                    propertiesIndex
                  ].properties[rowIndex][type] = "String";
                } else if (type === "type" && value === "X") {
                  rootPath.responses[responseType].responseBody.properties[
                    propertiesIndex
                  ].properties[rowIndex].collectionType = "";
                } else {
                  rootPath.responses[responseType].responseBody.properties[
                    propertiesIndex
                  ].properties[rowIndex][type] = value;
                }
              }
            });
          }
        }
      },
    },
    debugTable: true,
  });

  return (
    <table className="modalTable">
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

export default DtoModalTable;
