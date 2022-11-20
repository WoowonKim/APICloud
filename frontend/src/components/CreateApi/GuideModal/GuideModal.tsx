import React from "react";
import "./GuideModal.scss";

interface Props {
  setIsGuideModal: React.Dispatch<React.SetStateAction<boolean>>;
  isGuideModal: boolean;
}
const GuideModal = ({ setIsGuideModal, isGuideModal }: Props) => {
  return (
    <div className="guideModalContainer">
      <div className="guideModalInnerContainer">
        <div className="guideModalTitleGroup">
          <img
            src={require("../../../assets/ApiCloud.png")}
            alt="ApiCloud"
            className="guideModalLogoImage"
          />
          <div className="guideModalTitle">API Clound 명세 작성 가이드</div>
        </div>
        <div className="guideModalBody">
          <div>
            <p className="guideModalListTitle">1. Controller / API 추가하기</p>
            <img
              src={require("../../../assets/guideImage/addController.png")}
              alt="addController"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                사이드바의
                <span className="guideModalTextBlue"> 플러스 버튼</span>을
                클릭하여 Controller와 Api들을 추가할 수 있습니다.
              </p>
              <p className="guideModalTextItem">
                Controller의 uri와 name은 다른 Controller와
                <span className="guideModalTextRed">
                  {" "}
                  중복되어서는 안됩니다!
                </span>
              </p>
              <p className="guideModalTextItem">
                Api 추가하기의 플러스 버튼을 클릭하여 개별 Api들의 uri와 name,
                method를 설정해줍니다.
              </p>
              <p className="guideModalTextItem">
                Controller 내부의 Api의 경우 name이 중복될 수 없지만 Api의 uri의
                경우에는
                <span className="guideModalTextBlue">
                  {" "}
                  method가 다른 경우에만 중복이 가능
                </span>
                합니다.
              </p>
              <p className="guideModalTextItem">
                Controller와 Api 정보를 모두 입력했다면
                <span className="guideModalTextBlue">
                  {" "}
                  Controller 추가 완료하기{" "}
                </span>
                버튼을 클릭해줍니다.
              </p>
            </div>
          </div>
          <div>
            <p className="guideModalListTitle">
              2. API에 대한 상세 정보 작성하기
            </p>
            <img
              src={require("../../../assets/guideImage/writeApiDetailInfo.png")}
              alt="addController"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                사이드바에서 상세 작성하고 싶은
                <span className="guideModalTextBlue"> Api를 클릭하여 </span>
                원하는 탭으로 이동합니다.
              </p>
              <p className="guideModalTextItem">
                탭에 해당하는 정보들을 기입해줍니다.
              </p>
              <p className="guideModalTextItem">
                타입이 Object인 경우에
                <span className="guideModalTextRed"> DtoName은 필수값</span>
                입니다.
              </p>
              <p className="guideModalTextItem">
                <span className="guideModalTextBlue">
                  Api와 탭을 이동하면서{" "}
                </span>
                팀원들과 명세서를 채워나가보세요!
              </p>
            </div>
          </div>
          <div>
            <p className="guideModalListTitle">3. 완성된 문서 추출하기</p>
            <img
              src={require("../../../assets/guideImage/extractModal.png")}
              alt="extractModal"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                완성된 Api 문서를 추출하고 싶은 경우 우측 상단의 추출 버튼을
                클릭해줍니다.
              </p>
              <p className="guideModalTextItem">
                <span className="guideModalTextBlue">
                  SpringBoot, Notion, CSV{" "}
                </span>
                중 원하는 추출 방식을 선택해주세요!
              </p>
            </div>
          </div>
          <div>
            <p className="guideModalListSubtitle">3-1. SpringBoot로 추출하기</p>
            <img
              src={require("../../../assets/guideImage/extractSpringBoot.png")}
              alt="extractSpringBoot"
              className="guideModalImage"
            />
            <img
              src={require("../../../assets/guideImage/extractSpringBoot2.png")}
              alt="extractSpringBoot"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                <span className="guideModalTextBlue">dependency 추가 버튼</span>
                을 클릭하여 원하는 dependency를 추가해줍니다.
              </p>
              <p className="guideModalTextItem">
                원하는 dependency를 모두 추가 완료했다면 추출 버튼을 눌러
                <span className="guideModalTextBlue">
                  {" "}
                  SpringBoot 프로젝트를 .zip 파일로
                </span>
              </p>
              <p className="guideModalTextItem">추출할 수 있습니다.</p>
            </div>
          </div>
          <div>
            <p className="guideModalListSubtitle">3-2. Notion으로 추출하기</p>
            <img
              src={require("../../../assets/guideImage/extractNotion.png")}
              alt="extractNotion"
              className="guideModalImage"
            />
            <img
              src={require("../../../assets/guideImage/extractNotion2.png")}
              alt="extractNotion"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                연동 버튼을 클릭하여 노션과 연동을 해줍니다.
              </p>
              <p className="guideModalTextItem">
                노션과 연동이 완료되었다면 추출 버튼을 클릭하여
                <span className="guideModalTextBlue">
                  {" "}
                  노션으로 Api 문서를 추출
                </span>
                합니다.
              </p>
            </div>
          </div>
          <div>
            <p className="guideModalListTitle">4. 동기화 하기</p>
            <img
              src={require("../../../assets/guideImage/sync.png")}
              alt="sync"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                추출한 프로젝트 파일에서 코드를 수정한 경우
                <span className="guideModalTextBlue">
                  {" "}
                  수정한 코드를 Api 문서에 동기화
                </span>
                시킬 수 있습니다.
              </p>
              <p className="guideModalTextItem">
                또한 이미 프로젝트를 추출했더라도 Api 문서를 수정했다면
                <span className="guideModalTextBlue">
                  {" "}
                  수정된 코드를 확인
                </span>{" "}
                할 수 있습니다.
              </p>
            </div>
          </div>
          <div>
            <p className="guideModalListSubtitle">
              4-1. 문서를 코드로 동기화하기
            </p>
            <img
              src={require("../../../assets/guideImage/syncFile.png")}
              alt="syncFile"
              className="guideModalImage"
            />
            <img
              src={require("../../../assets/guideImage/syncFile2.png")}
              alt="syncFile"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                우선 동기화를 진행하고자하는 프로젝트의 zip 파일을 업로드합니다.
              </p>
              <p className="guideModalTextItem">
                업로드 후 파일 동기화 버튼을 클릭하면
                <span className="guideModalTextBlue">
                  {" "}
                  현재 프로젝트 기반 변경사항들을 확인
                </span>{" "}
                할 수 있습니다.
              </p>
              <p className="guideModalTextItem">
                이러한 변경사항들을 저장하면
                <span className="guideModalTextBlue">
                  {" "}
                  프로젝트의 코드를 문서에 반영
                </span>{" "}
                시킬 수 있습니다.
              </p>
            </div>
          </div>
          <div>
            <p className="guideModalListSubtitle">
              4-2. 코드를 문서로 동기화 하기
            </p>
            <img
              src={require("../../../assets/guideImage/syncDoc.png")}
              alt="syncDoc"
              className="guideModalImage"
            />
            <div className="guideModalParagraph">
              <p className="guideModalTextItem">
                프로젝트를 추출한 이후 Api 문서를 수정한 경우
                <span className="guideModalTextBlue">
                  {" "}
                  수정한 내용을 프로젝트 코드
                </span>
                로 확인할 수 있습니다.
              </p>
              <p className="guideModalTextItem">
                파일 별로 기존 코드와 변경된 코드를 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="guideModalButtonContainer">
          <button
            className="guideModalButton"
            onClick={() => {
              setIsGuideModal(!isGuideModal);
            }}
          >
            명세서 작성하러 가기
          </button>
        </div>
      </div>
      <button
        className="guidemodalCloseButton"
        onClick={() => {
          setIsGuideModal(!isGuideModal);
        }}
      ></button>
    </div>
  );
};

export default GuideModal;
