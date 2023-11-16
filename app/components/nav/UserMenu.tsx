"use client"

import Link from "next/link"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import MenuItem from "./MenuItem"
import { signOut } from "next-auth/react"
import BackDrop from './BackDrop'
import { SafeUser } from "@/libs/types"

interface UserMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])
  return (
    <>
        <div className="relative z-30">
            <div onClick={toggleOpen} className={`p-2 border-[1px] border-slate-400 flex flex-row hover:bg-slate-50 items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700
            ${isOpen ? "bg-slate-50 shadow-md" : "bg-slate-200"}
            `}>
                <Avatar src={currentUser?.image}/>
                {isOpen ? <AiFillCaretDown /> : <AiFillCaretUp/>}
            </div>
            {isOpen && 
                <div className="absolute top-12 right-0 w-48 bg-slate-50 shadow-md rounded-md text-sm flex flex-col cursor-pointer">
                    {currentUser ? (
                    <div className="p-2">
                        <Link href="/orders">
                            <MenuItem onClick={toggleOpen}>Orders</MenuItem>
                        </Link>
                        <Link href="/admin">
                            <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                        </Link>
                        <hr />
                        <MenuItem onClick={() => {toggleOpen(); signOut()}}>Logout</MenuItem>
                    </div>
                    ) : (
                    <div>
                        <Link href="/login">
                            <MenuItem onClick={toggleOpen}>Log-in</MenuItem>
                        </Link>
                        <Link href="/register">
                            <MenuItem onClick={toggleOpen}>Sign-up</MenuItem>
                        </Link>
                    </div>
                    )}
                </div>
            }
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  )
}

export default UserMenu;