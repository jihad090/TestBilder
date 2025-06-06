import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <Menubar className=" justify-between">
      <p className="text-3xl font-extrabold text-black-300 drop-shadow-xl text-shadow-lg">
        TestBilder
      </p>

      <div className="flex">
        <MenubarMenu>
          <MenubarTrigger>Home</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>My Question</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="createNew">
              <MenubarRadioItem value="createNew">Create New</MenubarRadioItem>
              <MenubarRadioItem value="incomplete">Incomplete</MenubarRadioItem>
              <MenubarRadioItem value="complete">Complete</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Login</MenubarTrigger>
        </MenubarMenu>
      </div>
      <div>
        darkMode
      </div>
    </Menubar>
  )
}
