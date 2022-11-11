import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://hvaccmtdargvmzjcniqy.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2YWNjbXRkYXJndm16amNuaXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTE1MDQsImV4cCI6MTk4Mzc2NzUwNH0.YHTcqKVhxwfKULvb1DidOr2eBfFUC9TGFD2f1NiOfiQ"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*")
    },
  }
}
