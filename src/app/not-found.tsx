"use client"
import Link from 'next/link';
import NotFoundIcon from "./components/assets/notFoundIcon.svg";
import NotFoundtxtIcon from "./components/assets/notfoundtxtIcon.svg";
import "./not_found.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const navigateToLogin = ()=>{
    router.push("/pages/signin");
  }
  return (
  <div className='Notfouncnt'>
      <Image src={NotFoundIcon} width={155} height={110} alt="none"/>
      <Image src={NotFoundtxtIcon} width={144} height={88} alt="none" className="notfoundImagetxtIcon"/>
      <div className="notfoundtitletxt">It seems like we&apos;ve lost the beat</div>
      <div className="notfoundtitlesubtxt">Page not found !</div>
      <button className='notfoundbtn' onClick={()=>{navigateToLogin()}}>Back to Sign In</button>
  </div>
  )
}