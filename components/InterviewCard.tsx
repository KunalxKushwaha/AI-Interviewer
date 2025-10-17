import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({interviewId, userId, role, type, techstack, createdAt} : InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formatedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM DD, YYYY");
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
            <p className='badge-text'>{normalizedType}</p>
          </div>

          <Image src={getRandomInterviewCover()} alt='Interview Cover image' width={90} height={90} className='rounded-full object-fit size-[90px]'/>

          <h3 className='mt-5 capitalize'>{role} Interview</h3>

          <div className='flex flex-row gap-5 mt-3'>
            <div className='flex flex-row gap-2'>
              <Image src="/calendar.svg" alt="Calendar Icon" width={22} height={22} />
              <p className='text-sm text-light-300'>{formatedDate}</p>

            </div>
            <div className='flex flex-row gap-2 items-center'>
              <Image src="/star.svg" alt="Star Icon" width={22} height={22} />
              <p className='text-sm text-light-300'>{feedback ?.totalScore ||  "---"}/100</p>
            </div>
          </div>

          <p className='line-clamp-2 mt-5'>
            {feedback ?.finalAssessment || "You Haven't Taken any Interview yet. Take it right now to Improve your Skills."}
          </p>

        </div>

        <div className='flex flex-row justify-between'>
          <DisplayTechIcons techStack={techstack}/>
          <Button className='btn-primary'>
            <Link href={feedback ? `/interview/${interviewId}` : `/interview/${interviewId}`}>
           { feedback ? "Check Feedback" : "View Interview" }
            </Link>
            </Button>
          

        </div>


      </div>
    </div>
  )
}

export default InterviewCard
