import { ControllerType } from "./../../pages/CreateApi/ApisType";
export function checkDtoNameValidation(
  value: string,
  data: any,
  length: number,
  checkData: any,
  flag: boolean
) {
  if (value === null || !value.trim()) {
    return false;
  }

  let i = 0;
  let cnt = 0;
  let existsData = [checkData, null];

  const allDtos = [];
  while (i < length) {
    const queue: any = [data[i]];
    while (queue.length !== 0) {
      const current = queue.shift();
      if (current.dtoName === value && !flag) {
        cnt++;
        if (JSON.stringify(checkData) !== JSON.stringify(current)) {
          existsData[1] = current;
        }
        if (cnt >= 2 && current.properties) {
          return existsData;
        }
      }

      if (current) {
        let item: any;
        for (item in current) {
          if (
            (item === "parameters" || item === "queries") &&
            current[item] &&
            current[item].length > 0
          ) {
            for (let property of current[item]) {
              queue.push(property);
              if (
                property?.dtoName &&
                property.dtoName.trim() &&
                property.type === "Object" &&
                property.properties?.length > 0
              ) {
                allDtos.push(property);
              }
            }
          } else if (
            item === "requestBody" &&
            JSON.stringify(current[item]) !== "{}"
          ) {
            if (current[item]?.dtoName === value && !flag) {
              cnt++;
              if (JSON.stringify(checkData) !== JSON.stringify(current[item])) {
                existsData[1] = current[item];
              }
              if (cnt >= 2 && current[item].properties) {
                return existsData;
              }
              if (
                current[item]?.properties &&
                current[item].properties.length > 0
              ) {
                for (let property of current[item].properties) {
                  queue.push(property);
                }
              }
            }
            if (
              flag &&
              current[item].dtoName &&
              current[item].dtoName.trim() &&
              current[item].type === "Object" &&
              current[item].properties &&
              current[item].properties.length > 0
            ) {
              allDtos.push(current[item]);

              for (let property of current[item].properties) {
                allDtos.push(property);
                queue.push(property);
              }
            }
          } else if (
            item === "responses" &&
            JSON.stringify(current[item] !== "{}")
          ) {
            if (
              current[item]?.fail &&
              current[item].fail.responseBody?.dtoName === value &&
              !flag
            ) {
              cnt++;
              if (
                JSON.stringify(checkData) !==
                JSON.stringify(current[item].fail.responseBody)
              ) {
                existsData[1] = current[item].fail.responseBody;
              }
              if (cnt >= 2 && current[item].fail.responseBody?.properties) {
                return existsData;
              }
            } else if (
              current[item]?.success &&
              current[item].success.responseBody?.dtoName === value &&
              !flag
            ) {
              cnt++;
              if (
                JSON.stringify(checkData) !==
                JSON.stringify(current[item].success.responseBody)
              ) {
                existsData[1] = current[item].success.responseBody;
              }
              if (cnt >= 2 && current[item].success.responseBody?.properties) {
                return existsData;
              }
            }
            for (let i = 0; i < 2; i++) {
              let status = i === 0 ? "fail" : "success";
              if (
                current[item]?.[status] &&
                current[item][status]?.responseBody &&
                current[item][status].responseBody?.properties &&
                current[item][status].responseBody.properties.length > 0
              ) {
                for (let property of current[item][status].responseBody
                  .properties) {
                  queue.push(property);
                  if (
                    flag &&
                    current[item][status].responseBody.dtoName &&
                    current[item][status].responseBody.dtoName.trim() &&
                    current[item][status].responseBody.type === "Object" &&
                    current[item][status].responseBody.properties.length > 0
                  ) {
                    allDtos.push(current[item][status].responseBody);
                    if (
                      property.dtoName &&
                      property.dtoName.trim() &&
                      property.type === "Object" &&
                      property.properties.length > 0
                    ) {
                      allDtos.push(property);
                    }
                  }
                }
              }
            }
          } else {
            if (current?.properties && current.properties.length > 0) {
              for (let property of current.properties) {
                if (!flag) {
                  if (JSON.stringify(checkData) !== JSON.stringify(property)) {
                    existsData[1] = property;
                  }
                  if (
                    cnt >= 2 &&
                    property.properties &&
                    property.properties.length > 0
                  ) {
                    return existsData;
                  }
                }
                if (
                  flag &&
                  property?.dtoName &&
                  property.dtoName.trim() &&
                  property.type === "Object" &&
                  property.properties?.length > 0
                ) {
                  allDtos.push(property);
                }
              }
            }
          }
        }
      }
    }
    i++;
  }
  if (flag) {
    return allDtos;
  }
  return false;
}

