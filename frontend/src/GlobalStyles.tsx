import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
declare module "styled-components" {
  export interface DefaultTheme {
    color: string;
    bgColor: string;
    border: string;
    startBgColor: string;
    listBgColor: string;
    sideBgClodr: string;
    docBgColor: string;
    docSidebarBgColor: string;
    modalBgColor: string;
    createApiSidebarBgColor: string;
  }
}
export default createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.color};
  }
`;
