import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import he from "he";
import Form from "./Form";
import Header from "./Bootstrap/Header";
import Preview from "./Preview";
import NavbarDesign1 from ".././components/options/navbar/NavbarDesign1";
import NavbarDesign2 from ".././components/options/navbar/NavbarDesign2";
import NavbarDesign3 from "./options/navbar/NavbarDesign3";
import NavbarDesign4 from ".././components/options/navbar/NavbarDesign4";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import TopPortion1 from "./options/about/option1";
import TopPortion2 from "./options/about/option2";
import TopPortion3 from "./options/about/option3";
import TopPortion4 from "./options/about/option4";
import Experience1 from "./options/experience/option1";
import Experience2 from "./options/experience/option2";
import Experience3 from "./options/experience/option3"; 
import Experience4 from "./options/experience/option4";
import EducationDesign1 from "./options/education/option1";
import EducationDesign2 from "./options/education/option2";
import EducationDesign3 from "./options/education/option3";
import EducationDesign4 from "./options/education/option4";
import GetInTouch from "./options/getInTouch/option1";
import Code from "./Code";
import { motion } from 'framer-motion';

const PortfolioCard = (
  state,
  {
    experienceTitle,
    skillsTitle,
    interestsTitle,
    awardsTitle,
    educationTitle,
    projectsTitle,
  }
) => {
  const projects =
    state.projects &&
    state.projects.length > 0 &&
    state.projects.map((projectObj) => projectObj.project);

  const data = {
    FormData: {
      FirstName: "",
      LastName: "",
      Thubmnail: "",
      URL: "",
      Description: "",
      Keywords: "",
      Address: "",
      Phone: "",
      Email: "",
      Colour: "#5538BC",
      Socials: {
        Facebook: "",
        WhatsApp: "",
        Instagram: "",
        Twitter: "",
        LinkedIn: "",
        GitHub: "",
        StackOverflow: "",
      },
    },
    fileDownloadUrl: null,
    PreviewMode: true,
  };
  const [initialState, setInitialState] = useState(data);

  const handleChange = (e) => {
    Object.keys(data.FormData).includes(e.target.name)
      ? setInitialState((prevState) => {
          return {
            ...prevState,
            FormData: {
              ...initialState.FormData,
              [e.target.name]: e.target.value,
            },
            PreviewMode: false,
          };
        })
      : setInitialState((prevState) => {
          return {
            ...prevState,
            FormData: {
              ...initialState.FormData,
              Socials: {
                ...initialState.FormData.Socials,
                [e.target.name]: e.target.value,
              },
            },
            PreviewMode: false,
          };
        });
  };

  const download = async () => {
    try {
      const codeFileElements = document.getElementsByClassName("codefile");

      // Check if the element exists
      if (codeFileElements.length > 0) {
        let output = he.decode(codeFileElements[0].innerHTML);

        const blob = new Blob([output]);
        const fileDownloadUrl2 = URL.createObjectURL(blob);

        setInitialState((prevState) => {
          return {
            ...prevState,
            fileDownloadUrl: fileDownloadUrl2,
          };
        });

        const resolveAfter3Sec = new Promise((resolve) =>
          setTimeout(resolve, 3000)
        );
        // Show a success toast and wait for it to close
        await toast.promise(resolveAfter3Sec, {
          pending: "Downloading...",
          success: "File downloaded successfully!",
          error: "An error occurred while downloading.",
          position: "top-right",
          autoClose: 3100, // Adjust the duration as needed
        });
      } else {
        throw new Error("Codefile element not found.");
      }
    } catch (error) {
      // Handle any errors that occur during the download process
      console.error("Download error:", error);
    }
  };

  const [isExperienceEnabled, setIsExperienceEnabled] = useState(true);
  const [isSkillEnabled, setIsSkillEnabled] = useState(true);
  const [isEducationEnabled, setIsEducationEnabled] = useState(true);
  const [isInterestEnabled, setisInterestEnabled] = useState(true);
  const [isAwardsEnabled, setisAwardsEnabled] = useState(true);
  const [isProjectEnabled, setisProjectEnabled] = useState(true);

  const toggleExperience = () => {
    setIsExperienceEnabled(!isExperienceEnabled);
  };

  const toggleEducation = () => {
    setIsEducationEnabled(!isEducationEnabled);
  };
  const toggleSkill = () => {
    setIsSkillEnabled(!isSkillEnabled);
  };
  const toggleInterest = () => {
    setisInterestEnabled(!isInterestEnabled);
  };
  const toggleAward = () => {
    setisAwardsEnabled(!isAwardsEnabled);
  };
  const toggleProject = () => {
    setisProjectEnabled(!isProjectEnabled);
  };

  const [navbarDesign, setNavbarDesign] = useState("NavbarDesign1");

  const handleDesignChange = (design) => {
    setNavbarDesign(design);
  };

  const [topPortion, setTopPortion] = useState("Option1");
  const handleTopPortionChange = (design) => {
    setTopPortion(design);
  };
  let selectedTopPortionDesign;

  switch (topPortion) {
    case "Option1":
      selectedTopPortionDesign = ReactDOMServer.renderToString(
        <TopPortion1 {...initialState.FormData} />
      );
      break;
    case "Option2":
      selectedTopPortionDesign = ReactDOMServer.renderToString(
        <TopPortion2 {...initialState.FormData} />
      );
      break;
    case "Option3":
      selectedTopPortionDesign = ReactDOMServer.renderToString(
        <TopPortion3 {...initialState.FormData} />
      );
      break;
    case "Option4":
      selectedTopPortionDesign = ReactDOMServer.renderToString(
        <TopPortion4 {...initialState.FormData} />
      );
      break;
  }

  const [experienceSection, setExperienceSection] = useState("Option1");

  const handleExperienceChange = (design) => setExperienceSection(design);

  let selectedExperienceDesign;

  switch (experienceSection) {
    case "Option1":
      selectedExperienceDesign = ReactDOMServer.renderToString(
        <Experience1
          experienceTitle={state.experienceTitle}
          experience={state.experiences}
        />
      );
      break;
    case "Option2":
      selectedExperienceDesign = ReactDOMServer.renderToString(
        <Experience2
          experienceTitle={state.experienceTitle}
          experience={state.experiences}
        />
      );
      break;
    case "Option3": 
      selectedExperienceDesign = ReactDOMServer.renderToString(
        <Experience3
          experienceTitle={state.experienceTitle}
          experience={state.experiences}
        />
      );
      break;
      case "Option4": 
      selectedExperienceDesign = ReactDOMServer.renderToString(
        <Experience4
          experienceTitle={state.experienceTitle}
          experience={state.experiences}
        />
      );
      break;
    default:
      selectedExperienceDesign = ReactDOMServer.renderToString(
        <Experience1
          experienceTitle={state.experienceTitle}
          experience={state.experiences}
        />
      );
      break;
  }

  const [educationSection, setEducationSection] = useState("Option1");
  const handleEducationChange = (design) => {
    setEducationSection(design);
  };

  let selectedEducationDesign;
  switch (educationSection) {
    case "Option1":
      selectedEducationDesign = ReactDOMServer.renderToString(
        <EducationDesign1
          educationTitle={state.educationTitle}
          education={state.educations}
        />
      );
      break;
    case "Option2":
      selectedEducationDesign = ReactDOMServer.renderToString(
        <EducationDesign2
          educationTitle={state.educationTitle}
          education={state.educations}
        />
      );
      break;
    case "Option3":
      selectedEducationDesign = ReactDOMServer.renderToString(
        <EducationDesign3
          educationTitle={state.educationTitle}
          education={state.educations}
        />
      );
      break;
    case "Option4":
      selectedEducationDesign = ReactDOMServer.renderToString(
        <EducationDesign4
          educationTitle={state.educationTitle}
          education={state.educations}
        />
      );
      break;
  }

  let selectedNavbarDesign;
  switch (navbarDesign) {
    case "NavbarDesign1":
      selectedNavbarDesign = ReactDOMServer.renderToString(
        <NavbarDesign1
          FullName={`${initialState.FormData.FirstName} ${initialState.FormData.LastName}`}
          isEducationEnabled={isEducationEnabled}
          isExperienceEnabled={isExperienceEnabled}
          isSkillEnabled={isSkillEnabled}
          isAwardsEnabled={isAwardsEnabled}
          isInterestEnabled={isInterestEnabled}
          isProjectEnabled={isProjectEnabled}
          experienceTitle={experienceTitle}
          educationTitle={educationTitle}
          skillsTitle={skillsTitle}
          interestsTitle={interestsTitle}
          awardsTitle={awardsTitle}
          projectsTitle={projectsTitle}
        />
      );
      break;
    case "NavbarDesign2":
      selectedNavbarDesign = ReactDOMServer.renderToString(
        <NavbarDesign2
          FullName={`${initialState.FormData.FirstName} ${initialState.FormData.LastName}`}
          isEducationEnabled={isEducationEnabled}
          isExperienceEnabled={isExperienceEnabled}
          isSkillEnabled={isSkillEnabled}
          isAwardsEnabled={isAwardsEnabled}
          isInterestEnabled={isInterestEnabled}
          isProjectEnabled={isProjectEnabled}
          experienceTitle={experienceTitle}
          educationTitle={educationTitle}
          skillsTitle={skillsTitle}
          interestsTitle={interestsTitle}
          awardsTitle={awardsTitle}
          projectsTitle={projectsTitle}
        />
      );
      break;
    case "NavbarDesign3":
      selectedNavbarDesign = ReactDOMServer.renderToString(
        <NavbarDesign3
          FullName={`${initialState.FormData.FirstName} ${initialState.FormData.LastName}`}
          isEducationEnabled={isEducationEnabled}
          isExperienceEnabled={isExperienceEnabled}
          isSkillEnabled={isSkillEnabled}
          isAwardsEnabled={isAwardsEnabled}
          isInterestEnabled={isInterestEnabled}
          isProjectEnabled={isProjectEnabled}
          experienceTitle={experienceTitle}
          educationTitle={educationTitle}
          skillsTitle={skillsTitle}
          interestsTitle={interestsTitle}
          awardsTitle={awardsTitle}
          projectsTitle={projectsTitle}
        />
      );
      break;
    case "NavbarDesign4":
      selectedNavbarDesign = ReactDOMServer.renderToString(
        <NavbarDesign4
          FullName={`${initialState.FormData.FirstName} ${initialState.FormData.LastName}`}
          isEducationEnabled={isEducationEnabled}
          isExperienceEnabled={isExperienceEnabled}
          isSkillEnabled={isSkillEnabled}
          isAwardsEnabled={isAwardsEnabled}
          isInterestEnabled={isInterestEnabled}
          isProjectEnabled={isProjectEnabled}
          experienceTitle={experienceTitle}
          educationTitle={educationTitle}
          skillsTitle={skillsTitle}
          interestsTitle={interestsTitle}
          awardsTitle={awardsTitle}
          projectsTitle={projectsTitle}
        />
      );
      break;
    default:
      selectedNavbarDesign = ReactDOMServer.renderToString(
        <NavbarDesign1
          FullName={`${initialState.FormData.FirstName} ${initialState.FormData.LastName}`}
          isEducationEnabled={isEducationEnabled}
          isExperienceEnabled={isExperienceEnabled}
          isSkillEnabled={isSkillEnabled}
          isAwardsEnabled={isAwardsEnabled}
          isInterestEnabled={isInterestEnabled}
          isProjectEnabled={isProjectEnabled}
          experienceTitle={experienceTitle}
          educationTitle={educationTitle}
          skillsTitle={skillsTitle}
          interestsTitle={interestsTitle}
          awardsTitle={awardsTitle}
        />
      );
      break;
  }

  let getInTouchDesign = ReactDOMServer.renderToString(
    <GetInTouch {...initialState.FormData} />
  );

  const [activeSection, setActiveSection] = useState('projects');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {state.title.experienceTitle}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {state.title.about}
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {state.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <i className={`fab fa-${link.platform.toLowerCase()} text-2xl`}></i>
              </a>
            ))}
          </motion.div>
        </header>

        <nav className="flex justify-center space-x-2 mb-16">
          {['projects', 'skills', 'experience', 'education'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeSection === section
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          {activeSection === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {project.image && (
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.skills.map((skillCategory) => (
                <motion.div
                  key={skillCategory.category}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    {skillCategory.category}
                  </h3>
                  <div className="space-y-4">
                    {skillCategory.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 font-medium">{skill.name}</span>
                          <span className="text-indigo-600 font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <motion.div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="space-y-8">
              {state.experience?.map((exp) => (
                <motion.div
                  key={exp._id}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-indigo-600 mb-2">{exp.company}</p>
                  <p className="text-gray-600 mb-4">{exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'education' && (
            <div className="space-y-8">
              {state.education?.map((edu) => (
                <motion.div
                  key={edu._id}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-indigo-600 mb-2">{edu.institution}</p>
                  <p className="text-gray-600 mb-4">{edu.duration}</p>
                  <p className="text-gray-700">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  experiences: state.experiences,
  educations: state.educations,
  awards: state.awards,
  interests: state.interests,
  skills: state.skills.selectedSkills,
  experienceTitle: state.title.experienceTitle,
  skillsTitle: state.title.skillsTitle,
  interestsTitle: state.title.interestsTitle,
  awardsTitle: state.title.awardsTitle,
  educationTitle: state.title.educationTitle,
  projectsTitle: state.title.projectsTitle,
  projects: state.projects.items,
  socialLinks: state.socialLinks,
  about: state.title.about,
});

export default connect(mapStateToProps)(PortfolioCard);
