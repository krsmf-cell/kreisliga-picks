import { useEffect, useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Button } from "@mui/material";
import {
  generatePredictionLeague,
} from "../../services/predictionLeague.service";
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import type { User } from "../../types/user";

import {
  getUsers,
  updateUser,
} from "../../services/user.service";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getUsers();
    setUsers(data);
  }

  function updateLocal(
    id: number,
    values: Partial<User>,
  ) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              ...values,
            }
          : u,
      ),
    );
  }
async function generateLeague() {

  if (
    !confirm(
      "Spielplan wirklich neu erzeugen?",
    )
  ) {
    return;
  }

  try {

    const result =
      await generatePredictionLeague();

    alert(
      `${result.fixtures} Begegnungen erstellt.`,
    );

  } catch (e) {

    alert("Fehler");

  }

}
  async function save(user: User) {
    await updateUser(user.id, {
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
      predictionLeague:
        user.predictionLeague,
    });

    alert("Benutzer gespeichert");
  }

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Benutzer
      </Typography>

      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Benutzer
              </TableCell>

              <TableCell>
                E-Mail
              </TableCell>

              <TableCell>
                Rolle
              </TableCell>

              <TableCell>
                Aktiv
              </TableCell>

              <TableCell>
                Prediction League
              </TableCell>

              <TableCell
                align="center"
              >
                Speichern
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {users.map((user) => (

              <TableRow
                key={user.id}
                hover
              >

                <TableCell>
                  <Typography
                    fontWeight={600}
                  >
                    {user.username}
                  </Typography>
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>

                  <FormControl
                    size="small"
                  >

                    <Select
                      value={user.role}
                      onChange={(e) =>
                        updateLocal(
                          user.id,
                          {
                            role: e.target.value as any,
                          },
                        )
                      }
                    >

                      <MenuItem value="USER">
                        USER
                      </MenuItem>

                      <MenuItem value="MODERATOR">
                        MODERATOR
                      </MenuItem>

                      <MenuItem value="ADMIN">
                        ADMIN
                      </MenuItem>

                    </Select>

                  </FormControl>

                </TableCell>

                <TableCell>

                  <Switch
                    checked={user.active}
                    onChange={(e) =>
                      updateLocal(
                        user.id,
                        {
                          active:
                            e.target.checked,
                        },
                      )
                    }
                  />

                </TableCell>

                <TableCell>

                  <Switch
                    color="success"
                    checked={
                      user.predictionLeague
                    }
                    onChange={(e) =>
                      updateLocal(
                        user.id,
                        {
                          predictionLeague:
                            e.target.checked,
                        },
                      )
                    }
                  />

                </TableCell>

                <TableCell
                  align="center"
                >

                  <IconButton
                    color="primary"
                    onClick={() =>
                      save(user)
                    }
                  >
                    <SaveIcon />
                  </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    mb: 3,
  }}
>

  <Typography
    variant="h4"
    fontWeight={700}
  >
    Benutzer
  </Typography>

  <Button
    variant="contained"
    color="success"
    startIcon={<AddTaskIcon />}
    onClick={generateLeague}
  >
    Spielplan erzeugen
  </Button>

</Box>
      </Paper>

    </Box>
  );
  
}