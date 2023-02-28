import React from "react";
import SkillItem from "./SkillItem";
import { FaAws, FaBootstrap, FaConfluence, FaCss3, FaDocker, FaGit, FaGithub, FaGitkraken, FaJira, FaReact } from 'react-icons/fa';
import { SiSonarqube, SiTypescript, SiJavascript, SiVisualstudiocode, SiJenkins } from 'react-icons/si';
import { BsFillKanbanFill } from 'react-icons/bs';

const skillData = [
  {
    id: 1,
    title: "React",
    icon: <FaReact />,
  },
  {
    id: 2,
    title: "TypeScript",
    icon: <SiTypescript />,
  },
  {
    id: 3,
    title: "JavaScript",
    icon: <SiJavascript />,
  },
  {
    id: 4,
    title: "HTML, CSS, SASS",
    icon: <FaCss3 />,
  },
  {
    id: 5,
    title: "Bootstrap",
    icon: <FaBootstrap />,
  },
];

const agile = [
  {
    id: 1,
    title: "Scrum",
    icon: <FaJira />,
  },
  {
    id: 2,
    title: "Kanban",
    icon: <BsFillKanbanFill />,
  }];

const tools = [
  {
    id: 1,
    title: "Git",
    icon: <FaGit />,
  },
  {
    id: 2,
    title: "GitKraken",
    icon: <FaGitkraken />,
  },
  {
    id: 3,
    title: "Jira",
    icon: <FaJira />,
  },
  {
    id: 4,
    title: "Confluence",
    icon: <FaConfluence />,
  },
  {
    id: 5,
    title: "VSCode",
    icon: <SiVisualstudiocode />,
  }
]

const cicd = [
  {
    id: 1,
    title: "Jenkins",
    icon: <SiJenkins />,
  },
  {
    id: 2,
    title: "GitHub Actions",
    icon: <FaGithub />,
  },
  {
    id: 3,
    title: "AWS",
    icon: <FaAws />,
  },
  {
    id: 4,
    title: "Docker",
    icon: <FaDocker />,
  },
  {
    id: 5,
    title: "SonarQube",
    icon: <SiSonarqube />,
  }
]
const Skills = () => {
  return (
    <div className="py-4">
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="md:mx-4">
            <h6 className="text-2xl text-gray-800 font-bold mb-4">Skills</h6>
          </div>
        </div>
        {skillData.map( ( skill ) => (
          <SkillItem skill={skill} key={skill.id} />
        ) )}
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="md:mx-4">
            <h6 className="text-2xl text-gray-800 font-bold mb-4">Methodologies</h6>
          </div>
        </div>
        {agile.map( ( skill ) => (
          <SkillItem skill={skill} key={skill.id} />
        ) )}
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="md:mx-4">
            <h6 className="text-2xl text-gray-800 font-bold mb-4">Tools</h6>
          </div>
        </div>
        {tools.map( ( skill ) => (
          <SkillItem skill={skill} key={skill.id} />
        ) )}
      </div>


      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="md:mx-4">
            <h6 className="text-2xl text-gray-800 font-bold mb-4">CI/CD</h6>
          </div>
        </div>
        {cicd.map( ( skill ) => (
          <SkillItem skill={skill} key={skill.id} />
        ) )}
      </div>

    </div>



  );
};

export default Skills;
