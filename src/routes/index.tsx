import { useAuth } from "../contexts/auth";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatedRouter, UnauthenticatedRouter } from "./routers";

export function Routes() {
  const [router, setRouter] = useState(UnauthenticatedRouter);

  const { signed } = useAuth();

  useEffect(() => {
    if (!signed) return setRouter(UnauthenticatedRouter);

    setRouter(AuthenticatedRouter);
  }, [signed]);

  return <BrowserRouter>{router}</BrowserRouter>;
}
