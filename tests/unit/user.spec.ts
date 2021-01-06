import { shallowMount } from "@vue/test-utils";
import UserItem from "@/components/UserItem.vue";

describe("测试用户信息展示", () => {
  it("用户名", () => {
    const item = { name: "Komikado" };
    const wrapper = shallowMount(UserItem, {
      propsData: {
        item,
      },
      stubs: {
        Avatar: true,
        "router-link": true,
      },
    });

    console.log(wrapper.find(".nickname").text());

    expect(wrapper.find(".nickname").text()).toBe(item.name);
  });
});
