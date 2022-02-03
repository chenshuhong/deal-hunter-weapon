const autoSignIn = require("../../src/autoSignIn");

test("autoSignIn", async () => {
  await autoSignIn();
  expect(1).toEqual(1);
});
