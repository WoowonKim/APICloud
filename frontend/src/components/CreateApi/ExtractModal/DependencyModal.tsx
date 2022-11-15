import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apiDocsApiSlice from "../../../Store/slice/apiDocsApi";
import { getApiCreationInfo } from "../../../Store/slice/mainApi";
import { RootState } from "../../../Store/store";
import "./DependencyModal.scss";
import { DependencyType } from "./ExtractModal";

interface PropType {
  dependencies: DependencyType[];
  setDependencies: Dispatch<SetStateAction<DependencyType[]>>;
}

const DependencyModal = (props: PropType) => {
  const { encryptedUrl } = useParams();
  const dispatch = useDispatch();

  const isOpenDependencyModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenDependencyModal
  );

  const itemsRef = useRef<Array<HTMLUListElement | null>>([]);

  const [dependencyInfo, setDependencyInfo] = useState<any>({});
  const [selectedDependencies, setSelectedDependencies] = useState<
    DependencyType[]
  >([]);
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    dispatch(getApiCreationInfo()).then((res: any) => {
      setDependencyInfo(res.payload.dependencies.values);
    });
  }, []);

  useEffect(() => {
    if (props.dependencies) {
      setSelectedDependencies([...props.dependencies]);
    }
  }, [props.dependencies]);

  useEffect(() => {}, [dependencyInfo]);
  useEffect(() => {
    toggleHiddenList();
  }, [selectedDependencies, keyWord]);

  const toggleHiddenList = () => {
    itemsRef.current.forEach((itemRef) => {
      if (!itemRef?.children.length || itemRef?.children.length === 0) {
        itemRef?.parentElement?.classList.add("hidden");
      } else {
        itemRef?.parentElement?.classList.remove("hidden");
      }
    });
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div className="modalContainer">
          <div className="modalMain">
            <div>
              <p className="dependencyModal-modalTitle">Dependency 선택</p>
              <div className="dependencyModal-selectedList">
                {selectedDependencies &&
                  selectedDependencies.map((selected) => (
                    <div
                      onClick={
                        selected.fixed
                          ? () => {}
                          : () => {
                              setSelectedDependencies((old) => {
                                const newList = old.filter(
                                  (dependency) => dependency.id !== selected.id
                                );
                                return newList;
                              });
                            }
                      }
                      key={selected.id}
                    >
                      {selected.name}
                      {selected.fixed || (
                        <FontAwesomeIcon icon={faX} size="2x" />
                      )}
                    </div>
                  ))}
                <div>
                  <input
                    type="text"
                    value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                    placeholder="검색어를 입력하세요."
                  ></input>
                </div>
              </div>
              {dependencyInfo.length > 0 && (
                <div className="dependencyModal-dependencyContainer">
                  {dependencyInfo.map((info: any, i: number) => (
                    <div key={i}>
                      <p className="dependencyModal-typeTitle">{info.name}</p>
                      <ul
                        className="dependencyModal-dependencyList"
                        ref={(el) => (itemsRef.current[i] = el)}
                      >
                        {info.values
                          .filter(
                            (dependency: any) =>
                              selectedDependencies.every(
                                (selectedDep) =>
                                  selectedDep.id !== dependency.id
                              ) &&
                              (
                                dependency.name +
                                " " +
                                dependency.description +
                                " " +
                                dependency.id
                              )
                                .toLowerCase()
                                .includes(keyWord.toLowerCase())
                          )
                          .map((dependency: any) => (
                            <li
                              key={dependency.id}
                              onClick={() => {
                                setSelectedDependencies((old) => {
                                  const newList = [...old];
                                  newList.push({
                                    id: dependency.id,
                                    name: dependency.name,
                                    fixed: false,
                                  });
                                  return newList;
                                });
                              }}
                            >
                              <p>{dependency.name}</p>
                              <p>{dependency.description}</p>
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
                    `${encryptedUrl}_dependencies`,
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
  height: 100%;
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
