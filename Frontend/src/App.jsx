import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import React from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { DarkModeProvider } from "./context/DarkModeContext";
import AiChat from "./components/aiChat/AiChat";
import Dashboard from "./pages/dashboard/Dashboard";
import Success from "./pages/success/Success";
import BecomeSeller from "./pages/becomeSeller/BecomeSeller";
import Community from "./pages/community/Community";
import Business from "./pages/business/Business";
function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <DarkModeProvider>
        <div className="app">
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
            <Footer />
            <AiChat />
          </QueryClientProvider>
        </div>
      </DarkModeProvider>
    );
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/gigs",
            element: <Gigs />,
          },
          {
            path: "/myGigs",
            element: <MyGigs />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },
          {
            path: "/messages",
            element: <Messages />,
          },
          {
            path: "/message/:id",
            element: <Message />,
          },
          {
            path: "/add",
            element: <Add />,
          },
          {
            path: "/gig/:id",
            element: <Gig />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/pay/:id",
            element: <Pay />,
          },
          {
            path: "/success",
            element: <Success />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/register", // Re-using register for now or keep generic
            element: <Success />,
          },
          {
            path: "/trust", element: <Success />
          },
          {
            path: "/selling", element: <Success />
          },
          {
            path: "/buying", element: <Success />
          },
          {
            path: "/community", element: <Community /> // Real component with animations
          },
          {
            path: "/business", element: <Business />
          },
          {
            path: "/forum", element: <Success />
          },
          {
            path: "/events", element: <Success />
          },
          {
            path: "/blog", element: <Success />
          },
          {
            path: "/privacy", element: <Success />
          },
          {
            path: "/terms", element: <Success />
          },
          {
            path: "/become-seller", element: <BecomeSeller /> // Real component
          },
        ],
      },
    ],
    { future: { v7_startTransition: true } }
  );

  return <RouterProvider router={router} />;
}

export default App;
