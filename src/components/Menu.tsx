import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"

export function MenubarDemo() {
  return (
    <Menubar className=" justify-between">
      <p className="text-3xl font-extrabold text-black-300 drop-shadow-xl text-shadow-lg">
        TestBilder
      </p>

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
                <MenubarRadioItem value="createNew">
                  Create New
                </MenubarRadioItem>
              </Link> 
              <MenubarRadioItem value="incomplete">Incomplete</MenubarRadioItem>
              <MenubarRadioItem value="complete">Complete</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/login">Login</Link> 
          </MenubarTrigger>
        </MenubarMenu>
      </div>
      <div>
        darkMode
      </div>
    </Menubar>
  )
}
