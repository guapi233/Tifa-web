/**
 * 除了 Home、Write 外的 其他一级路由
 */

const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "@/views/Register.vue");
const Forget = () =>
  import(/* webpackChunkName: "Forget" */ "@/views/Forget.vue");

const NotFound = () =>
  import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forget",
    name: "Forget",
    component: Forget,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];
