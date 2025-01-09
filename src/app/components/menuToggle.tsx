// components/navbar/MenuToggle.tsx
import { IoReorderThreeOutline, IoCloseOutline } from 'react-icons/io5';

interface MenuToggleProps {
  menuOpen: boolean;
  handleNav: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ menuOpen, handleNav }) => (
  <div onClick={handleNav} className="cursor-pointer">
    {menuOpen ? <IoCloseOutline size={30} color='white' /> : <IoReorderThreeOutline size={30} color='white' />}
  </div>
);

export default MenuToggle;
