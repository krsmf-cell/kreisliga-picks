import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HelpIcon from "@mui/icons-material/Help";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
export default function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}",
  );

  const navStyle = ({
    isActive,
  }: {
    isActive: boolean;
  }): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: "12px 16px",
    marginBottom: 6,

    borderRadius: 12,

    textDecoration: "none",

    color: "white",

    background: isActive
      ? "linear-gradient(90deg,#2e7d32,#43a047)"
      : "transparent",

    fontWeight: isActive ? 700 : 500,

    transition: ".2s",
  });

  return (
    <aside
  style={{
    position: "fixed",
    top: 0,
    left: 0,

    width: 250,
    height: "100vh",

    overflowY: "auto",

    background:
      "linear-gradient(180deg,#0f172a,#16213d)",

    color: "white",

    padding: 20,

    boxShadow: "6px 0 18px rgba(0,0,0,.2)",

    zIndex: 1000,
  }}
>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 25,
        }}
      >
        <img
          src="/assets/logo.png"
          width={42}
        />

        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            Picktipp
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: 12,
            }}
          >
            Kreisliga
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "#334155",
          marginBottom: 20,
        }}
      />

      <NavLink to="/dashboard" style={navStyle}>
        <DashboardIcon fontSize="small" />
        Dashboard
      </NavLink>

      <NavLink to="/picks" style={navStyle}>
        <SportsSoccerIcon fontSize="small" />
        Tipps
      </NavLink>

      <NavLink to="/league" style={navStyle}>
        <EmojiEventsIcon fontSize="small" />
        Liga
      </NavLink>

      <NavLink to="/statistics" style={navStyle}>
        <BarChartIcon fontSize="small" />
        Statistik
      </NavLink>

      <NavLink to="/profile" style={navStyle}>
        <PersonIcon fontSize="small" />
        Profil
      </NavLink>
      <NavLink to="/help" style={navStyle}>
        <HelpIcon fontSize="small" />
        Hilfe
      </NavLink>


      {user.role === "ADMIN" && (
        <>
          <div
            style={{
              marginTop: 30,
              marginBottom: 12,
              color: "#22c55e",
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: 13,
            }}
          >
            ADMIN
          </div>
          <NavLink
  to="/admin/import"
  style={navStyle}
>
  <CloudDownloadIcon fontSize="small" />
  Spielplan importieren
</NavLink>

          <NavLink to="/admin" style={navStyle}>
            <DashboardIcon fontSize="small" />
            Dashboard
          </NavLink>

          <NavLink to="/admin/leagues" style={navStyle}>
            <EmojiEventsIcon fontSize="small" />
            Ligen
          </NavLink>

          <NavLink to="/admin/seasons" style={navStyle}>
            <CalendarMonthIcon fontSize="small" />
            Saisons
          </NavLink>

          <NavLink to="/admin/teams" style={navStyle}>
            <GroupsIcon fontSize="small" />
            Teams
          </NavLink>

          <NavLink to="/admin/matchdays" style={navStyle}>
            <CalendarMonthIcon fontSize="small" />
            Spieltage
          </NavLink>

          <NavLink to="/admin/matches" style={navStyle}>
            <SportsSoccerIcon fontSize="small" />
            Spiele
          </NavLink>

          <NavLink to="/admin/results" style={navStyle}>
  <EditNoteIcon fontSize="small" />
  Ergebnisse
</NavLink>

          <NavLink to="/admin/scoring" style={navStyle}>
            <SettingsIcon fontSize="small" />
            Punktesystem
          </NavLink>

          <NavLink to="/admin/users" style={navStyle}>
            <AdminPanelSettingsIcon fontSize="small" />
            Benutzer
          </NavLink>
        </>
      )}
    </aside>
  );
}