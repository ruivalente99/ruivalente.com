import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import About from "screens/About";
import Portfolio from "screens/Portfolio";


const navbarData = [
  {
    id: 1,
    title: "About",
    to: "/about",
  },
  {
    id: 3,
    title: "Works",
    to: "/works",
  },
];

const Navbar = () => {
  return (
    <Router>
      
      <nav className="md:mx-8 mb-3 mt-1 px-6 py-2 z-10 sticky top-0 bg-white shadow rounded">
        <ul className="flex flex-wrap">
          {navbarData.map( ( el ) => (
            <LinkItem el={el} key={el.id} />
          ) )}
        </ul>
      </nav>


      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/works" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </Router>
  );
};

export default Navbar;

interface LinkItemProps {
  el: {
    id: number;
    title: string;
    to: string;
  };
}

const LinkItem = ( props: LinkItemProps ) => {
  const { title, to } = props.el;
  return (
    <li className="m-3 lg:mx-5">
      <NavLink
        to={to}
        className="text-gray-800 text-medium hover:text-purple-600"
      >
        {title}
      </NavLink>
    </li>
  );
};
