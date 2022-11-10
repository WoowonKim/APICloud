export function checkDtoNameValidation(
  value: string,
  data: any,
  length: number,
  checkData: any
) {
  if (!value.trim()) {
    return false;
  }

  let i = 0;
  let cnt = 0;
  let existsData = [checkData, null];
  while (i < length) {
    const queue: any = [data[i], "flag"];
    while (queue.length !== 1) {
      const current = queue.shift();
      if (current.dtoName === value) {
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
            }
          } else if (item === "requestBody") {
            if (current[item]?.dtoName === value) {
              cnt++;
              if (JSON.stringify(checkData) !== JSON.stringify(current[item])) {
                existsData[1] = current[item];
              }
              if (cnt >= 2 && current[item].properties.length > 0) {
                return existsData;
              }
            }
            for (let property of current[item].properties) {
              queue.push(property);
            }
          } else if (item === "responses") {
            if (current[item].fail.responseBody?.dtoName === value) {
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
            } else if (current[item].success.responseBody?.dtoName === value) {
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
              }
            }
          }
        }
      }
    }
    i++;
  }
  return false;
}

export function handleDtoProperties(path: any) {
  path.properties = [];
}
