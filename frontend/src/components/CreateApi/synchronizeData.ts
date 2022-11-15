export function checkFlag(type: string, flagList: any) {
  const result = [];
}

export function checkChangedData(
  data: any,
  controllerName: string,
  controllerIndex: number,
  state: any
) {
  const updateDto = [];
  let rootPath = state.data;
  let root = controllerName;
  if (data.commonUriFlag) {
    updateDto.push({
      root: root,
      value: { commonUri: data.commonUri },
      path: rootPath[controllerIndex],
    });
  }

  let apiIndex = 0;
  while (apiIndex < data.apis.length) {
    root = root + `/${data.apis[apiIndex].name}`;
    rootPath = rootPath[controllerIndex].apis[apiIndex];
    let apiCreateFlag = false;
    3;
    if (data.apis[apiIndex].createFlag) {
      updateDto.push({
        root: root,
        // 키 값 변경하기
        value: { api: rootPath },
        path: rootPath,
      });
      apiCreateFlag = true;
    } else {
      const flagList = [
        rootPath.uriFlag,
        rootPath.nameFlag,
        rootPath.methodFlag,
      ];
      for (let idx = 0; idx < 3; idx++) {
        let key = idx === 0 ? "uri" : idx === 1 ? "name" : "method";
        if (flagList[idx]) {
          updateDto.push({
            root,
            value: { key: rootPath[key] },
            rootPath,
          });
        }
      }
    }
    if (!apiCreateFlag) {
      for (let item in data.apis[apiIndex]) {
        root = root + `/${item}`;
        rootPath = rootPath[item];
        if (item === "parameters") {
        } else if (item === "queries") {
        } else if (item === "requestBody") {
        } else if (item === "responses") {
        }
      }
    }
    apiIndex++;
  }
}
