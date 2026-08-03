import { useEffect, useState } from "react";

import AdminToolbar from "../components/AdminToolbar";
import LeagueDialog from "../components/LeagueDialog";
import LeaguesTable from "../tables/LeaguesTable";

import {
  getLeagues,
  deleteLeague,
} from "../../services/league.service";

export default function Leagues() {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<any>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadLeagues();
  }, []);

  async function loadLeagues() {
    const data = await getLeagues();
    setLeagues(data);
  }

  function handleCreate() {
    setSelectedLeague(null);
    setOpen(true);
  }

  function handleEdit(league: any) {
    setSelectedLeague(league);
    setOpen(true);
  }

  async function handleDelete(league: any) {
    if (!confirm(`Liga "${league.name}" löschen?`)) {
      return;
    }

    await deleteLeague(league.id);
    loadLeagues();
  }

  return (
    <>
      <AdminToolbar onCreate={handleCreate} title="Ligen" buttonText="Neue Liga" />

      <LeaguesTable
        rows={leagues}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <LeagueDialog
        open={open}
        league={selectedLeague}
        onClose={() => {
          setOpen(false);
          setSelectedLeague(null);
        }}
        onSaved={() => {
          setOpen(false);
          setSelectedLeague(null);
          loadLeagues();
        }}
      />
    </>
  );
}