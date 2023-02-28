
const SkillItem = ( {skill} : any ) => {
  const { title, icon } = skill;
  return (
    <div className="w-full md:w-1/2">
      <div className="mb-4 md:mx-4">
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-md text-gray-400 font-light">{title}</h5>
          <span className="text-md text-purple-600 font-bold">
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
