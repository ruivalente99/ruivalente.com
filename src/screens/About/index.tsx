import React from "react";
import Skills from "screens/About/Skills";

const About = () => {
  return (
    <section className="py-8">
      <div className="flex flex-wrap md:px-4">
        <div className="w-full">
          <div className="md:mx-4">
            <h3 className="text-2xl text-gray-800 font-bold mb-4">Who am I?</h3>
            <p className="text-sm text-gray-400 leading-6 mb-3">
              I am a talented Software Engineer with expertise in frontend development using React and TypeScript.
              I have a passion for building high-quality applications that are both efficient and user-friendly.
              I possess strong problem-solving skills, and I am always eager to learn new technologies to stay ahead of the curve.
            </p>
            <p className="text-sm text-gray-400 leading-6 mb-3">
            In my free time, I enjoy staying active by hitting the gym and trying new workouts.
            I also love immersing myself in various forms of media, including reading,
            watching anime, and listening to music. These interests allow me to decompress and clear my mind, so I can come back to coding with a fresh perspective.
            </p>
          </div>
          <Skills />
        </div>
      </div>
    </section>
  );
};

export default About;
