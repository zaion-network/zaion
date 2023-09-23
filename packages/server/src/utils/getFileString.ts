export const getFileString = async (path: string) => {
  return await Bun.file(path).text();
};
