import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectNotion } from "../../Store/slice/apiDocsApi";

type NotionTokenResponse = {
  token: string;
  duplicatedTemplateId: string;
};

export const NotionOAuth2RedirectHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const queries = window.location.search?.split("&");
    const code = queries[0].substring(6);
    const encryptedUrl = queries[1].substring(6);

    dispatch(connectNotion({ code: code })).then((res: any) => {
      if (res.meta.requestStatus !== "fulfilled") {
        alert("연동에 실패하였습니다.");
      } else {
        const notionInfo: NotionTokenResponse = res.payload;
        localStorage.setItem(`${encryptedUrl}_notion`, notionInfo.token);
        localStorage.setItem(
          `${encryptedUrl}_notionPageId`,
          notionInfo.duplicatedTemplateId
        );
        alert("연동이 완료되었습니다.");
      }
      window.location.replace("/createApi/" + encryptedUrl);
    });
  }, []);
  return <div></div>;
};
