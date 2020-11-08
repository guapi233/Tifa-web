/**
 * Setting 二级路由 下的三级路由
 */

const Setting = () =>
  import(/* webpackChunkName: "Setting" */ "@/views/Setting.vue");
const SettingBase = () =>
  import(/* webpackChunkName: "SettingBase" */ "@/views/Setting/Base.vue");
const SettingAccount = () =>
  import(
    /* webpackChunkName: "SettingAccount" */ "@/views/Setting/Account.vue"
  );
const SettingMail = () =>
  import(/* webpackChunkName: "SettingMail" */ "@/views/Setting/Mail.vue");
const SettingPreference = () =>
  import(
    /* webpackChunkName: "SettingPreference" */ "@/views/Setting/Preference.vue"
  );
const SettingFilter = () =>
  import(/* webpackChunkName: "SettingFilter" */ "@/views/Setting/Filter.vue");

export default {
  path: "/setting",
  component: Setting,
  meta: {
    requireAuth: true,
  },
  children: [
    {
      path: "",
      name: "SettingBase",
      component: SettingBase,
    },
    {
      path: "account",
      name: "SettingAccount",
      component: SettingAccount,
    },
    {
      path: "mail",
      name: "SettingMail",
      component: SettingMail,
    },
    {
      path: "preference",
      name: "SettingPreference",
      component: SettingPreference,
    },
    {
      path: "filter",
      name: "SettingFilter",
      component: SettingFilter,
    },
  ],
};
