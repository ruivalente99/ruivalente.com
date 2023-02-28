import PortfolioItem from "./PortfolioItem";
import neo from "assets/images/neo.png";
const portfolioData = [
  {
    id: 1,
    image: neo,
    title: "Software Engineer - Neoception",
    link: "#0",
    description:
      "Working on a project for Shop Floor management. The project is built on React with Material UI, Redux, Javascript and Jira for project management.",
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