export function handleDtoProperties(path: any) {
  path.properties = [];
}

export function getAllDtos(data: any) {
  const queue = [data, "flag"];
  const dtos = [];

  while (queue.length !== 1) {
    const current = queue.shift();

    if (current === "flag") {
      queue.push("flag");
    }

    if (current && current !== "flag" && typeof current !== "string") {
      dtos.push();
    }
  }
}

// 인자로 받은 리스트 내부에 중복된 name의 횟수를 세서 return
export function checkNameValidation(type: string, data: any[]) {
  let nameList: any[] = [];

  if (data?.length === 0) {
    return 0;
  }

  const key = type === "headers" ? "key" : "name";
  if (type !== "name" && type !== "api" && data) {
    for (let item of data) {
      nameList.push(item[key]);
    }
  } else {
    nameList = data;
  }

  const result =
    nameList &&
    nameList.reduce((accu, curr) => {
      accu[curr] = (accu[curr] || 0) + 1;
      return accu;
    }, {});

  let cnt = 0;
  for (let item in result) {
    if (result[item] > 1) {
      cnt += result[item] - 1;
    }
  }
  return cnt;
}

// 인자로 받은 객체의 type 유효성을 확인 후 결과를 return
export function checkTypeValidation(item: any) {
  // checkList[0] - dtoName 존재 여부
  // checkList[1] - type object 여부
  // checkList[2] - properties 존재 여부
  const checkList = [0, 0, 0];
  if (item && Object.keys(item).length === 0) {
    return "false";
  }
  if (item?.dtoName && item.dtoName.trim()) {
    checkList[0] = 1;
  }
  if (item?.type === "Object") {
    checkList[1] = 1;
  }
  if (item?.properties && item?.properties.length > 0) {
    checkList[2] = 1;
  }

  for (let checkIdx = 0; checkIdx < 3; checkIdx++) {
    const idxList = checkIdx === 0 ? [1, 2] : checkIdx === 1 ? [0, 2] : [0, 1];
    if (checkList[checkIdx]) {
      if (!checkList[idxList[0]] || !checkList[idxList[1]]) {
        return false;
      }
    } else {
      if (checkList[idxList[0]] || checkList[idxList[1]]) {
        return false;
      }
    }
  }
  return true;
}

// 인자로 받은 객체에 필수값의 존재 여부를 판단 후 결과를 return
export function checkRequiredValueValidation(type: string, item: any) {
  if (item && Object.keys(item).length === 0) {
    return "false";
  }
  if (type === "headers" && item.key && item.value) {
    if (
      item["key"] &&
      !item["key"].trim() &&
      item["value"] &&
      !item["value"].trim()
    ) {
      return "delete";
    } else if (!item["key"].trim() || !item["value"].trim()) {
      return false;
    }
  } else if (type === "properties") {
    if (
      item["name"] === null ||
      item["properties"] === null ||
      !item["name"]?.trim()
    ) {
      return "delete";
    } else if (!item["name"].trim()) {
      return false;
    }
  }

  return true;
}

