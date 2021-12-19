import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BusinessIcon from "@mui/icons-material/Business";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CallIcon from "@mui/icons-material/Call";
import ArticleIcon from "@mui/icons-material/Article";
import EmailIcon from "@mui/icons-material/Email";
import CampaignIcon from "@mui/icons-material/Campaign";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import { SidebarContent } from "./SidebarContent";

export function SidebarData({ setTitle }) {

  const userType = localStorage.getItem("userType");

  const content = [
    {
      icon: <HomeIcon />,
      fieldName: "Home",
      onclick: "/home",
    },
    {
      icon: <PeopleAltIcon />,
      fieldName: "Lead",
      addSymbols: "+",
      onclick: "/lead",
    },
    {
      icon: <CalendarTodayIcon />,
      fieldName: "Calendar",
      addSymbols: "+",
      onclick: "/calendar",
    },
    {
      icon: <ContactPhoneIcon />,
      fieldName: "Contacts",
      addSymbols: "+",
      onclick: "/contacts",
    },
    {
      icon: <BusinessIcon />,
      fieldName: "Companies",
      addSymbols: "+",
    },
    {
      icon: <LocalAtmIcon />,
      fieldName: "Deals",
      addSymbols: "+",
    },
    {
      icon: <FormatListBulletedIcon />,
      fieldName: "Tasks",
      addSymbols: "+",
    },
    {
      icon: <BusinessCenterIcon />,
      fieldName: "Cases",
      addSymbols: "+",
    },
    {
      icon: <CallIcon />,
      fieldName: "Calls",
      addSymbols: "+",
    },
    {
      icon: <ArticleIcon />,
      fieldName: "Documents",
      addSymbols: "+",
    },
    {
      icon: <EmailIcon />,
      fieldName: "Email",
    },
    {
      icon: <CampaignIcon />,
      fieldName: "Campaigns",
    },
    {
      icon: <FormatLineSpacingIcon />,
      fieldName: "Forms",
    },
    {
      icon: userType === "admin" || userType === "manager" ? <FormatLineSpacingIcon /> : "",
      fieldName: "Add Users",
      onclick: "/register",
    },
  ];
  return (
    <section className="sidebarContainer">
      {content.map((data, index) => (
        <SidebarContent Data={data} key={index} setTitle={setTitle} />
      ))}
    </section>
  );
}


