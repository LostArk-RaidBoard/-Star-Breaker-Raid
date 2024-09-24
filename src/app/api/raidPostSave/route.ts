'use server'
import { sql } from '@vercel/postgres'

interface RaidPost {
  raid_name: string
  raid_time: Date | null | string // 문자열이거나 null일 수도 있으므로 추가
  limit_level: string
  user_id: string
  post_position: string
  noti: string
  fixed: boolean
  character_level: string
  character_name: string
  character_classicon: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
}

export async function POST(req: Request) {
  const raidPost: RaidPost = await req.json()

  try {
    let raidTime: string | null = null

    // raid_time이 Date 객체인지 확인 후 처리
    if (raidPost.raid_time instanceof Date) {
      // Date 객체라면 TIMESTAMP 형식으로 변환
      raidTime = raidPost.raid_time.toISOString().slice(0, 19).replace('T', ' ')
    } else if (typeof raidPost.raid_time === 'string') {
      // 문자열로 넘어온 경우 그대로 사용
      raidTime = raidPost.raid_time
    }

    const res = await sql`
      INSERT INTO raid_posts (
        raid_name,
        raid_time,
        limit_level,
        user_id,
        post_position,
        noti,
        fixed,
        character_level,
        character_name,
        raid_limitperson,
        raid_type,
        raid_maxtime,
        character_classicon
      ) VALUES (
        ${raidPost.raid_name},
        ${raidTime},
        ${raidPost.limit_level},
        ${raidPost.user_id},
        ${raidPost.post_position},
        ${raidPost.noti},
        ${raidPost.fixed},
        ${raidPost.character_level},
        ${raidPost.character_name},
        ${raidPost.raid_limitperson},
        ${raidPost.raid_type},
        ${raidPost.raid_maxtime},
        ${raidPost.character_classicon}
      )`

    return new Response(JSON.stringify({ message: '레이드 생성 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
