import backupDatabase from "@/app/lib/db/backup";
import { NextResponse } from "next/server";

export async function POST(req) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token !== process.env.BACKUP_API_TOKEN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const backupFile = await backupDatabase();
    return NextResponse.json({ message: 'Backup successful', backupFile });
  } catch (error) {
    return NextResponse.json({ message: 'Backup failed', error: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
