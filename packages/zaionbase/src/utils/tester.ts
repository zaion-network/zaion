declare module "./tester" {
  interface tester {
    <T extends string | (() => void), U extends (() => void) | undefined>(
      title: T,
      test?: T extends string ? () => void : undefined
    ): (start: boolean) => void;
  }
}

export const tester: tester = (test_or_title, test) => (start) => {
  if (typeof test_or_title === "string") {
    if (typeof test === "function") if (start) test();
  } else if (start) test_or_title();
};
