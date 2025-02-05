import { Bell, Settings, User } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export function Header() {
	const { state, logout } = useAuth();

	return (
		<header className="mb-1 flex align-middle justify-between shadow-md w-full h-14 py-2 px-8 bg-white">
			<div className='flex items-center'>
				<input type="text" placeholder="Search by keyword" className="border-none p-2 rounded w-96 font-poppins bg-blue-50 outline-none" />
			</div>
			<div className="flex align-middle justify-between">
				<div className='h-12 w-12 rounded-full flex items-center justify-center mx-1'>
					<Bell size={17} color='#4a4a4a' />
				</div>
				<div className='h-12 w-12 rounded-full flex items-center justify-center mx-1'>
					<User size={17} color='#4a4a4a' />
				</div>
			</div>
		</header>
	);
}