import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { ThemeContext } from '../context/ThemeContext';
import { Switch } from '@heroui/react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import DefaultProfileImg from '/DefaultProfileImg.jpeg';

const iconPaths = {
  user: ['M20 21a8 8 0 0 0-16 0', 'M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8'],
  login: ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'M10 17l5-5-5-5', 'M15 12H3'],
  terms: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h8'],
  privacy: ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z', 'm9 12 2 2 4-4'],
  report: ['M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z'],
  dark: ['M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13z'],
  blur: ['M12 3s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12z', 'M9 16a3 3 0 0 0 3 2'],
  motion: ['M2 12h4l3-9 6 18 3-9h4'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  close: ['m18 6-12 12', 'm6 6 12 12'],
};

function PanelIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name].map((path) => <path key={path} d={path} />)}
    </svg>
  );
}

function HomeSidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({ displayName: '', profilePicture: DefaultProfileImg });
  const { theme, setTheme, reduceBlur, setReduceBlur, reduceAnimations, setReduceAnimations, headerLayout, setHeaderLayout } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const username = useSelector((state) => state.auth?.username);
  const role = useSelector((state) => state.auth?.role);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isLoggedIn || !username) {
      setProfile({ displayName: '', profilePicture: DefaultProfileImg });
      return undefined;
    }

    let isCurrent = true;
    const fetchProfile = async () => {
      try {
        let userProfile;
        if (role === 'admin') {
          const response = await axios.get(`${API_BASE_URL}/admin/profile/${encodeURIComponent(username)}`);
          userProfile = response.data.profile;
        } else {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          userProfile = response.data.user;
        }

        if (isCurrent) {
          setProfile({
            displayName: userProfile.displayName || (role === 'admin' ? 'Admin' : userProfile.username || username),
            profilePicture: userProfile.profilePicture || DefaultProfileImg,
          });
        }
      } catch {
        if (isCurrent) {
          setProfile({
            displayName: role === 'admin' ? 'Admin' : username,
            profilePicture: DefaultProfileImg,
          });
        }
      }
    };

    fetchProfile();
    return () => {
      isCurrent = false;
    };
  }, [isLoggedIn, role, username]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closePanel = () => setIsOpen(false);
  const shellClasses = isDark
    ? 'border-white/10 bg-slate-900/95 text-white'
    : 'border-blue-200 bg-white/95 text-slate-900';
  const linkClasses = `flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
    isDark
      ? 'hover:bg-blue-500/20 active:bg-blue-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400'
      : 'text-blue-950 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
  }`;

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? 'Close account panel' : 'Open account panel'}
        aria-expanded={isOpen}
        aria-controls="home-account-panel"
        onClick={() => setIsOpen((open) => !open)}
        title={isOpen ? 'Close side panel' : 'Open side panel'}
        className={`fixed right-[2.5%] top-[5.25rem] z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-colors md:right-[5%] ${shellClasses} ${isDark ? 'text-blue-300 hover:bg-blue-500/20 active:bg-blue-500/35' : 'text-blue-700 hover:bg-blue-100 active:bg-blue-200'}`}
      >
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Close account panel"
          onClick={closePanel}
          className="absolute inset-0 h-full w-full cursor-default bg-black/35"
        />
        <aside
          id="home-account-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Account and site links"
          className={`absolute top-1 left-2 right-2 flex h-[calc(100dvh-0.5rem)] max-h-[calc(100dvh-0.5rem)] w-auto flex-col overflow-y-auto rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:max-h-none lg:w-[24vw] lg:min-w-[18rem] lg:rounded-l-3xl lg:rounded-r-none ${shellClasses} ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-current/10 pb-5">
            <div>
              {isLoggedIn ? (
                <div className="flex flex-col items-center gap-2 text-center md:flex-row md:text-left">
                  <img
                    src={profile.profilePicture}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-blue-400 object-cover"
                  />
                  <p className="max-w-[70vw] truncate text-lg font-bold" title={profile.displayName}>
                    {profile.displayName || (role === 'admin' ? 'Admin' : username)}
                  </p>
                </div>
              ) : (
                <Link to="/login" onClick={closePanel} className="inline-flex items-center gap-2 text-lg font-bold text-[oklch(0.546_0.245_262.881)] hover:underline">
                  <PanelIcon name="login" className="h-5 w-5" />
                  <span>Sign in / Log in</span>
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close account panel"
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-current/15 text-2xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark ? 'hover:bg-blue-500/20 active:bg-blue-500/35' : 'hover:bg-blue-100 active:bg-blue-200'}`}
            >
              <PanelIcon name="close" className="h-5 w-5" />
            </button>
          </div>

          {isLoggedIn && (
            <Link
              to={role === 'admin' ? '/admin-dashboard' : '/user-profile'}
              onClick={closePanel}
              className={`${linkClasses} mt-4 gap-3 border border-blue-200/70 bg-blue-50/70 ${isDark ? 'border-white/10 bg-white/5' : ''}`}
            >
              <PanelIcon name="user" />
              <span>{role === 'admin' ? 'Admin Dashboard' : 'User Profile'}</span>
            </Link>
          )}

          <nav aria-label="Policies and support" className="mt-5 space-y-1 lg:grid lg:grid-cols-3 lg:gap-1 lg:space-y-0">
            <Link to="/terms" onClick={closePanel} title="Terms of Use" className={`${linkClasses} gap-2 lg:min-h-20 lg:flex-col lg:justify-center lg:px-2 lg:py-3 lg:text-center lg:text-xs lg:leading-tight`}><PanelIcon name="terms" /><span>Terms of Use</span></Link>
            <Link to="/privacy" onClick={closePanel} title="Privacy Policy" className={`${linkClasses} gap-2 lg:min-h-20 lg:flex-col lg:justify-center lg:px-2 lg:py-3 lg:text-center lg:text-xs lg:leading-tight`}><PanelIcon name="privacy" /><span>Privacy Policy</span></Link>
            <Link to="/contact" onClick={closePanel} title="Report a Problem" className={`${linkClasses} gap-2 lg:min-h-20 lg:flex-col lg:justify-center lg:px-2 lg:py-3 lg:text-center lg:text-xs lg:leading-tight`}><PanelIcon name="report" /><span>Report a Problem</span></Link>
          </nav>

          <section aria-label="Settings" className="mt-6 border-t border-current/10 pt-5">
            <h2 className="mb-4 flex items-center gap-2 px-1 text-lg font-bold text-[oklch(0.546_0.245_262.881)]">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </h2>
            <div className="space-y-4">
              {/* Header Style Segmented Control */}
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-blue-500/10 border-white/10' : 'bg-blue-50/50 border-blue-200/50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium opacity-80 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Header Layout
                  </span>
                </div>
                <div className={`grid grid-cols-2 p-1 rounded-lg border ${isDark ? 'bg-slate-800/80 border-white/10' : 'bg-white border-blue-200'}`}>
                  <button
                    type="button"
                    onClick={() => setHeaderLayout('single')}
                    className={`py-1.5 px-3 text-xs font-bold rounded-md transition-all ${
                      headerLayout === 'single'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-900')
                    }`}
                  >
                    Single
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeaderLayout('detached')}
                    className={`py-1.5 px-3 text-xs font-bold rounded-md transition-all ${
                      headerLayout === 'detached'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-900')
                    }`}
                  >
                    Detached
                  </button>
                </div>
              </div>

              <Switch
                isSelected={theme === 'dark'}
                onChange={(isSelected) => setTheme(isSelected ? 'dark' : 'light')}
                className="w-full"
              >
                <Switch.Content className={`flex w-full min-w-[240px] cursor-pointer items-center justify-between rounded-xl px-3 py-3 outline-none transition-colors focus-within:ring-2 focus-within:ring-blue-500 ${isDark ? 'bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/35' : 'hover:bg-blue-50 active:bg-blue-100'}`}>
                  <span className="flex items-center gap-2 text-sm font-medium opacity-80"><PanelIcon name="dark" />Dark Mode</span>
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Content>
              </Switch>
              <Switch isSelected={reduceBlur} onChange={setReduceBlur} className="w-full">
                <Switch.Content className={`flex w-full min-w-[240px] cursor-pointer items-center justify-between rounded-xl px-3 py-3 outline-none transition-colors focus-within:ring-2 focus-within:ring-blue-500 ${isDark ? 'hover:bg-blue-500/20 active:bg-blue-500/35' : 'hover:bg-blue-50 active:bg-blue-100'}`}>
                  <span className="flex items-center gap-2 text-sm font-medium opacity-80"><PanelIcon name="blur" />Reduce Blur</span>
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Content>
              </Switch>
              <Switch isSelected={reduceAnimations} onChange={setReduceAnimations} className="w-full">
                <Switch.Content className={`flex w-full min-w-[240px] cursor-pointer items-center justify-between rounded-xl px-3 py-3 outline-none transition-colors focus-within:ring-2 focus-within:ring-blue-500 ${isDark ? 'hover:bg-blue-500/20 active:bg-blue-500/35' : 'hover:bg-blue-50 active:bg-blue-100'}`}>
                  <span className="flex items-center gap-2 text-sm font-medium opacity-80"><PanelIcon name="motion" />Reduce Animations</span>
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
          </section>

          {isLoggedIn && (
            <div className="mt-auto flex justify-end pt-6">
              <button
                type="button"
                onClick={() => {
                  dispatch(logout());
                  closePanel();
                }}
                className={`inline-flex items-center gap-2 rounded-full border border-current/20 px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark ? 'hover:bg-blue-500/20 active:bg-blue-500/35' : 'hover:bg-blue-100 active:bg-blue-200'}`}
              >
                <PanelIcon name="logout" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export default HomeSidePanel;
