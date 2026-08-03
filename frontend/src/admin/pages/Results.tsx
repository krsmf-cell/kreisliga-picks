import { useEffect, useState } from "react";

import AdminToolbar from "../components/AdminToolbar";
import ResultsTable from "../tables/ResultsTable";

import {
  getMatches,
} from "../../services/match.service";

import type { Match } from "../../types";

export default function Results() {

  const [matches, setMatches] =
    useState<Match[]>([]);

  useEffect(() => {

    loadMatches();

  }, []);

  async function loadMatches() {

    const data =
      await getMatches();

    setMatches(data);

  }

  return (
    <>
      <AdminToolbar
        title="Ergebnisse"
      />

      <ResultsTable
        rows={matches}
        onSaved={loadMatches}
      />
    </>
  );

}