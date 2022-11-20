export function checkFlag(path: any, root: any) {
  const result = [];

  if (path === null) {
    return [];
  }

  const flagList = [
    path.dtoNameFlag,
    path.nameFlag,
    path.typeFlag,
    path.collectionTypeFlag,
    path.requiredFlag,
  ];
  for (let idx = 0; idx < 5; idx++) {
    let key =
      idx === 0
        ? "dtoName"
        : idx === 1
        ? "name"
        : idx === 2
        ? "type"
        : idx === 3
        ? "collectionType"
        : "required";
    if (flagList[idx]) {
      result.push({
        root: root,
        value: { key: key, value: path[key] },
      });
    }
  }
  return result;
}

export function checkChangedData(
  data: any,
  controllerName: string,
  controllerIndex: number,
  state: any
) {
  let updateDto = [];
  let root = controllerName;
  if (data.commonUriFlag) {
    updateDto.push({
      root: root,
      value: { key: "commonUri", value: data.commonUri },
    });
  }

  let apiIndex = 0;
  while (apiIndex < data.apis.length) {
    root = controllerName;
    root = root + `/${data.apis[apiIndex].name}`;
    let apiCreateFlag = false;
    if (data.apis[apiIndex].createFlag) {
      updateDto.push({
        root: root,
        value: { key: "api", value: data.apis[apiIndex] },
      });
      apiCreateFlag = true;
    } else {
      const flagList = [
        data.apis[apiIndex].uriFlag,
        data.apis[apiIndex].nameFlag,
        data.apis[apiIndex].methodFlag,
      ];
      for (let idx = 0; idx < 3; idx++) {
        let key = idx === 0 ? "uri" : idx === 1 ? "name" : "method";
        if (flagList[idx]) {
          updateDto.push({
            root,
            value: { key: key, value: data.apis[apiIndex][key] },
          });
        }
      }
    }
    if (!apiCreateFlag) {
      for (let item in data.apis[apiIndex]) {
        if (
          (item === "parameters" || item === "queries") &&
          data.apis[apiIndex][item]
        ) {
          for (let idx = 0; idx < data.apis[apiIndex][item].length; idx++) {
            if (data.apis[apiIndex][item].createFlag) {
              updateDto.push({
                root: root + `/${item}`,
                value: {
                  key: `new ${item}`,
                  value: data.apis[apiIndex][item][idx],
                },
              });
            } else {
              const flagResult = checkFlag(
                data.apis[apiIndex][item][idx],
                root + `/${item}`
              );
              if (flagResult.length > 0) {
                updateDto = [...updateDto, ...flagResult];
              }
              if (
                data.apis[apiIndex][item][idx].properties &&
                data.apis[apiIndex][item][idx].properties.length > 0
              ) {
                let queue = [];
                for (let prop of data.apis[apiIndex][item][idx].properties) {
                  queue.push(prop);
                }
                while (queue.length !== 0) {
                  let current: any = queue.shift();
                  if (current?.properties && current.properties.length > 0) {
                    for (
                      let currentIdx = 0;
                      currentIdx < current.properties.length;
                      currentIdx++
                    ) {
                      queue.push(current.properties[currentIdx]);
                    }
                  }
                  if (current.createFlag) {
                    updateDto.push({
                      root: root + `/${item}`,
                      value: { key: `new ${item}`, value: current },
                    });
                  } else {
                    const flagResult = checkFlag(current, root + `/${item}`);
                    if (flagResult.length > 0) {
                      updateDto = [...updateDto, ...flagResult];
                    }
                  }
                }
              }
            }
          }
        } else if (item === "requestBody") {
          if (data.apis[apiIndex][item].createFlag) {
            updateDto.push({
              root: root + `/${item}`,
              value: {
                key: `new ${item}`,
                value: data.apis[apiIndex][item],
              },
            });
          } else {
            const flagResult = checkFlag(
              data.apis[apiIndex][item],
              root + `/${item}`
            );
            if (flagResult.length > 0) {
              updateDto = [...updateDto, ...flagResult];
            }
            if (
              data.apis[apiIndex][item].properties &&
              data.apis[apiIndex][item].properties.length > 0
            ) {
              let queue = [];
              for (let prop of data.apis[apiIndex][item].properties) {
                queue.push(prop);
              }
              while (queue.length !== 0) {
                let current: any = queue.shift();
                if (current?.properties && current.properties.length > 0) {
                  for (
                    let currentIdx = 0;
                    currentIdx < current.properties.length;
                    currentIdx++
                  ) {
                    queue.push(current.properties[currentIdx]);
                  }
                }
                if (current.createFlag) {
                  updateDto.push({
                    root: root + `/${item}/properties`,
                    value: { key: `new ${item} property`, value: current },
                  });
                } else {
                  const flagResult = checkFlag(
                    current,
                    root + `/${item}/properties`
                  );
                  if (flagResult.length > 0) {
                    updateDto = [...updateDto, ...flagResult];
                  }
                }
              }
            }
          }
        } else if (item === "responses") {
          for (let responseType in data.apis[apiIndex][item]) {
            if (data.apis[apiIndex][item][responseType].createFlag) {
              updateDto.push({
                root: root + `/${item}/${responseType}`,
                value: {
                  key: `new ${item} ${responseType}`,
                  value: data.apis[apiIndex][item][responseType],
                },
              });
            }
            if (
              data.apis[apiIndex][item][responseType].responseBody !== null &&
              data.apis[apiIndex][item][responseType].responseBody.createFlag
            ) {
              updateDto.push({
                root: root + `/${item}/${responseType}/responseBody`,
                value: {
                  key: `new ${item} ${responseType}`,
                  value: data.apis[apiIndex][item][responseType].responseBody,
                },
              });
            } else {
              const flagResult = checkFlag(
                data.apis[apiIndex][item][responseType].responseBody,
                root + `/${item}/${responseType}/responseBody`
              );
              if (flagResult.length > 0) {
                updateDto = [...updateDto, ...flagResult];
              }
              if (
                data.apis[apiIndex][item][responseType].responseBody !== null &&
                data.apis[apiIndex][item][responseType].responseBody
                  ?.properties &&
                data.apis[apiIndex][item][responseType].responseBody
                  .properties &&
                data.apis[apiIndex][item][responseType].responseBody.properties
                  .length > 0
              ) {
                let queue = [];
                for (let prop of data.apis[apiIndex][item][responseType]
                  .responseBody.properties) {
                  queue.push(prop);
                }
                while (queue.length !== 0) {
                  let current: any = queue.shift();
                  if (current?.properties && current.properties.length > 0) {
                    for (
                      let currentIdx = 0;
                      currentIdx < current.properties.length;
                      currentIdx++
                    ) {
                      queue.push(current.properties[currentIdx]);
                    }
                  }
                  if (current.createFlag) {
                    updateDto.push({
                      root:
                        root +
                        `/${item}/${responseType}/responseBody/properties`,
                      value: { key: `new ${item} property`, value: current },
                    });
                  } else {
                    const flagResult = checkFlag(
                      current,
                      root + `/${item}/${responseType}/responseBody/properties`
                    );
                    if (flagResult.length > 0) {
                      updateDto = [...updateDto, ...flagResult];
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    apiIndex++;
  }

  return updateDto;
}
