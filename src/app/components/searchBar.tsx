// components/navbar/SearchBar.tsx
import { Input } from '@nextui-org/react';
import { MdOutlineSearch } from 'react-icons/md';

const SearchBar: React.FC = () => (
  <div className="flex w-15 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Input
    size='sm'
      type="search"
      placeholder="Search here....."
      labelPlacement="outside"
      className="md:block hidden"
      endContent={
        <MdOutlineSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0 md:block hidden" />
      }
    />
  </div>
);

export default SearchBar;
