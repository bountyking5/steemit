import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface SideMenuProps {
  menuOpen: boolean;
  handleNav: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuOpen, handleNav }) => (
  <div 
    className={
      menuOpen
        ? "fixed right-0 top-16 top-[68px] h-[calc(100%-75px)] md:rounded-bl-lg md:rounded-tl-lg h-screen bg-cyan-950 p-2 ease-in-out duration-300 transform translate-x-0 "
        : "fixed right-0 top-16 top-[68px] p-2 ease-in-out h-screen duration-300 transform translate-x-full"
    }

    style={{zIndex: 10}}
    
  >
    <Accordion defaultExpandedKeys={["2", "1", "3"]} >
      <AccordionItem
        key="1"
        aria-label="SteemX Explore Accordion"
        title={<span className="text-sm text-primary">SteemX Explore</span>}
        textValue="SteemX Explore" // Added textValue for accessibility
      >
        <Link href="/setting">
          <div className="mx-3 mb-3 text-white hover:border-b text-sm">Setting</div>
        </Link>
        <Link href="/witness">
          <div className="mx-3 mb-3 text-white hover:border-b text-sm">Witness</div>
        </Link>
        <Link href="/communities">
          <div className="mx-3 mb-3 text-white hover:border-b text-sm">Communities</div>
        </Link>
      </AccordionItem>
      <AccordionItem
        key="2"
        title={<span className="text-sm text-primary">SteemWatcher</span>}
        textValue="SteemWatcher" // Added textValue for accessibility
      >
        <Link
          onClick={() => {
            window.location.href = "https://steemwatcher.com/";
          }}
          href=""
        >
          <div className="mx-3 mb-3 text-white hover:border-b text-sm">
            SteemWatcher Portal
          </div>
        </Link>
        <Link
          onClick={() => {
            window.location.href = "https://steemwatcher.com/history_tool.php";
          }}
          href=""
        >
          <div className="mx-3 mb-3 text-white hover:border-b text-sm">
            SteemWatcher Tools
          </div>
        </Link>
      </AccordionItem>
      <AccordionItem
        key="3"
        title={<span className="text-sm text-primary">Contact Us</span>}
        textValue="Contact Us" // Added textValue for accessibility
      >
        <Link href="/about">
          <div className="mx-3 mb-3 text-white hover:border-b text-sm">About</div>
        </Link>
        <Link href="/contact">
          <div className="mx-3 mb-3 text-white hover:border-b text-sm ">Contact</div>
        </Link>
      </AccordionItem>
    </Accordion>
  </div>
);

export default SideMenu;
