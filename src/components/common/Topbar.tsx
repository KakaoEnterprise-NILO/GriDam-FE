import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ProfileMenu from './ProfileMenu';

export default function Topbar() {
  return (
    <div className="ml-5 flex justify-between items-center mb-6">
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="검색"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <ProfileMenu />
    </div>
  );
}
