// import { shallowMount } from "@vue/test-utils";
import { countFormat } from "@/utils/index";

describe("工具函数测试", () => {
  it("countFormat", () => {
    expect(countFormat(1000)).toBe("999+");
    expect(countFormat(0)).toBe(0);
  });
});
