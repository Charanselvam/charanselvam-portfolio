import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const page = () => {
  return (
    <div className='container mt-20'>
      <section className='mt-20 text-justify'>
      <h1 className="mt-10 mb-8 text-3xl font-bold text-dark-600 tracking-tight">Professional Experience</h1>
        <Accordion collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Associate Tech Lead</span>
                <span>May 2024 to Present</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              As an Associate Tech Lead, I drive the technical direction of projects while collaborating closely with cross-functional teams to deliver high-quality, scalable solutions. With a strong background in both frontend and backend development, I bridge the gap between innovative ideas and practical implementation, ensuring code quality, system architecture, and agile practices align with business goals. My expertise includes mentoring junior developers, conducting code reviews, and overseeing the successful execution of full-stack development projects. Passionate about continuous learning and emerging technologies, I aim to deliver impactful, sustainable tech solutions.
            </AccordionContent>
            <AccordionContent>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md' style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                <strong>Skills:</strong> 
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>Cross-functional Team Leadership</li>
                  <li>Agile Methodologies</li>
                  <li>Time Management</li>
                  <li>Easily Adaptable</li>
                  <li>Critical Thinking</li>
                  <li>Project Management</li>
                  <li>Communication</li>
                  <li>Front-End Development</li>
                  <li>Back-End Web Development</li>
                  <li>API Development</li>
                  <li>Microservices</li>
                  <li>Drools</li>
                  <li>BPMN</li>
                  <li>JavaServer Faces (JSF)</li>
                  <li>React JS</li>
                  <li>Next.js</li>
                  <li>MySQL</li>
                  <li>JavaScript</li>
                  <li>NoSQL</li>
                  <li>Data Structures</li>
                  <li>Database Management System (DBMS)</li>
                  <li>Continuous Integration and Continuous Delivery (CI/CD)</li>
                  <li>Gitlab</li>
                  <li>Jira</li>
                  <li>Bugzilla</li>
                  <li>Confluence</li>
                  <li>Figma (Software)</li>
                  <li>REST APIs</li>
                  <li>Software Documentation</li>
                  <li>Unit Testing</li>
                  <li>XML</li>
                  <li>JSON</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Software Engineer</span>
                <span>Aug 2022 - Apr 2024</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              As a Software Engineer, I contributed to the development and maintenance of web applications, working with both frontend and backend technologies. My role involved designing user-friendly interfaces, developing and testing APIs, and ensuring seamless integration with databases. I collaborated with cross-functional teams to troubleshoot issues, implement new features, and optimize performance. I took ownership of projects, from planning through to deployment, adhering to best practices and coding standards to deliver high-quality software solutions.
            </AccordionContent>            
            <AccordionContent>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md' style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                <strong>Skills:</strong> 
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>Web Design</li>
                  <li>Process Automation</li>
                  <li>Automated Reminders</li>
                  <li>Bugzilla</li>
                  <li>XSL-FO</li>
                  <li>MySQL</li>
                  <li>Unit Testing</li>
                  <li>XML</li>
                  <li>Application Programming Interfaces (API)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Associate Software Engineer</span>
                <span>Jul 2021 - Jul 2022</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              In this role, I focused on developing and maintaining software applications, getting code reviews, and debugging issues to ensure optimal performance. I worked closely with senior developers to learn and implement best practices in software development, gaining hands-on experience in various aspects of the software development lifecycle. My responsibilities included writing clean, efficient code, collaborating on project requirements, and providing technical support to ensure project success.
            </AccordionContent>           
            <AccordionContent>
              <div  className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md' style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                <strong>Skills:</strong> 
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>Web Design</li>
                  <li>Process Automation</li>
                  <li>Automated Reminders</li>
                  <li>Bugzilla</li>
                  <li>XSL-FO</li>
                  <li>MySQL</li>
                  <li>Unit Testing</li>
                  <li>XML</li>
                  <li>Application Programming Interfaces (API)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}

export default page
