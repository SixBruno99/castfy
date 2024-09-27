import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function MainLayout() {
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState("Home");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedPage("Home");
        break;
      case "/search":
        setSelectedPage("Search");
        break;
      case "/library":
        setSelectedPage("Library");
        break;
      case "/profile":
        setSelectedPage("Profile");
        break;
      case "/upload":
        setSelectedPage("Upload");
        break;
      default:
        setSelectedPage("Home");
    }
  }, [location.pathname]);

  const handleNavigate = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <Flex minHeight="100vh" direction={{ base: "column", md: "row" }}>
      <Box display={{ base: "none", md: "flex" }}>
        <NavBar selectedPage={selectedPage} onNavigate={handleNavigate} />
      </Box>
      <Box height={{base: "calc(100vh - 64px)", md: "100vh"}} width={{base: "100vw", md: "calc(100vw - 96px)"}} overflow="auto">
        <Outlet />
      </Box>
      <Box display={{ base: "flex", md: "none" }}>
        <Footer selectedPage={selectedPage} onNavigate={handleNavigate} />
      </Box>
    </Flex>
  );
}
