import type { ExtractedOperation } from "../../../parser/buildOperations.js";
import { REQ_BODY_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printOptions = ({
  method,
  reqContentType,
  parameterTypes,
}: ExtractedOperation) => {
  let optionsProps = `method: "${method}",`;

  optionsProps += reqContentType
    ? `
    ${getBodyProp(reqContentType)},`
    : "";

  optionsProps += parameterTypes.header
    ? `
    ${getHeadersProp(parameterTypes)},`
    : "";

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);`;
};

const getHeadersProp = (
  parameterTypes: ExtractedOperation["parameterTypes"]
) => {
  if (parameterTypes.header) {
    return `headers: new Headers(params.header)`;
  }
  return "";
};

const getBodyProp = (reqContentType: string) => {
  if (isHandledContentType(reqContentType)) {
    return `body: ${REQ_BODY_CONTENT_TYPE_DICT[reqContentType]}`;
  }

  return "body: params.requestBody";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQ_BODY_CONTENT_TYPE_DICT =>
  Object.hasOwn(REQ_BODY_CONTENT_TYPE_DICT, contentType);
