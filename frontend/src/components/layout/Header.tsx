import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
export default function Header() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}",
  );

  return (
    <header
      style={{
        height: 74,
        background:
          "linear-gradient(90deg,#0f172a,#16213d)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "4px solid #2e7d32",
        boxShadow: "0 6px 18px rgba(0,0,0,.25)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          src="/assets/logo.png"
          sx={{
            width: 56,
            height: 56,
            boxShadow: 3,
          }}
        />

        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Picktipp
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            Fußball-Tippspiel
          </div>
        </div>
      </div>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
  }}
>
  <div
    style={{
      background: "#1e293b",
      padding: "8px 18px",
      borderRadius: 30,
      display: "flex",
      alignItems: "center",
      gap: 10,
      border: "1px solid #334155",
    }}
  >
    👤

    <span
      style={{
        fontWeight: 600,
      }}
    >
      {user.username}
    </span>
  </div>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }}
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: 30,
      cursor: "pointer",
      fontWeight: 600,
      transition: ".2s",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.background = "#b91c1c")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "#dc2626")
    }
  >
    🚪 Logout
  </button>
</div>
    </header>
  );
}