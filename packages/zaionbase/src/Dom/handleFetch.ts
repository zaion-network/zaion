export const handleFetch = async <
  T extends { [key: string | number | symbol]: any } = { id: string }
>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> => {
  let response: Response;
  if (!init) response = await fetch(input);
  else response = await fetch(input, init);
  const body = (await response.json()) as T;
  return body;
};
