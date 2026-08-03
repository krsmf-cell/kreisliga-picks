import { useEffect, useState } from "react";

import AdminToolbar from "../components/AdminToolbar";
import SeasonDialog from "../components/SeasonDialog";
import SeasonsTable from "../tables/SeasonsTable";

import {
  getSeasons,
  deleteSeason,
} from "../../services/season.service";

export default function Seasons() {

  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadSeasons();
  }, []);

  async function loadSeasons() {
    const data = await getSeasons();
    setSeasons(data);
  }

  function handleCreate() {
    setSelectedSeason(null);
    setOpen(true);
  }

  function handleEdit(season: any) {
    setSelectedSeason(season);
    setOpen(true);
  }

  async function handleDelete(season: any) {

    if (!confirm(`Saison "${season.name}" löschen?`)) {
      return;
    }

    await deleteSeason(season.id);

    loadSeasons();
  }

  return (
    <>
      <AdminToolbar
        title="Saisons"
        buttonText="Neue Saison"
        onCreate={handleCreate}
      />

      <SeasonsTable
        rows={seasons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SeasonDialog
        open={open}
        season={selectedSeason}
        onClose={() => {
          setOpen(false);
          setSelectedSeason(null);
        }}
        onSaved={() => {
          setOpen(false);
          setSelectedSeason(null);
          loadSeasons();
        }}
      />
    </>
  );
}