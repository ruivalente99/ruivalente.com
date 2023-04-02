import PortfolioItem from "./PortfolioItem";
import neo from "assets/images/neo.png";
import openvia from "assets/images/openvia.svg";
const portfolioData = [
  {
    id: 1,
    image: openvia,
    title: "Software Engineer - Openvia",
    link: "openvia.io",
    period: {
      start: "2022",
      end: "Present"
    },
    description: `As a Frontend Engineer at Openvia, I have been responsible for designing, creating, and maintaining architecture
    for various projects using React and Typescript, from the initial commit until deployment. I also connect
    frontends with GraphQL or REST APIs, create views using Bootstrap and customize styling for Openvia.
    Additionally, I have maintained legacy projects using Ionic, Angular, Vanilla JS, HTML, CSS, and Ajax. I work
    using an agile methodology and check code quality with Sonarqube and Jest to prevent bugs and ensure code
    coverage. My skills include working with Jenkins, Docker, and AWS to keep projects live, as well as developing
    projects from scratch. `
  },
  {
    id: 2,
    image: neo,
    title: "Software Engineer - Neoception",
    period: {
      start: "2021",
      end: "2022"
    },
    link: "neocetion.com",
    description: ` As a Junior Software Engineer, I gained experience working on a web-based project using React and JavaScript.
    I became proficient in unit testing, code reviews, and utilizing React component libraries like Material
    UI. I was responsible for creating new features and attending meetings with project clients using Jira tickets
    on a Kanban board. Through this, I developed software engineering and communication skills, while
    sharpening my English language proficiency. This experience exposed me to the professional world of software
    development, preparing me for future roles as a software engineer. I have utilized my skills and knowledge
    gained to contribute to the success of numerous projects.`
    ,
  },

];

const Portfolio = () => {
  return (
    <section className="pb-10">
      <div className="flex flex-wrap md:px-4">
        {portfolioData.map( ( portfolio ) => (
          <PortfolioItem portfolio={portfolio} key={portfolio.id} />
        ) )}
      </div>
    </section>
  );
};

export default Portfolio;
