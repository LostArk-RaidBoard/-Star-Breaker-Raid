import Image from 'next/image'
import Megaphone from '@image/icon/megaphone.svg'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'
import RaidNotiTextArea from '@/components/raidPostField/raidNotiTextArea'

interface Post {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
  nickname: string
}

interface RaidPostProps {
  postData: Post
}

export default async function RaidPost({ postData }: RaidPostProps) {
  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <div className='flex flex-col sm:flex-row'>
        <div className='flex basis-1/2 flex-col gap-4 p-4'>
          <span className='flex h-14 items-center justify-center rounded-md border border-gray-500 bg-gray-900 p-2 text-xl text-white'>
            💥 &nbsp; <span className='font-bold'>{postData.raid_name}</span> &nbsp; 💥
          </span>
          <div className='text-lg'>
            <span className='font-bold'>• 레이드 시간 : </span>
            <span className='font-medium'>{convertToKoreanTime(postData.raid_time)}</span>
          </div>
          <div className='text-lg'>
            <span className='font-bold'>• 레이드 타입 : </span>
            <span className='font-medium'>{postData.raid_type}</span>
          </div>
          <div className='text-lg'>
            <span className='font-bold'>• 레이드 최대 시간 : </span>
            <span className='font-medium'>{postData.raid_maxtime}</span>
          </div>
          <div className='text-lg'>
            <span className='font-bold'>• 최소 레벨 : </span>
            <span className='font-medium'>{postData.limit_level} Lv</span>
          </div>
          <div className='text-lg'>
            <span className='font-bold'>• 파티 최대 정원 : </span>{' '}
            <span className='font-medium'>{postData.raid_limitperson} 명</span>
          </div>
        </div>
        <div className='flex h-full basis-1/2 flex-col gap-4 p-4'>
          <span className='flex items-center gap-2 text-lg'>
            <Megaphone className='h-8 w-8' /> <span className='font-bold'>공대장</span>
            <span className='font-bold'>{postData.nickname || postData.user_id}</span>
          </span>
          <div className='flex h-16 items-center gap-4 overflow-hidden whitespace-nowrap rounded-md bg-gray-900 px-4 text-lg text-white'>
            <Image src={postData.character_image} alt='공대장' width={40} height={40} />
            <Image
              src={postData.character_classicon}
              alt='공대장'
              width={35}
              height={35}
              className='hidden sm:block'
            />
            <span className='overflow-hidden whitespace-nowrap'>{postData.character_name}</span>
            <span className='hidden sm:block'>{postData.character_level}</span>
          </div>
          <span className='text-lg'>
            <span className='font-bold'>• 칭호 : </span>
            <span className='font-medium'>
              {postData.post_position === 'teacher' ? 'Teacher' : 'User'}
            </span>
          </span>
          <div className='flex flex-col gap-2'>
            <span className='text-lg font-bold'>• 레이드 공지</span>
            <RaidNotiTextArea postNoti={postData.noti} />
          </div>
        </div>
      </div>
    </div>
  )
}
