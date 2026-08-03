import { useEffect, useState } from "react";
import AdminToolbar from "../components/AdminToolbar";
import MatchDialog from "../components/MatchDialog";
import MatchesTable from "../tables/MatchesTable";


import {
  getMatches,
  deleteMatch,
} from "../../services/match.service";

import type { Match } from "../../types";

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] =
    useState<Match | null>(null);

  const [open, setOpen] = useState(false);


  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    const data = await getMatches();
    setMatches(data);
  }

  function handleCreate() {
    setSelectedMatch(null);
    setOpen(true);
  }

  function handleEdit(match: Match) {
    setSelectedMatch(match);
    setOpen(true);
  }

  async function handleDelete(match: Match) {
    if (
      !confirm(
        `${match.homeTeam.name} - ${match.awayTeam.name} wirklich löschen?`
      )
    ) {
      return;
    }

    await deleteMatch(match.id);

    loadMatches();
  }

  return (
    <>
    <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
  }}
>

  


</div>
      <AdminToolbar
        title="Spiele"
        buttonText="Neues Spiel"
        onCreate={handleCreate}
      />

      <MatchesTable
        rows={matches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MatchDialog
        open={open}
        match={selectedMatch}
        onClose={() => {
          setOpen(false);
          setSelectedMatch(null);
        }}
        onSaved={() => {
          setOpen(false);
          setSelectedMatch(null);
          loadMatches();
        }}
      />
    </>
  );
}