import {
  FaGithub,
  FaHackerrank,
  FaLinkedinIn,
} from "react-icons/fa";

import { MdAlternateEmail } from "react-icons/md";

import profile from "assets/images/profile.jpg";

const socials = [
  {
    id: 1,
    icon: <FaGithub />,
    link: "https://github.com/ruivalente99",
  },
  {
    id: 2,
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/ruivalente99/",
  },
  {
    id: 3,
    icon: <FaHackerrank />,
    link: "https://www.hackerrank.com/rui_valente99",
  },
  {
    id: 4,
    icon: <MdAlternateEmail />,
    link: "mailto:email@ruivalente.com",
  },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 bg-white md:mx-8 lg:mx-4 mb-8 p-6 shadow-md rounded-md -mt-20">
      <div className="w-30 h-30 rounded-md overflow-hidden mx-auto mb-5">
        <img src={profile} alt="profile_pic" className="w-full" />
      </div>
      <div className="text-center">
        <h1 className="text-xl text-gray-800 font-bold mb-1">Rui Valente</h1>
        <p className="text-sm text-gray-400 mb-3">
          Frontend Developer at
          <a href="https://openvia.io" className="text-purple-600 pl-1">
            Openvia
          </a>
        </p>
        <ul className="flex flex-wrap justify-center">
          {socials.map( ( social ) => (
            <SocialIcon social={social} key={social.id} />
          ) )}
        </ul>
      </div>
      <div className="text-start pt-4">
        <h3 className="text-md mb-2 uppercase font-medium text-gray-800">
          <p className="text-gray-400 text font-light leading-relaxed">
            <b>"You must unlearn what you have learned."</b> ~ Yoda
          </p>
        </h3>

      </div>
    </aside>
  );
};

export default Sidebar;

interface SocialProps {
  social: {
    id: number;
    icon: JSX.Element;
    link: string;
  };
}
const SocialIcon = ( props: SocialProps  ) => {
  const { icon, link } = props.social;
  return (
    <li className="m-2">
      <a
        href={link}
        className="w-8 h-8 bg-purple-100 rounded text-purple-800 flex items-center justify-center hover:text-white hover:bg-purple-600"
      >
        {icon}
      </a>
    </li>
  );
};
