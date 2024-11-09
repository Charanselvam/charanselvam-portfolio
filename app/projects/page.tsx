import React from 'react'

const projects = [
  {
    title: "Dynamic Web Page Rendering",
    description: "I secured my job by solving a complex problem statement that involved creating a functional component to dynamically render a webpage using JSON or API data. By building a flexible solution that could adapt to changing data in real-time, I showcased my ability to handle dynamic content efficiently, delivering a scalable, user-friendly interface. This project demonstrated my technical skills and problem-solving abilities, leading to my successful hiring.",
    technologies: ["React.js", "JavaScript", "+2 skills"],
    thumbnail: "https://via.placeholder.com/250", // Replace with actual thumbnail URL
    dateRange: "Jun 2021 - Jul 2021"
  },
  {
    title: "ICA5NT 2020",
    description: "Developed a responsive website for my college’s international conference during my 3rd year using Bootstrap, HTML, and CSS. The site included event details, schedules, speakers, and registration forms. Leveraging Bootstrap's grid system ensured a mobile-friendly, user-centric design. This project demonstrated my ability to deliver a professional web solution and enhance the visibility of the event.",
    technologies: ["HTML 5", "BootStrap"],
    thumbnail: "https://charanselvam.github.io/ica5nt/index.html", // Replace with actual thumbnail URL
    dateRange: "2020"
  },
  // Add more projects as needed
];

const ProjectsPage = () => {
  return (
    <div className='container mx-auto mt-20 px-4'>
      <section className='text-justify'>
        <h2 className='text-3xl font-bold mb-10'>Projects</h2>
        <div className='flex flex-col space-y-8'>
          {projects.map((project, index) => (
            <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-row items-center'>
              <div className='w-24 h-24 mr-6'>
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{project.dateRange}</p>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>{project.description}</p>
                <ul className='list-disc pl-5 space-y-1'>
                  {project.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className='text-sm text-gray-700 dark:text-gray-300'>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
