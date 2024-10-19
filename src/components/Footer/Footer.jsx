import React from 'react'
import Logo from '../Logo';
import { BsTwitterX } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

function Footer() {
  return (
    <div className="flex flex-row justify-between bg-neutral-900 p-6">
        <div className="min-w-fit">
            <Logo />
        </div>
        <div className='flex flex-col text-white'>
          <div className='flex flex-row justify-end mb-2 text-xl'>
            <a href="https://x.com/kumar6345" target="_blank" rel="noopener noreferrer">
              <BsTwitterX className='mr-2 cursor-pointer'/>
            </a>
            <a href="https://github.com/kumar4532" target="_blank" rel="noopener noreferrer">
              <FiGithub  className='ml-2 cursor-pointer'/>
            </a>
          </div>
          <div>
            <span>@made by me.</span>
          </div>
        </div>
    </div>
  )
}

export default Footer;