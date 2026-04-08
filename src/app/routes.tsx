import { createBrowserRouter } from "react-router";
import { PhoneFrame } from "./components/phone-frame";
import { HomePage } from "./components/home-page";
import { TransactionsPage } from "./components/transactions-page";
import { TransferPage } from "./components/transfer-page";
import { RequestPage } from "./components/request-page";
import { CardsPage } from "./components/cards-page";
import { SettingsPage } from "./components/settings-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PhoneFrame,
    children: [
      { index: true, Component: HomePage },
      { path: "transactions", Component: TransactionsPage },
      { path: "transfer", Component: TransferPage },
      { path: "request", Component: RequestPage },
      { path: "cards", Component: CardsPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);