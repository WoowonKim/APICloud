import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import styled from "styled-components";
import apiDocsApiSlice from "../../Store/slice/apiDocsApi";
import { getApiCreationInfo } from "../../Store/slice/mainApi";
import "./DependencyModal.scss";

interface PropType {
  dependencies: string[];
  setDependencies: Dispatch<SetStateAction<string[]>>;
}

const DependencyModal = (props: PropType) => {
  const dispatch = useDispatch();

  const isOpenDependencyModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenDependencyModal
  );

  const [dependencyInfo, setDependencyInfo] = useState<any>({});
  const [selectedDependencies, setSelectedDependencies] = useState<Set<string>>(
    new Set<string>()
  );

  useEffect(() => {
    dispatch(getApiCreationInfo()).then((res: any) => {
      setDependencyInfo(res.payload.dependencies.values);
    });
  }, []);

  useEffect(() => {
    if (props.dependencies) {
      setSelectedDependencies(new Set(props.dependencies));
    }
  }, [props.dependencies]);

  useEffect(() => {}, [props.dependencies, dependencyInfo]);

  return (
    <ModalContainer>
      <DialogBox>
        <div className="modalContainer">
          <div className="modalMain">
            <div>
              <p>dependencies</p>
              {dependencyInfo.length > 0 && (
                <div>
                  selected: {selectedDependencies}
                  {dependencyInfo.map((info: any) => (
                    <div key={info.name}>
                      <p>{info.name}</p>
                      <ul className="dependencyModal-dependencyList">
                        {info.values
                          .filter(
                            (dependency: any) =>
                              !props.dependencies.includes(dependency)
                          )
                          .map((dependency: any) => (
                            <li
                              key={dependency.id}
                              className={
                                selectedDependencies.has(dependency.id)
                                  ? "selected"
                                  : ""
                              }
                              onClick={() => {
                                if (selectedDependencies.has(dependency.id)) {
                                  setSelectedDependencies((old) => {
                                    const newSet = new Set<string>(old);
                                    newSet.delete(dependency.id);
                                    return newSet;
                                  });
                                } else {
                                  setSelectedDependencies((old) => {
                                    const newSet = new Set<string>(old);
                                    newSet.add(dependency.id);
                                    return newSet;
                                  });
                                }
                              }}
                            >
                              {dependency.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => {
                  const dependenciesArr = Array.from(selectedDependencies);
                  localStorage.setItem(
                    "dependencies",
                    JSON.stringify(dependenciesArr)
                  );
                  props.setDependencies(dependenciesArr);
                  if (isOpenDependencyModal) {
                    dispatch(
                      apiDocsApiSlice.actions.setIsOpenDependencyModal({
                        isOpenDependencyModal: false,
                      })
                    );
                  }
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (isOpenDependencyModal) {
            dispatch(
              apiDocsApiSlice.actions.setIsOpenDependencyModal({
                isOpenDependencyModal: false,
              })
            );
          }
        }}
      />
    </ModalContainer>
  );
};

export default DependencyModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10001;
`;

const DialogBox = styled.dialog`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.1);
  box-sizing: border-box;
  background-color: white;
  margin: auto;
  z-index: 10001;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;
