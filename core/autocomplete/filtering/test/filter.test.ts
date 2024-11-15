import {
  AutocompleteFileringTestInput,
  testAutocompleteFiltering,
} from "./util";
import { TEST_CASES_WITH_DIFF, TEST_CASES_WITHOUT_DIFF } from "./testCases";
import { setUpTestDir, tearDownTestDir } from "../../../test/util/testDir";

const filterTestCases = (tests: AutocompleteFileringTestInput[]) => {
  if (tests.some((test) => test.options?.only)) {
    return tests.filter((test) => test.options?.only);
  }

  return tests;
};

describe("llms/Mock", () => {
  beforeAll(async () => {
    tearDownTestDir();
    setUpTestDir();
  });

  afterAll(async () => {
    tearDownTestDir();
  });

  describe("Autocomplete Filtering Tests", () => {
    beforeEach(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    describe("Should return unmodified LLM output", () => {
      it.each(filterTestCases(TEST_CASES_WITHOUT_DIFF))(
        "$description",
        async (testCase) => {
          await testAutocompleteFiltering(testCase);
        },
      );
    });

    describe("Should return modified LLM output", () => {
      it.each(filterTestCases(TEST_CASES_WITH_DIFF))(
        "$description",
        async (testCase) => {
          await testAutocompleteFiltering(testCase);
        },
      );
    });
  });
});
