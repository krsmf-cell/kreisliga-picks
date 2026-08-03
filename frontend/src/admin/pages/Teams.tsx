import { useEffect, useState } from "react";

import AdminToolbar from "../components/AdminToolbar";
import TeamDialog from "../components/TeamDialog";
import TeamsTable from "../tables/TeamsTable";
import ConfirmDialog from "../components/ConfirmDialog";
import type { Team } from "../../types/team";
import {
  getTeams,
  deleteTeam,
} from "../../services/team.service";

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTeamItem, setDeleteTeamItem] = useState<Team | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  async function loadTeams() {
    const data = await getTeams();
    setTeams(data);
  }

  function handleCreate() {
    setSelectedTeam(null);
    setOpen(true);
  }

  function handleEdit(team: Team) {
    setSelectedTeam(team);
    setOpen(true);
  }

  async function handleDelete() {
    if (!deleteTeamItem) return;

    await deleteTeam(deleteTeamItem.id);

    setDeleteOpen(false);
    setDeleteTeamItem(null);

    loadTeams();
  }

  return (
    <>
      <AdminToolbar
        onCreate={handleCreate}
      />

      <TeamsTable
        rows={teams}
        onEdit={handleEdit}
        onDelete={(team) => {
          setDeleteTeamItem(team);
          setDeleteOpen(true);
        }}
      />

      <TeamDialog
        open={open}
        team={selectedTeam}
        onClose={() => {
          setOpen(false);
          setSelectedTeam(null);
        }}
        onSaved={() => {
          setOpen(false);
          setSelectedTeam(null);
          loadTeams();
        }}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Team löschen"
        message={`Soll "${deleteTeamItem?.name}" wirklich gelöscht werden?`}
        onCancel={() => {
          setDeleteOpen(false);
          setDeleteTeamItem(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}