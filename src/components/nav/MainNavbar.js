import React from 'react'
import { Avatar, Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Slide, Tooltip, Typography, useScrollTrigger } from '@mui/material'
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarViewMonthTwoTone, CameraAltTwoTone, ChecklistTwoTone, CheckroomTwoTone, CurtainsClosedTwoTone, Dashboard, Feedback, Home, Logout, Notes } from '@mui/icons-material';
//import { Logo, Logomark } from '../../assets/logos';
import { useEffect } from 'react';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const MainNavbar = (props) => {
  const { hide } = props;
  const [selected, setSelected] = useState('')

  const currentEnv = process.env.REACT_APP_CURRENT_ENV

  const authContext = useAuth();
  const navigate = useNavigate();

  // START LOGOUT FUNCTION
  const logoutUser = async () => {
    try {
      authContext.logoutUser();
      authContext.getAccount();
      navigate('/');

    } catch (error) {
      console.log('Error logging user out', error);
    }
  }

  const location = window.location.pathname;

  useEffect(() => {
    setSelected(location.split('/', 2)[1])
  }, [])


  return (
    <HideOnScroll {...props}>
      <div id="hide-on-scroll">

        {authContext.account
          ?
          <>
            <Grid
              container
              sx={{
                position:'fixed',
                justifyContent:'flex-end',
                alignItems:'center',
                background:'#000',
                px:1,
                height:40,
                zIndex:300,
              }}
            >
              <NavButton
                onClick={() => navigate('/')}
                title="Dashboard"
                selected={selected}
                id=""
              >
                <Dashboard
                  sx={{
                  }}
                />
              </NavButton>
              <NavButton
                onClick={() => navigate('/categories')}
                title="Categories"
                selected={selected}
                id="categories"
              >
                <ChecklistTwoTone
                  sx={{
                  }}
                />
              </NavButton>
              <NavButton
                onClick={() => navigate('/closets')}
                title="Closets"
                selected={selected}
                id="closets"
              >
                <CurtainsClosedTwoTone
                  sx={{
                  }}
                />
              </NavButton>
              <NavButton
                onClick={() => navigate('/articles')}
                title="Articles"
                selected={selected}
                id="articles"
              >
                <CheckroomTwoTone 
                  sx={{
                  }}
                />
              </NavButton>
              <NavButton
                onClick={() => navigate('/calendar')}
                title="Calendar"
                selected={selected}
                id="calendar"
              >
                <CalendarViewMonthTwoTone
                  sx={{
                  }}
                />
              </NavButton>
              <NavButton
                onClick={() => navigate('/camera')}
                title="Camera"
                selected={selected}
                id="camera"
              >
                <CameraAltTwoTone
                  sx={{
                  }}
                />
              </NavButton>
              
              <ProfileMenu>
                <MenuItemTemplate
                  key="dashboard"
                  id="dashboard"
                  icon={<Dashboard />}
                  label="Dashboard"
                  onClick={() => navigate('/')}
                />
                <MenuItemTemplate
                  key="categories"
                  id="categories"
                  icon={<ChecklistTwoTone />}
                  label="Categories"
                  onClick={() => navigate('/categories')}
                />
                <MenuItemTemplate
                  key="closets"
                  id="closets"
                  icon={<CurtainsClosedTwoTone />}
                  label="Closets"
                  onClick={() => navigate('/closets')}
                />
                <MenuItemTemplate
                  key="articles"
                  id="articles"
                  icon={<CheckroomTwoTone />}
                  label="Articles"
                  onClick={() => navigate('/articles')}
                />
                <MenuItemTemplate
                  key="calendar"
                  id="calendar"
                  icon={<CalendarViewMonthTwoTone />}
                  label="Calendar"
                  onClick={() => navigate('/calendar')}
                />
                <MenuItemTemplate
                  key="camera"
                  id="camera"
                  icon={<CameraAltTwoTone />}
                  label="Camera"
                  onClick={() => navigate('/camera')}
                />
                <Divider key="divider-1" id="divider-1" sx={{width:'100%'}} />
                <MenuItemTemplate
                  key="feedback"
                  id="feedback"
                  icon={<Feedback />}
                  label="Feedback"
                  onClick={() => navigate('/feedback')}
                />
                <MenuItemTemplate
                  key="notes"
                  id="notes"
                  icon={<Notes />}
                  label="Notes"
                  onClick={() => navigate('/notes')}
                />

                <Divider key="divider-2" id="divider-2" sx={{width:'100%'}} />
                <MenuItemTemplate
                  key="logout"
                  id="logout"
                  icon={<Logout />}
                  label="Logout"
                  onClick={logoutUser}
                />
              </ProfileMenu>
            </Grid>
            </>
          :
            hide
              ?
                    <Link
                      to="/"
                      style={{
                        position:'fixed',
                        top:10,
                        right:10,
                        height:40,
                      }}
                    >
                      <Logomark width={30} />
                    </Link>
              :
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    position:'fixed',
                    justifyContent:'space-between',
                    alignItems:'center',
                    background:'#000',
                    py:.5,
                    px:1,
                    height:40,
                    zIndex:300
                  }}
                >
                  <Link
                    to="/"
                  >
                    <Logomark width={30} />
                  </Link>


                  <Box>
                    <Button
                      href="/register"
                      sx={{
                        color:'brandPastel.eight'
                      }}
                    >
                      Register
                    </Button>
                    
                    {
                      currentEnv === "STAGING"
                        ?
                          <Button
                            href="/login"
                            sx={{
                              color:'brandPastel.nine'
                            }}
                          >
                            Login
                          </Button>
                        :
                          null
                    }
                  </Box>
                </Grid>
        }
      </div>
    </HideOnScroll>
  )
}

export default MainNavbar;

const ProfileMenu = (props) => {
  const { children } = props;
  // ========================================================
  // MENU
  // ========================================================
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Avatar
        onClick={handleClick}
        sx={{
          cursor:'pointer',
          width:30,
          height:30,
          ml:2
        }}
      />
      <Menu
        id="item-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          zIndex:6000
        }}
      >
        {
          children.map((child) => (
            <MenuItem
              key={child.key}
            >
              {child}
            </MenuItem>
          ))
        }
      </Menu>
    </>

  )
}

const MenuItemTemplate = (props) => {
  const { id, onClick, icon, label } = props;

  return (
    <Box
      id={id}
      key={id}
      onClick={onClick}
      sx={{
        display:'flex',
        alignItems:'center'
      }}
    >
      <Box
        sx={{
          display:'flex',
          justifyContent:'flex-start',
          alignItems:'center',
          width:40
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Typography>{label}</Typography>
      </Box>
    </Box>

  )
}

const NavButton = (props) => {
  const { title, onClick, children, selected, id } = props;

  return (
    <Tooltip
      title={title}
      placement="bottom"
      PopperProps={{
        modifiers: [
          {
              name: "offset",
              options: {
                  offset: [, -12],
              },
          },
        ],
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor: 'brand.eight',
            fontSize:18,
            px:3,
          },
          "& .MuiTooltip-arrow": {
            color: 'primary.main',
          }
        }
      }}
    >
      <IconButton
        color={ selected === id ? "light" : "eight" }
        onClick={onClick}
      >
        {children}
      </IconButton>
    </Tooltip>

  )
}