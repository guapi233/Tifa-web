/**
 * 除了 Home 外的 其他一级路由
 */

const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "@/views/Register.vue");

const Write = () => import(/* webpackChunkName: "Write" */ "@/views/Write.vue");

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
    path: "/write",
    name: "Write",
    component: Write,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];
