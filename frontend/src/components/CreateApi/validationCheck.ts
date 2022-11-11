import { ControllerType } from "./../../pages/CreateApi/ApisType";
export function checkDtoNameValidation(
  value: string,
  data: any,
  length: number,
  checkData: any,
  flag: boolean
) {
  if (!value.trim()) {
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
        if (cnt >= 2 && current.properties.length > 0) {
          return existsData;
        }
      }

      if (current) {
        let item: any;
        for (item in current) {
          if (
            (item === "parameters" || item === "queries") &&
            current[item].length > 0
          ) {
            for (let property of current[item]) {
              queue.push(property);
              if (
                property.dtoName.trim() &&
                property.type === "Object" &&
                property.properties.length > 0
              ) {
                allDtos.push(property);
              }
            }
          } else if (item === "requestBody") {
            if (current[item]?.dtoName === value && !flag) {
              cnt++;
              if (JSON.stringify(checkData) !== JSON.stringify(current[item])) {
                existsData[1] = current[item];
              }
              if (cnt >= 2 && current[item].properties.length > 0) {
                return existsData;
              }
            }
            if (
              flag &&
              current[item].dtoName.trim() &&
              current[item].type === "Object" &&
              current[item].properties.length > 0
            ) {
              allDtos.push(current[item]);
            }
            for (let property of current[item].properties) {
              queue.push(property);
            }
          } else if (item === "responses") {
            if (current[item].fail.responseBody?.dtoName === value && !flag) {
              cnt++;
              if (
                JSON.stringify(checkData) !==
                JSON.stringify(current[item].fail.responseBody)
              ) {
                existsData[1] = current[item].fail.responseBody;
              }
              if (
                cnt >= 2 &&
                current[item].fail.responseBody.properties.length > 0
              ) {
                return existsData;
              }
            } else if (
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
              if (
                cnt >= 2 &&
                current[item].success.responseBody.properties.length > 0
              ) {
                return existsData;
              }
            }
            for (let i = 0; i < 2; i++) {
              let status = i === 0 ? "fail" : "success";
              for (let property of current[item][status].responseBody
                .properties) {
                queue.push(property);
                if (
                  flag &&
                  current[item][status].responseBody.dtoName.trim() &&
                  current[item][status].responseBody.type === "Object" &&
                  current[item][status].responseBody.properties.length > 0
                ) {
                  allDtos.push(current[item][status].responseBody);
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

export function checkNameValidation(type: string, data: []) {
  const nameList: any[] = [];
  if (type === "headers") {
    if (data.length === 0) {
      return 0;
    }
    for (let item of data) {
      nameList.push(item["key"]);
    }
  }

  const result = nameList.reduce((accu, curr) => {
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

export function checkTypeValidation(item: any) {
  // checkList[0] - dtoName 존재 여부
  // checkList[1] - type object 여부
  // checkList[2] - properties 존재 여부
  const checkList = [0, 0, 0];
  console.log(JSON.parse(JSON.stringify(item)));
  console.log(item.dtoName, item.type, item.properties.length);

  if (item?.dtoName.trim()) {
    checkList[0] = 1;
  }
  if (item?.type === "Object") {
    checkList[1] = 1;
  }
  if (item?.properties.length > 0) {
    checkList[2] = 1;
  }

  for (let checkIdx = 0; checkIdx < 3; checkIdx++) {
    const idxList = checkIdx === 0 ? [1, 2] : checkIdx === 1 ? [0, 2] : [0, 1];
    console.log(
      checkList[checkIdx],
      checkList[idxList[0]],
      checkList[idxList[1]]
    );
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

export function checkRequiredValueValidation(type: string, item: any) {
  if (type === "headers") {
    if (!item["key"].trim() && !item["value"].trim()) {
      return "delete";
    } else if (!item["key"].trim() || !item["value"].trim()) {
      return false;
    }
  } else if (type === "query") {
    if (
      !item["name"].trim() &&
      item["properties"].length === 0 &&
      !item["collectionType"]
    ) {
      return "delete";
    } else if (!item["name"].trim()) {
      return false;
    }
  }

  return true;
}

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
      const checkNameList = [];
      while (queue.length !== 0) {
        const current = queue.shift();
        console.log(JSON.parse(JSON.stringify(current)));

        if (current) {
          let item: any;
          for (item in current) {
            if (item === "headers") {
              nameInvalidCount += checkNameValidation("headers", current[item]);
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
            } else if (item === "queries" || item === "parameters") {
              for (
                let queryIdx = 0;
                queryIdx < current[item].length;
                queryIdx++
              ) {
                queue.push(current[item]);
                checkNameList.push(current[item][queryIdx].name);

                let queryValueValidation = checkRequiredValueValidation(
                  "query",
                  current[item][queryIdx]
                );
                if (queryValueValidation === "delete") {
                  current[item].splice(queryIdx, 1);
                } else if (!queryValueValidation) {
                  console.log(
                    JSON.parse(JSON.stringify(current[item][queryIdx]))
                  );

                  requiredValueInvalidCount++;
                }

                let queryTypeValidation = checkTypeValidation(
                  current[item][queryIdx]
                );
                if (!queryTypeValidation) {
                  typeInvalidCount++;
                }
              }
            }
          }
        }
      }

      i++;
    }
  }
  return [nameInvalidCount, requiredValueInvalidCount, typeInvalidCount];
}
