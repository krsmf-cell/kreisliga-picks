import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import AdminDashboard from "./admin/pages/AdminDashboard";
import TeamsPage from "./admin/pages/Teams";
import LeaguesPage from "./admin/pages/Leagues";
import SeasonsPage from "./admin/pages/Seasons";
import MatchdaysPage from "./admin/pages/Matchdays";
import MatchesPage from "./admin/pages/Matches";
import Users from "./admin/pages/Users";
import ScoringPage from "./admin/pages/Scoring";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import League from "./pages/League";
import Picks from "./pages/Picks";
import ResultsPage from "./admin/pages/Results";
import ImportSchedule from "./admin/pages/ImportSchedule";
import Help from "./pages/Help";
export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Benutzerbereich */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/picks"
  element={
    <ProtectedRoute>
      <Picks />
    </ProtectedRoute>
  }
/>
      <Route
  path="/league"
  element={
    <ProtectedRoute>
      <League />
    </ProtectedRoute>
  }
/>
<Route
    path="/help"
    element={<Help />}
/>

      {/* Unbekannte Route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />


      <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

      <Route
        path="/admin/teams"
        element={
          <AdminRoute>
            <TeamsPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/leagues"
        element={
          token ? (
            <LeaguesPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/admin/seasons"
        element={
          token ? (
            <SeasonsPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/admin/matchdays"
        element={
          token ? (
            <MatchdaysPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/admin/matches"
        element={
          token ? (
            <MatchesPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
<Route
  path="/admin/results"
  element={
    <AdminRoute>
      <ResultsPage />
    </AdminRoute>
  }


/><Route
  path="/admin/import"
  element={<ImportSchedule />}
/>
      <Route
  path="/admin/users"
  element={<Users />}
/>

      <Route
        path="/admin/scoring"
        element={
          token ? (
            <ScoringPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

    </Routes>
  );
}