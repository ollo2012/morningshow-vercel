import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/settings_profiles.json");
const currentProfilePath = path.join(process.cwd(), "data/settings_current.json");

const ensureFiles = () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  if (!fs.existsSync(currentProfilePath)) {
    fs.writeFileSync(currentProfilePath, JSON.stringify({ currentProfileId: "" }));
  }
};

export async function GET() {
  try {
    ensureFiles();
    const profiles = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const { currentProfileId } = JSON.parse(fs.readFileSync(currentProfilePath, "utf8"));
    return NextResponse.json({ profiles, currentProfileId });
  } catch (error) {
    console.error("Failed to read settings profiles:", error);
    return NextResponse.json({ profiles: [], currentProfileId: "" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, interneKommunikation, unternehmensprofil } = await req.json();
    ensureFiles();
    const profiles = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newProfile = {
      id: Date.now().toString(),
      name,
      interneKommunikation,
      unternehmensprofil,
    };
    profiles.push(newProfile);
    fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));
    return NextResponse.json(newProfile);
  } catch (error) {
    console.error("Failed to save profile:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