// controllers 전체를 탐색하며 유효성 검사 후 결과 값 return
export function checkDataValidation(data: ControllerType[]) {
  const controllersLength = data.length;

  let nameInvalidCount = 0;
  let propertiesNameInvalidCount = 0;
  let typeInvalidCount = 0;
  let requiredValueInvalidCount = 0;

  for (
    let controllerIndex = 0;
    controllerIndex < controllersLength;
    controllerIndex++
  ) {
    let i = 0;
    let apisLength = data[controllerIndex].apis.length;

    while (i < apisLength) {
      const queue: any = [data[controllerIndex].apis[i]];
      const checkNameList: any[] = [];
      while (queue.length !== 0) {
        let current = queue.shift();
        if (current) {
          let item: any;
          for (item in current) {
            if (item === "headers") {
              propertiesNameInvalidCount += checkNameValidation(
                "headers",
                current[item]
              );
              if (current[item]) {
                for (
                  let headerIdx = 0;
                  headerIdx < current[item].length;
                  headerIdx++
                ) {
                  let headerValidation = checkRequiredValueValidation(
                    "headers",
                    current[item][headerIdx]
                  );
                  if (headerValidation === "delete") {
                    current[item].splice(headerIdx, 1);
                  } else if (!headerValidation) {
                    requiredValueInvalidCount++;
                  }
                }
              }
            } else if (
              (item === "queries" || item === "parameters") &&
              current[item]
            ) {
              for (
                let queryIdx = 0;
                queryIdx < current[item].length;
                queryIdx++
              ) {
                current[item][queryIdx].name &&
                  current[item][queryIdx].name.trim() &&
                  checkNameList.push(current[item][queryIdx].name);
                let queryValueValidation = checkRequiredValueValidation(
                  "properties",
                  current[item][queryIdx]
                );
                if (queryValueValidation === "delete") {
                  current[item].splice(queryIdx, 1);
                } else if (!queryValueValidation) {
                  requiredValueInvalidCount++;
                }
                if (current[item][queryIdx]?.required === true) {
                  let queryTypeValidation = checkTypeValidation(
                    current[item][queryIdx]
                  );
                  if (!queryTypeValidation) {
                    typeInvalidCount++;
                  }
                }
                if (
                  current[item].length > 0 &&
                  current[item][queryIdx]?.properties &&
                  current[item][queryIdx].properties.length > 0
                ) {
                  for (
                    let queryPropIdx = 0;
                    queryPropIdx < current[item][queryIdx].properties.length;
                    queryPropIdx++
                  ) {
                    queue.push(
                      current[item][queryIdx].properties[queryPropIdx]
                    );
                  }
                }
              }
            } else if (item === "requestBody") {
              let requestBodyValueValidation = checkRequiredValueValidation(
                "properties",
                current[item]
              );
              if (!requestBodyValueValidation) {
                requiredValueInvalidCount++;
              }
              if (current[item]?.name && current[item].name.trim()) {
                checkNameList.push(current[item]?.name);
              }
              if (current[item]?.required === true) {
                let requestBodyTypeValidation = checkTypeValidation(
                  current[item]
                );
                if (!requestBodyTypeValidation) {
                  typeInvalidCount++;
                }
              }
              if (
                JSON.stringify(current[item]) !== "{}" &&
                current[item]?.properties &&
                current[item].properties?.length > 0
              ) {
                for (
                  let requestBodyIdx = 0;
                  requestBodyIdx < current[item].properties.length;
                  requestBodyIdx++
                ) {
                  let requestBodyPropertyCheck = checkRequiredValueValidation(
                    "properties",
                    current[item].properties[requestBodyIdx]
                  );
                  if (requestBodyPropertyCheck === "delete") {
                    current[item].properties.splice(requestBodyIdx, 1);
                  } else {
                    queue.push(current[item].properties[requestBodyIdx]);
                  }
                }
              }
            } else if (
              item === "responses" &&
              JSON.stringify(current[item]) !== "{}"
            ) {
              for (let responseIdx = 0; responseIdx < 2; responseIdx++) {
                let status = responseIdx === 0 ? "fail" : "success";
                if (
                  current[item]?.[status] &&
                  current[item][status]?.responseBody
                ) {
                  let responsesValueValidation = checkRequiredValueValidation(
                    "properties",
                    current[item][status].responseBody
                  );
                  if (!responsesValueValidation) {
                    requiredValueInvalidCount++;
                  }
                  if (
                    current[item][status].responseBody?.name &&
                    current[item][status].responseBody.name.trim()
                  ) {
                    checkNameList.push(
                      current[item][status].responseBody?.name
                    );
                  }
                  if (current[item][status]?.responseBody?.required === true) {
                    let responsesTypeCheck = checkTypeValidation(
                      current[item][status].responseBody
                    );
                    if (!responsesTypeCheck) {
                      typeInvalidCount++;
                    }
                  }
                  if (
                    JSON.stringify(current[item][status].responseBody) !==
                      "{}" &&
                    current[item][status].responseBody?.properties &&
                    current[item][status].responseBody.properties?.length > 0
                  ) {
                    for (
                      let responseBodyIdx = 0;
                      responseBodyIdx <
                      current[item][status].responseBody.properties.length;
                      responseBodyIdx++
                    ) {
                      if (
                        Object.keys(
                          current[item][status].responseBody.properties[
                            responseBodyIdx
                          ]
                        ).length !== 0
                      ) {
                        let responseBodyPropertyValue =
                          checkRequiredValueValidation(
                            "properties",
                            current[item][status].responseBody.properties[
                              responseBodyIdx
                            ]
                          );
                        if (responseBodyPropertyValue === "delete") {
                          current[item][status].responseBody.properties.splice(
                            responseBodyIdx,
                            1
                          );
                        } else {
                          queue.push(
                            current[item][status].responseBody.properties[
                              responseBodyIdx
                            ]
                          );
                        }
                      }
                    }
                  }
                }
              }
            } else if (
              typeof current === "object" &&
              "dtoName" in current &&
              item === "dtoName"
            ) {
              if (current?.required === true) {
                let propertyTypeValidation = checkTypeValidation(current);
                if (!propertyTypeValidation) {
                  typeInvalidCount++;
                }
              }
              if (current.properties.length > 0) {
                propertiesNameInvalidCount += checkNameValidation(
                  "properties",
                  current.properties
                );
                for (
                  let propertyIdx = 0;
                  propertyIdx < current.properties.length;
                  propertyIdx++
                ) {
                  if (
                    JSON.stringify(current.properties[propertyIdx]) !== "{}" &&
                    Object.keys(current.properties[propertyIdx]).length !== 0
                  ) {
                    queue.push(current.properties[propertyIdx]);
                  }
                }
              }
              let propertyValueValidation = checkRequiredValueValidation(
                "properties",
                current
              );
              if (propertyValueValidation === "delete") {
              } else if (!propertyValueValidation) {
                requiredValueInvalidCount++;
              }
            }
          }
        }
      }
      nameInvalidCount += checkNameValidation("name", checkNameList);
      i++;
    }
  }
  return [
    propertiesNameInvalidCount,
    requiredValueInvalidCount,
    typeInvalidCount,
    nameInvalidCount,
  ];
}

