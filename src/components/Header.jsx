import React,{useState,useContext,useEffect,useRef} from 'react';
import {NavLink,useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import HomeSidePanel from './HomeSidePanel';
import AnimatedTitle from './AnimatedTitle';
import {ThemeContext} from '../context/ThemeContext';
import axios from 'axios';
import {API_BASE_URL} from '../config/api';
import DefaultProfileImg from '/DefaultProfileImg.jpeg';

const NavItem=({to,children,onClick,theme})=>{
  const location=useLocation();
  const isOnLoginPage=location.pathname==='/login';
  const baseClasses=`relative group transition-colors duration-300 ${theme==='dark'?'text-white':'text-gray-900'}`;
  const activeClasses=theme==='dark'?'text-blue-400 font-semibold':'text-blue-600 font-semibold';
  const loginClasses=`border-2 ${theme==='dark'?'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900':'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} px-4 py-1 rounded-full transition-all duration-300`;
  const loginActiveClasses=`border-2 ${theme==='dark'?'border-blue-400 bg-blue-400 text-gray-900':'border-blue-600 bg-blue-600 text-white'} px-4 py-1 rounded-full transition-all duration-300`;
  const isLoginLink=to==='/login';

  return(
    <NavLink
      to={to}
      onClick={onClick}
      className={({isActive})=>{
        if(isLoginLink)return isOnLoginPage?loginActiveClasses:loginClasses;
        return `${baseClasses} ${isActive?activeClasses:theme==='dark'?'hover:text-blue-400':'hover:text-blue-600'} flex items-center h-full`;
      }}
    >
      {({isActive})=>(
        <>
          <span>{children}</span>
          {!isLoginLink&&(
            <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive?'w-full':'w-0 group-hover:w-full'}`}/>
          )}
        </>
      )}
    </NavLink>
  );
};

function Header(){
  const [isSidePanelOpen,setIsSidePanelOpen]=useState(false);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const [profile,setProfile]=useState({displayName:'',profilePicture:''});
  const headerRef=useRef(null);

  const {
    theme
  }=useContext(ThemeContext);

  const isLoggedIn=useSelector((state)=>state.auth?.isLoggedIn);
  const username=useSelector((state)=>state.auth?.username);
  const role=useSelector((state)=>state.auth?.role);

  const closeMenu=()=>{
    setIsSidePanelOpen(false);
  };

  useEffect(()=>{
    const handleResize=()=>{
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize',handleResize);

    return()=>{
      window.removeEventListener('resize',handleResize);
    };
  },[]);

  useEffect(()=>{
    if(!isLoggedIn||!username){
      setProfile({
        displayName:'',
        profilePicture:''
      });
      return;
    }

    const fetchProfile=async()=>{
      try{
        if(role==='admin'){
          const response=await axios.get(
            `${API_BASE_URL}/admin/profile/${encodeURIComponent(username)}`
          );

          if(response.data&&response.data.profile){
            setProfile({
              displayName:response.data.profile.displayName||username,
              profilePicture:response.data.profile.profilePicture||DefaultProfileImg
            });
          }
        }else{
          const token=localStorage.getItem('token');

          const response=await axios.get(
            `${API_BASE_URL}/user/profile`,
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );

          setProfile({
            displayName:response.data.user.displayName||username,
            profilePicture:response.data.user.profilePicture||DefaultProfileImg
          });
        }
      }catch(error){
        console.error(
          'Failed to fetch profile for header:',
          error
        );

        setProfile({
          displayName:username,
          profilePicture:DefaultProfileImg
        });
      }
    };

    fetchProfile();
  },[isLoggedIn,username,role]);

  return(
    <header
      ref={headerRef}
      className="fixed top-4 z-50 w-full left-0 right-0"
    >
      <div className="w-[95%] md:max-w-[90%] mx-auto relative">
        <div
          className={`transition-all duration-500 overflow-hidden shadow-lg backdrop-blur-md border rounded-full ${
            theme==='dark'
              ? 'bg-slate-900/70 border-white/10 text-white'
              : 'bg-blue-50/70 border-blue-200/50 text-gray-900'
          }`}
        >
          <div className="flex justify-between items-center py-2 pl-3 pr-1 sm:pl-4 relative">
            {/* LOGO */}
            <div className="flex-shrink-0 z-10">
              <NavLink
                to="/"
                onClick={closeMenu}
              >
                <AnimatedTitle
                  isDark={theme==='dark'}
                />
              </NavLink>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav
              className={`hidden md:flex items-center ${
                windowWidth<=1200
                  ? 'ml-auto mr-4 space-x-6'
                  : 'absolute left-1/2 -translate-x-1/2 space-x-10'
              }`}
            >
              <NavItem
                to="/"
                theme={theme}
              >
                Home
              </NavItem>

              <NavItem
                to="/categories"
                theme={theme}
              >
                Categories
              </NavItem>

              {windowWidth>1200&&(
                <NavItem
                  to="/contact"
                  theme={theme}
                >
                  Contact
                </NavItem>
              )}
            </nav>

            {/* DESKTOP / TABLET ACTIONS */}
            <div className="hidden md:flex items-center space-x-4 z-10">
              <div className="flex items-center space-x-3">
                {/* PROFILE / LOGIN */}
                {isLoggedIn?(
                  <NavLink
                    to={
                      role==='admin'
                        ? '/admin-dashboard'
                        : '/user-profile'
                    }
                    onClick={closeMenu}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={
                        profile.profilePicture||
                        DefaultProfileImg
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                    />

                    <span
                      className={`${
                        theme==='dark'
                          ? 'text-white'
                          : 'text-gray-900'
                      } font-semibold`}
                    >
                      {profile.displayName||
                        username||
                        'Profile'}
                    </span>
                  </NavLink>
                ):(
                  <NavItem
                    to="/login"
                    theme={theme}
                  >
                    Login
                  </NavItem>
                )}

                {/* DESKTOP SUBSCRIBE */}
                {windowWidth>1200&&(
                  <NavLink
                    to="/subscribe"
                    className={({isActive})=>{
                      const baseClasses=
                        'px-4 py-1 rounded-full border-2 transition-all duration-300 font-medium whitespace-nowrap';

                      const filledClasses=
                        theme==='dark'
                          ? 'bg-blue-400 border-blue-400 text-gray-900 hover:bg-transparent hover:text-blue-400'
                          : 'bg-blue-600 border-blue-600 text-white hover:bg-transparent hover:text-blue-600';

                      const activeShadow=
                        isActive
                          ? theme==='dark'
                            ? 'shadow-lg shadow-blue-400/20'
                            : 'shadow-lg shadow-blue-600/20'
                          : '';

                      return `${baseClasses} ${filledClasses} ${activeShadow}`;
                    }}
                    onClick={closeMenu}
                  >
                    Subscribe
                  </NavLink>
                )}

                {/* DESKTOP / TABLET HAMBURGER */}
                <button
                  type="button"
                  onClick={()=>setIsSidePanelOpen(true)}
                  aria-label="Open side panel"
                  aria-expanded={isSidePanelOpen}
                  aria-controls="home-account-panel"
                  title="Open side panel"
                  className={`w-10 h-10 flex items-center justify-center rounded-full mr-2 transition-all duration-300 ${
                    theme==='dark'
                      ? 'text-white hover:bg-white/10 hover:text-blue-400'
                      : 'text-gray-900 hover:bg-black/5 hover:text-blue-600'
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16"/>
                    <path d="M4 12h16"/>
                    <path d="M4 18h16"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* MOBILE HAMBURGER */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={()=>setIsSidePanelOpen(true)}
                aria-label="Open navigation"
                aria-expanded={isSidePanelOpen}
                aria-controls="home-account-panel"
                title="Open navigation"
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  theme==='dark'
                    ? 'text-white hover:bg-white/10 hover:text-blue-400'
                    : 'text-gray-900 hover:bg-black/5 hover:text-blue-600'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16"/>
                  <path d="M4 12h16"/>
                  <path d="M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SINGLE NAVIGATION / ACCOUNT PANEL */}
      <HomeSidePanel
        isOpen={isSidePanelOpen}
        setIsOpen={setIsSidePanelOpen}
        showCompactOptions={windowWidth<=1200}
      />
    </header>
  );
}

export default Header;