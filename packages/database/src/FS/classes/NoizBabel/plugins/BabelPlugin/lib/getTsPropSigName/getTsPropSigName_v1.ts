import { BabelPlugin } from "../..";

const getTsPropSigName = new BabelPlugin();
getTsPropSigName.visitor = {
  TSTypeAnnotation(path) {
    if (
      path.parentPath.node.type === "TSPropertySignature"
    ) {
      if (path.parentPath.node.key.type === "Identifier") {
        getTsPropSigName_v1.stringResult.push(
          path.parentPath.node.key.name
        );
      } else if (
        path.parentPath.node.key.type === "ArrayExpression"
      ) {
        // Handle array of expressions
      } else {
        // Handle other types of expressions
      }
    }
  },
};

export const getTsPropSigName_v1 = getTsPropSigName;
