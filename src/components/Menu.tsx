"use client"

import type React from "react" 
import { createContext, useContext, useState, useEffect, useCallback } from "react" 
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useRouter } from "next/navigation"
import { CgProfile } from "react-icons/cg"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"


interface AuthContextType {
  userId: string | null
  isLoggedIn: boolean
  login: (id: string) => void
  logout: () => void
  refreshAuthStatus: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuthStatus = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId")
      setUserId(storedUserId)
      setIsLoggedIn(!!storedUserId)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus() 

    const handleStorageChange = () => {
      checkAuthStatus()
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [checkAuthStatus])

  const login = useCallback((id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", id)
      setUserId(id)
      setIsLoggedIn(true)
    }
  }, [])

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId")
      setUserId(null)
      setIsLoggedIn(false)
    }
  }, [])

  const refreshAuthStatus = useCallback(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn, login, logout, refreshAuthStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function MenubarContentComponent() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth() 

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <Menubar className=" justify-between fixed w-full top-0 z-10">
      <p className="text-3xl font-extrabold text-black-300 drop-shadow-xl text-shadow-lg">TestBilder</p>
      <div className="flex gap-4">
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/">Home</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>My Question</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="createNew">
              <Link href="/createQuestionPrimaryInfo">
                <MenubarRadioItem value="createNew">Create New</MenubarRadioItem>
              </Link>
              <Link href="/incomplete">
                <MenubarRadioItem value="incomplete">Incomplete</MenubarRadioItem>
              </Link>
              <Link href="/complete">
                <MenubarRadioItem value="complete">Complete</MenubarRadioItem>
              </Link>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          {isLoggedIn ? (
            <MenubarTrigger onClick={handleLogout}>Logout</MenubarTrigger>
          ) : (
            <MenubarTrigger asChild>
              <Link href="/login">Login</Link>
            </MenubarTrigger>
          )}
        </MenubarMenu>
      </div>
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center gap-1">
            <CgProfile /> Profile
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Profile</SheetTitle>
            <SheetDescription>
              If you edit your profile, it will reflect in your new exam templet. You must save all the info providing
              current password
            </SheetDescription>
          </SheetHeader>
          <form className="px-4 h-full overflow-y-auto">
            <div className="py-1">
              <label htmlFor="userName" className="font-semibold">
                Name
              </label>
              <input
                className="w-full p-2 border border-black"
                defaultValue="your name from DB"
                id="userName"
                type="text"
              />
            </div>
            <div className="py-1">
              <label htmlFor="institutionName" className="font-semibold">
                Institution Name
              </label>
              <input
                className="w-full p-2 border border-black"
                defaultValue="institution name from DB"
                id="institutionName"
                type="text"
              />
            </div>
            <div className="py-1">
              <label htmlFor="prefferedVersion" className="font-semibold">
                Preferred Version
              </label>
              <select className="w-full p-2 border border-black" defaultValue="Bangla" id="prefferedVersion">
                <option value="ban">Bangla</option>
                <option value="eng">English</option>
              </select>
            </div>
            <div className="py-1">
              <label htmlFor="userEmail" className="font-semibold">
                Email
              </label>
              <input
                className="w-full p-2 border border-black"
                defaultValue="email from DB"
                id="userEmail"
                type="email"
              />
            </div>
            <div className="py-1">
              <label htmlFor="userMobileNo" className="font-semibold">
                Mobile No
              </label>
              <input
                className="w-full p-2 border border-black"
                defaultValue="no from DB"
                id="userMobileNo"
                type="text"
              />
            </div>
            <div className="py-1">
              <label htmlFor="userNewPassword" className="font-semibold">
                New Password (Change Password)
              </label>
              <input className="w-full p-2 border border-black" id="userNewPassword" type="password" />
            </div>
            <div className="py-1">
              <label htmlFor="userPassword" className="font-semibold">
                Current Password (To save current changes)
              </label>
              <input className="w-full p-2 border border-black" autoFocus id="userPassword" type="password" />
            </div>
            <div className="w-full my-10 flex justify-center">
              <button className="bg-black text-l px-4 py-1 rounded-md text-white font-semibold hover:bg-blue-800">
                Save Changes
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </Menubar>
  )
}

export function MenubarDemo({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MenubarContentComponent />
      {children}
    </AuthProvider>
  )
}
