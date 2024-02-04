import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

export type SidebarMenuProps = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  to: string;
};

export const SIDEBAR_MENU: SidebarMenuProps[] = [
  {
    title: "Начало",
    icon: HomeOutlinedIcon,
    to: "/",
  },
  {
    title: "Клиенти",
    icon: PeopleOutlineOutlinedIcon,
    to: "/clients",
  },
  {
    title: "График",
    icon: CalendarMonthOutlinedIcon,
    to: "/schedule",
  },
];
