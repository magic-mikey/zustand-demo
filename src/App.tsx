import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTodoStore } from "./data/todoStore";
import { useBearStore } from "./data/bearStore";

const useStyles = makeStyles((theme) => ({
  headerTextStyles: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  textBoxStyles: {
    marginBottom: theme.spacing(1),
  },
  addButtonStyles: {
    marginBottom: theme.spacing(2),
  },
  completedTodoStyles: {
    textDecoration: "line-through",
  },
}));

function App() {
  const {
    headerTextStyles,
    textBoxStyles,
    addButtonStyles,
    completedTodoStyles,
  } = useStyles();
  const [todoText, setTodoText] = useState("");

  const { addTodo, removeTodo, toggleCompletedState, todos } = useTodoStore();
  const { addABear, removeABear, addFood, removeFood, bears, food } =
    useBearStore();

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" className={headerTextStyles}>
        To-Do's
      </Typography>
      <TextField
        className={textBoxStyles}
        label="Todo Description"
        required
        variant="outlined"
        fullWidth
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
      />
      <Button
        className={addButtonStyles}
        fullWidth
        variant="outlined"
        color="primary"
        onClick={() => {
          if (todoText.length) {
            addTodo(todoText);
            setTodoText("");
          }
          console.log(useTodoStore.getState().todos);
        }}
      >
        Add Item
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => {
                  toggleCompletedState(todo.id);
                  console.log(useTodoStore.getState().todos);
                }}
              />
            </ListItemIcon>
            <ListItemText
              className={todo.completed ? completedTodoStyles : ""}
              key={todo.id}
            >
              {todo.description}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  removeTodo(todo.id);
                  console.log(useTodoStore.getState().todos);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box>
        <Typography variant="h3" className={headerTextStyles}>
          Bear Counter: {bears}
        </Typography>
        <Button
          onClick={() => {
            addABear();
            console.log(useBearStore.getState());
          }}
        >
          Add a bear!
        </Button>
        <Button
          onClick={() => {
            removeABear();
            console.log(useBearStore.getState());
          }}
        >
          Remove a bear!
        </Button>
        <Typography variant="h3" className={headerTextStyles}>
          Food Counter: {food}
        </Typography>
        <Button
          onClick={() => {
            addFood();
            console.log(useBearStore.getState());
          }}
        >
          Feed the bear(s)!
        </Button>
        <Button
          onClick={() => {
            removeFood();
            console.log(useBearStore.getState());
          }}
        >
          Take food away (you suck)!
        </Button>
        <Button
          onClick={() => {
            useBearStore.persist.rehydrate();
            console.log(useBearStore.getState());
          }}
        >
          Rehydrate bear(s)!
        </Button>
      </Box>
    </Container>
  );
}

export default App;
