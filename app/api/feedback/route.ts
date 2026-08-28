import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";
import { getTierSessionFromToken, TIER_SESSION_COOKIE } from "../../lib/tier-auth";

type Bindings = { DB?: D1Database };
const clean = (value: unknown, max=4000) => String(value ?? "").trim().slice(0,max);

async function ready(db: D1Database) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS lesson_feedback (
      id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL, grade TEXT NOT NULL, module_id INTEGER NOT NULL,
      teacher_email TEXT NOT NULL, teacher_name TEXT NOT NULL, class_name TEXT NOT NULL, taught_at TEXT NOT NULL,
      completion INTEGER NOT NULL, engagement INTEGER NOT NULL, timing TEXT NOT NULL, notes TEXT NOT NULL,
      strengths TEXT NOT NULL, challenges TEXT NOT NULL, adjustments TEXT NOT NULL, next_steps TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_feedback_lesson_created ON lesson_feedback(lesson_id, created_at DESC)"),
  ]);
}

function database() {
  const db = (env as unknown as Bindings).DB;
  if (!db) throw new Error("Banco de feedback indisponível.");
  return db;
}

export async function GET(request: NextRequest) {
  try {
    const user=await getTierSessionFromToken(request.cookies.get(TIER_SESSION_COOKIE)?.value);
    if(!user)return NextResponse.json({items:[],error:"Acesso não autorizado."},{status:401});
    const db=database(); await ready(db);
    const lessonId=clean(request.nextUrl.searchParams.get("lessonId"),30);
    const query=lessonId
      ? db.prepare("SELECT * FROM lesson_feedback WHERE lesson_id = ? ORDER BY created_at DESC LIMIT 50").bind(lessonId)
      : db.prepare("SELECT * FROM lesson_feedback ORDER BY created_at DESC LIMIT 100");
    const result=await query.all();
    return NextResponse.json({items:result.results});
  } catch (error) {
    return NextResponse.json({items:[],error:error instanceof Error?error.message:"Falha ao consultar feedbacks."},{status:503});
  }
}

export async function POST(request: NextRequest) {
  try {
    const user=await getTierSessionFromToken(request.cookies.get(TIER_SESSION_COOKIE)?.value);
    if(!user)return NextResponse.json({error:"Acesso não autorizado."},{status:401});
    const body=await request.json() as Record<string,unknown>; const db=database(); await ready(db);
    const lessonId=clean(body.lessonId,30), className=clean(body.className,120), notes=clean(body.notes);
    if (!lessonId || !className || !notes) return NextResponse.json({error:"Preencha turma e relato da aula."},{status:400});
    const email=clean(user.email,180);
    const name=clean(user.name,180);
    const row={id:crypto.randomUUID(),lessonId,grade:clean(body.grade,12)||"3º ano",moduleId:Number(body.moduleId)||1,email,name,className,
      taughtAt:clean(body.taughtAt,20)||new Date().toISOString().slice(0,10),completion:Math.max(1,Math.min(5,Number(body.completion)||3)),
      engagement:Math.max(1,Math.min(5,Number(body.engagement)||3)),timing:clean(body.timing,40)||"adequado",notes,
      strengths:clean(body.strengths),challenges:clean(body.challenges),adjustments:clean(body.adjustments),nextSteps:clean(body.nextSteps),createdAt:new Date().toISOString()};
    await db.prepare(`INSERT INTO lesson_feedback (id,lesson_id,grade,module_id,teacher_email,teacher_name,class_name,taught_at,completion,engagement,timing,notes,strengths,challenges,adjustments,next_steps,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(row.id,row.lessonId,row.grade,row.moduleId,row.email,row.name,row.className,row.taughtAt,row.completion,row.engagement,row.timing,row.notes,row.strengths,row.challenges,row.adjustments,row.nextSteps,row.createdAt).run();
    return NextResponse.json({ok:true,item:row},{status:201});
  } catch (error) {
    return NextResponse.json({error:error instanceof Error?error.message:"Não foi possível salvar o feedback."},{status:503});
  }
}
