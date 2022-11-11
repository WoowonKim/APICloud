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
    const queue: any = [data[i], "flag"];
    while (queue.length !== 1) {
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

      if (current === "flag") {
        queue.push("flag");
      }

      if (current && current !== "flag") {
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