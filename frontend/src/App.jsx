import React, { useState, useEffect } from 'react';

//.Backend -- here the backend is deployed via render
const API_URL = import.meta.env.VITE_API_URL;


const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const LinkIcon = () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);


const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 border border-red-500 text-red-200 px-6 py-4 rounded-lg shadow-lg max-w-md text-center" role="alert">
            <strong className="font-bold block text-lg mb-2">An Error Occurred</strong>
            <span className="block">{message}</span>
        </div>
    </div>
);



const ProfileHeader = ({ profile }) => {
    if (!profile) return null;
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{profile.name}</h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl mx-auto">{profile.bio || `Education: ${profile.education}`}</p>
            <div className="flex justify-center space-x-4">
                
                {profile.links?.github && (
                    <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <GithubIcon />
                    </a>
                )}
                {profile.links?.linkedin && (
                    <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <LinkedinIcon />
                    </a>
                )}
            </div>
        </div>
    );
};


const Skills = ({ skills }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredSkills = skills.filter(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Skills</h2>
            <div className="max-w-md mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search for a skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {filteredSkills.map((skill, index) => (
                    <span key={index} className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full shadow-md">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};


const Projects = ({ projects }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <a 
                            href={project.links?.live || project.links?.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300"
                        >
                            View Project <LinkIcon />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default function App() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
      
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
                const data = await response.json();
                

                if (Array.isArray(data) && data.length > 0) {

                    setProfile(data[0]);
                } else if (data && typeof data === 'object' && !Array.isArray(data)) {
                 
                    setProfile(data);
                } else {
   
                    setError("No profile data was found in the database. Please add a profile via the API to see content here.");
                }
            } catch (err) {
                setError("Failed to fetch profile data. The server may be offline or an error occurred. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []); 


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} />;
    }

    if (!profile) {
        return <ErrorDisplay message="An unexpected error occurred and no profile could be displayed." />;
    }

    return (
        <div className="bg-gray-900 min-h-screen font-sans">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <ProfileHeader profile={profile} />
                <Skills skills={profile.skills || []} />
                <hr className="border-gray-700 my-12" />
                <Projects projects={profile.projects || []} />
            </main>
        </div>
    );
}

