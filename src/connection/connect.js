const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseurl = process.env.supabaseurl;
const supabasekey = process.env.supabasekey;

const supabase = createClient(supabaseurl, supabasekey);

module.exports = supabase;
