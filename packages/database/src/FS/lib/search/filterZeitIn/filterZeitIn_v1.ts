export const filterZeitIn_v1 = (dep: [string, string]) => {
  const cond1 = dep[0][1] !== "z" && dep[0][2] !== "i";
  const cond2 = dep[0][1] === "z" && dep[0][2] === "e";
  if (cond1 || cond2) return true;
};
