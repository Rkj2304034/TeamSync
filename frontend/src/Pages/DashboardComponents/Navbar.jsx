import { useState, useContext, useEffect } from 'react';
import { authContext } from '../../Context/AuthContextProvider.jsx';
import api from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onProjectAccept }) => {

  const navigate = useNavigate();
  const [invites, setInvites] = useState([]);
  const [showInvite, setShowInvites] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useContext(authContext);
  console.log(user);


  const handleLogout = async () => {
    try {

      const res = await api.post("/api/auth/logout");

      if (res.data.success) {
        navigate("/")
      }

    }
    catch (error) {
      console.log(error)
    }
  }


  const getInvites = async () => {

    try {

      const res = await api.get("/api/invitation");
      if (res.data.success) {
        setInvites(res.data.invitations)
        console.log(invites)
      }

    }
    catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    getInvites();
  }, [])

  const handleInvitation = async (value, invitationId) => {

    try {

      const res = await api.post(`/api/invitation/${invitationId}/update`, { status: value })

      console.log(res)

      if (res.data.success) {
        setInvites(prev =>
          prev.filter(invite => invite._id !== invitationId)
        );}


      if(value === "Accepted"){
        onProjectAccept(res.data.project)
      }

      console.log(invites)

    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">


        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center shadow-inner">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">TeamSync</span>
        </div>



        <div className="flex items-center gap-8 relative">

          <button onClick={() => setShowInvites(!showInvite)} className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-all rounded-full focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <div className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {invites?.length}
            </div>
          </button>


          {
            showInvite && (
              <div className="absolute top-12 right-0 w-96 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50">

                {/* Header */}
                <div className=" px-5 py-4 border-b bg-slate-50">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Project Invitations
                  </h3>


                </div>

                {/* Invitation List */}
                <div className="max-h-96 overflow-y-auto">

                  {invites.length > 0 ? (

                    invites.map((invite) => (

                      <div
                        key={invite._id}
                        className="px-5 py-4 border-b last:border-b-0 hover:bg-slate-50 transition-colors"
                      >

                        {/* Project */}
                        <h4 className="text-base font-semibold text-slate-800">
                          {invite.project.title}
                        </h4>

                        {/* Sender */}
                        <p className="text-sm text-slate-500 mt-1">
                          Invited by{" "}
                          <span className="font-medium text-slate-700">
                            {invite.sender.name}
                          </span>
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-4">

                          <button
                            onClick={() => handleInvitation("Accepted", invite._id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => handleInvitation("Rejected", invite._id)}
                            className="flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-medium transition"
                          >
                            Decline
                          </button>

                        </div>

                      </div>

                    ))

                  ) : (

                    <div className="flex flex-col items-center justify-center py-10">

                      <svg
                        className="w-10 h-10 text-slate-300 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                        />
                      </svg>

                      <p className="text-slate-500 text-sm">
                        No pending invitations
                      </p>

                    </div>

                  )}

                </div>

              </div>
            )
          }



          <button onClick={handleLogout} className=' px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors' >Logout</button>


        </div>
      </div>
    </header>
  );
};

export default Navbar;