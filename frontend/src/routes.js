
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Integracion from "views/Integracion.js";
import Notifications from "views/Notifications.js";
import Bitacora from "views/Bitacora.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/inventario",
    name: "Inventario",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/bitacora",
    name: "Bitacora",
    icon: "tim-icons icon-align-center",
    component: <Bitacora />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Perfil",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/integracion",
    name: "Integraciones",
    icon: "tim-icons icon-atom",
    component: <Integracion />,
    layout: "/admin",
  },
  
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  
  
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/admin",
  },
  
];
export default routes;
