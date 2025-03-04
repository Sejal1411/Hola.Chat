// filepath: /c:/Users/SEJAL SINHA/Desktop/Hello.chat/live-chat-server/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://txpqfuabnwptdwfsmjrz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;