export function checkControllerApiValidation(
  data: any,
  value: any,
  type: string,
  isEdit: boolean,
  editControllerIndex: number
) {
  const dataLength = data.length;
  const checkList = [-1, -1]; // name, uri
  const nameList = [];
  const uriList = [];
  for (let idx = 0; idx < dataLength; idx++) {
    if (type === "controller") {
      if (value[0].trim() && data[idx].name === value[0]) {
        checkList[0] += 1;
      }
      if (value[1].trim() && data[idx].commonUri === value[1]) {
        checkList[1] += 1;
      }
    } else {
      nameList.push(data[idx].name);
      uriList.push(`${data[idx].uri}==${data[idx].method}`);
    }
  }

  if (type === "api") {
    if (checkNameValidation("api", nameList) > 0) {
      checkList[0] = 1;
    }
    if (checkNameValidation("api", uriList) > 0) {
      checkList[1] = 1;
    }
  }
  if (isEdit && type === "controller") {
    if (data[editControllerIndex].name === value[0] && checkList[0] > -1) {
      checkList[0] -= 1;
    } else if (
      data[editControllerIndex].name !== value[0] &&
      checkList[0] > -1
    ) {
      checkList[0] = 1;
    }
    if (data[editControllerIndex].commonUri === value[1] && checkList[1] > 0) {
      checkList[1] -= 1;
    } else if (
      data[editControllerIndex].commonUri !== value[1] &&
      checkList[1] > -1
    ) {
      checkList[1] = 1;
    }
  } else {
    if (checkList[0] > -1) {
      checkList[0] = 1;
    }
    if (checkList[1] > -1) {
      checkList[1] = 1;
    }
  }
  return checkList;
}

export function getDepth(
  idx: number,
  datas: any,
  isAdd: boolean,
  isNew: boolean,
  isDelete: boolean,
  path: any
) {
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
        path.splice(idx, 1);
      } else if (current && typeof current !== "string" && isAdd && isNew) {
        if (current.properties && current.properties.length === 0) {
          current.properties.push(newData);
        }
      } else if (current && typeof current !== "string" && isAdd) {
        if (path?.length > 0 && current?.properties) {
          current.properties.push(newData);
        } else {
          path.properties.push(newData);
        }
      }
      break;
    }

    if (current === "flag") {
      levels.push(0);
      queue.push("flag");
    }

    if (current && current !== "flag" && typeof current !== "string") {
      levels[levels.length - 1]++;
      if (current.length > 0) {
        for (let item of current) {
          queue.push(item);
        }
      } else {
        if (current && current?.properties && current.properties.length > 0)
          for (let item of current.properties) {
            queue.push(item);
          }
        if (current.length === 0 && isAdd && isNew) {
          current.push(newData);
        }
      }
    }
  }
  return levels.length + 1;
}
