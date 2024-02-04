import { useEffect, useState } from "react";
import {
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { callApi } from "@/services/callApi";
import {
  GetQueryClientNotesSnippet,
  Note,
  PostQueryDeleteNoteSnippet,
} from "@/services/Notes/apiNotesSnippets";
import { getQueryClientNotes } from "@/services/Notes/apiNotesGetQueries";
import { formatDate } from "@/helpers/helpers";
import { ModalDataType } from "@/app/clients/page";
import ClientNoteForm from "./ClientNoteForm";
import { postQueryDeleteNote } from "@/services/Notes/apiNotesPostQueries";

interface ClientNotesProps {
  modalData: ModalDataType;
}

const ClientNotes: React.FC<ClientNotesProps> = ({ modalData }) => {
  const [notesData, setNotesData] = useState<Note[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!modalData._id) return;
    (async () => {
      try {
        const notesData = await callApi<GetQueryClientNotesSnippet>({
          query: getQueryClientNotes(modalData._id),
        });

        if (notesData.success) {
          setNotesData(notesData.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [modalData._id]);

  const handleNoteDelete = async (noteId: string) => {
    setLoading(true);
    try {
      const deletedNote = await callApi<PostQueryDeleteNoteSnippet>({
        query: postQueryDeleteNote(noteId),
      });

      if (deletedNote.success) {
        setNotesData((prevNotes) => {
          return prevNotes?.filter((note) => note._id !== noteId);
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Stack gap={2}>
      <ClientNoteForm clientId={modalData._id} setNotesData={setNotesData} />

      <Divider />

      {loading && <LinearProgress />}

      <List
        sx={{
          height: "100%",
          maxHeight: "20rem",
          overflow: "auto",
        }}
      >
        {notesData ? (
          notesData.length === 0 ? (
            <Stack justifyContent="center" alignItems="center" my={2}>
              <ListItemText primary="Няма добавени бележки" />
            </Stack>
          ) : (
            notesData.map((note) => (
              <ListItem
                key={note._id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleNoteDelete(note._id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={note.title}
                  secondary={formatDate(note.createdAt)}
                />
              </ListItem>
            ))
          )
        ) : (
          <Stack justifyContent="center" alignItems="center" my={2}>
            <CircularProgress sx={{ fontSize: "5rem" }} />
          </Stack>
        )}
      </List>
    </Stack>
  );
};

export default ClientNotes;
