const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../connection/connect");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ name, email, password: hash }])
      .select("user_id, name, email")
      .single();

    if (insertError) throw insertError;

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, name: user.name });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};
