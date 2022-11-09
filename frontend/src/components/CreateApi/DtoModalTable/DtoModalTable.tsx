import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { PropertiesType } from "../../../pages/CreateApi/ApisType";
import "../ControllerAddModal/ControllerAddModal.scss";
import { faInfo, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectTypes from "../SelectTypes/SelectTypes";

// ControllerAddModal에서 받아오는 props의 type 설정
interface Props {
  data: PropertiesType[];
  propertiesIndex: number;
  activeTab: number;
  setPropertiesIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  propertiesIndexList: number[];
  getDepth: (
    idx: number,
    datas: PropertiesType[],
    isAdd: boolean,
    isNew: boolean,
    isDelete: boolean
  ) => number;
  setModalDepth: React.Dispatch<React.SetStateAction<number>>;
  modalDepth: number;
  path: PropertiesType;
  final: PropertiesType | undefined;
}
const DtoModalTable = ({
  data,
  propertiesIndex,
  activeTab,
  setPropertiesIndexList,
  propertiesIndexList,
  getDepth,
  setModalDepth,
  modalDepth,
  path,
  final,
}: Props) => {
  const [plz, setPlz] = useState(data);
  useEffect(() => {
    setPlz(data);
  }, [data, activeTab, final]);
  const defaultColumn: Partial<ColumnDef<PropertiesType>> = {
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
      }, [initialValue, modalDepth, data, index]);

      let copyPath = path;
      if (modalDepth > 3 || modalDepth === 3) {
        let i = activeTab === 2 || activeTab === 3 ? 1 : 0;
        for (i; i < modalDepth - 1; i++) {
          if (propertiesIndexList[i] !== -1) {
            copyPath = copyPath.properties[propertiesIndexList[i]];
          }
        }
      } else if (activeTab === 4 || activeTab === 5) {
        copyPath = copyPath.properties[propertiesIndex];
      }

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
          onClick={() =>
            final && getDepth(index, final.properties, false, false, true)
          }
        />
      ) : id === "type" ? (
        <div className="typeInfoContainer">
          {copyPath && copyPath.properties[index].collectionType === "List" && (
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
              onClick={() => handleObject(index)}
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

  const handleObject = (index: number) => {
    let copyPath = path;
    const getDepth2 =
      final && getDepth(index, final.properties, false, false, false);

    if ((getDepth2 && getDepth2 > 3) || getDepth2 === 3) {
      for (let i = 1; i < getDepth2 - 2; i++) {
        if (propertiesIndexList[i] !== -1) {
          copyPath = copyPath.properties[propertiesIndexList[i]];
        }
      }
    }
    const newDepth = getDepth(index, copyPath.properties, true, true, false);
    setModalDepth(newDepth);
    let properties = [...propertiesIndexList];
    properties[newDepth - 2] = index;
    setPropertiesIndexList(properties);
  };
  const columns = useMemo<ColumnDef<PropertiesType>[]>(
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
          const requiredValue = value === "true" ? false : true;
          const type =
            columnId === "name"
              ? "name"
              : columnId === "type"
              ? "type"
              : "required";
          let copyPath = path;
          if (modalDepth > 3 || modalDepth === 3) {
            let i = activeTab === 2 || activeTab === 3 ? 1 : 0;
            for (i; i < modalDepth - 1; i++) {
              if (propertiesIndexList[i] !== -1) {
                copyPath = copyPath.properties[propertiesIndexList[i]];
              }
            }
          } else if (activeTab === 4 || activeTab === 5) {
            copyPath = copyPath.properties[propertiesIndex];
          }
          copyPath?.properties.map((row, idx) => {
            if (idx === rowIndex && type === "required") {
              copyPath.properties[rowIndex][type] = requiredValue;
            } else if (
              idx === rowIndex &&
              (type === "name" || type === "type")
            ) {
              if (type === "type" && value === "List") {
                copyPath.properties[rowIndex].collectionType = "List";
                copyPath.properties[rowIndex][type] = "String";
              } else if (type === "type" && value === "X") {
                copyPath.properties[rowIndex].collectionType = "";
              } else {
                copyPath.properties[rowIndex][type] = value;
              }
            }
          });
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
