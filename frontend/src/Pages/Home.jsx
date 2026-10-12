import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      
      <header className="px-6 py-4 border-b bg-white flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">TeamSync</span>
        </div>



        <nav className="flex gap-4">
          <Link 
            to="/login" 
            className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Log in
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>



      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6">
          Project collaboration, <span className="text-blue-600">secure by design.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10">
          TeamSync helps teams organize tasks, assign roles, and track progress with enterprise-grade security and isolated project environments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/register" 
            className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors "
          >
            Start your first project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <a 
            href="#features" 
            className="flex items-center justify-center px-6 py-3 text-base font-medium bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
          >
            Explore Features
          </a>
        </div>
      </main>


      <section id="features" className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Built for Serious Teams</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage projects efficiently, built on a robust architecture that prioritizes your data's security.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-8">

            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 border border-slate-100 transition hover:shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Project-Scoped Roles</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Roles are strictly tied to projects. Be a Lead in one project and a Member in another, ensuring precise access control across your workspace.
              </p>
            </div>


            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 border border-slate-100 transition hover:shadow-md">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Fortress-Level Security</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Say goodbye to vulnerable local storage. We use strictly HTTP-only cookies and JWT authentication to keep your sessions safe from XSS attacks.
              </p>
            </div>


            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 border border-slate-100 transition hover:shadow-md">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Granular Task Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Create tasks, assign them to team members, and track priorities. Strict authorization ensures only Leads and Assignees can update statuses.
              </p>
            </div>

          </div>

        </div>
      </section>


      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
        <p className="text-sm">© {new Date().getFullYear()} TeamSync. Built for a better workflow.</p>
      </footer>

    </div>
  );
};

export default Home;