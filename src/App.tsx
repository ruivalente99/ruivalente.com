

import Footer from 'components/Footer';
import ProfileCover from 'components/ProfileCover';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import './index.css';

function App() {

	return (
		<main className="min-h-screen relative bg-gray-50 pb-10">
			<ProfileCover />
			<div className="container px-4">
				<div className="flex flex-wrap px-4">
					<div className="w-full lg:w-1/3 ">
						<Sidebar />
					</div>
					<div className="w-full lg:w-2/3 ">
						<Navbar />
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}

export default App;
