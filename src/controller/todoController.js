const jwt = require("jsonwebtoken");
const supabase = require("../connection/connect");

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.user_id;
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const user_id = getUserIdFromToken(req);

    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(todos);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const { task_name, due_date } = req.body;

  try {
    const user_id = getUserIdFromToken(req);

    const { data: todo, error } = await supabase
      .from("todos")
      .insert([{ user_id, task_name, due_date }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(todo);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  const { todo_id } = req.params;
  const { task_name, due_date } = req.body;

  try {
    const user_id = getUserIdFromToken(req);

    const { data: updated, error } = await supabase
      .from("todos")
      .update({ task_name, due_date })
      .eq("todo_id", todo_id)
      .eq("user_id", user_id)
      .select()
      .single();

    if (error || !updated) throw error;

    res.json(updated);
  } catch {
    res.status(401).json({ message: "Unauthorized or not found" });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { todo_id } = req.params;

  try {
    const user_id = getUserIdFromToken(req);

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("todo_id", todo_id)
      .eq("user_id", user_id);

    if (error) throw error;

    res.json({ message: "Todo deleted" });
  } catch {
    res.status(401).json({ message: "Unauthorized or not found" });
  }
};
