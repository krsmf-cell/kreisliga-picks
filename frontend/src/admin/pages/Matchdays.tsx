import { useEffect, useState } from "react";

import AdminToolbar from "../components/AdminToolbar";
import MatchdaysTable from "../tables/MatchdaysTable";
import MatchdayDialog from "../components/MatchdayDialog";
import {
  getMatchdays,
  deleteMatchday,
} from "../../services/matchday.service";

export default function Matchdays() {
  const [matchdays, setMatchdays] = useState<any[]>([]);
  const [selectedMatchday, setSelectedMatchday] = useState<any>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadMatchdays();
  }, []);

  async function loadMatchdays() {
    const data = await getMatchdays();
    setMatchdays(data);
  }

  function handleCreate() {
    setSelectedMatchday(null);
    setOpen(true);
  }

  function handleEdit(matchday: any) {
    setSelectedMatchday(matchday);
    setOpen(true);
  }

  async function handleDelete(matchday: any) {
    if (
      !confirm(
        `Spieltag ${matchday.number} wirklich löschen?`
      )
    ) {
      return;
    }

    await deleteMatchday(matchday.id);

    loadMatchdays();
  }

  return (
    <>
      <AdminToolbar
        title="Spieltage"
        buttonText="Neuer Spieltag"
        onCreate={handleCreate}
      />

      <MatchdaysTable
        rows={matchdays}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MatchdayDialog
        open={open}
        matchday={selectedMatchday}
        onClose={() => {
          setOpen(false);
          setSelectedMatchday(null);
        }}
        onSaved={() => {
          setOpen(false);
          setSelectedMatchday(null);
          loadMatchdays();
        }}
      />
    </>
  );
}