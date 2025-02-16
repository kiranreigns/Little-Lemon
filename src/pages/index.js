import { lazy } from "react";
const Home = lazy(() => import("./Home"));
const Reservations = lazy(() => import("./Reservations"));
const LoginPage = lazy(() => import("./LoginPage"));
const OrderOnline = lazy(() => import("./OrderOnline"));
const BagPage = lazy(() => import("./BagPage"));
export { Home, Reservations, LoginPage, OrderOnline, BagPage };
