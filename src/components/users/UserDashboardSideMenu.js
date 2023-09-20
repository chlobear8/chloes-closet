import { AccessTime, BarChartTwoTone, CalendarViewMonthTwoTone, CameraAltTwoTone, ChecklistTwoTone, CheckroomTwoTone, CurtainsClosedTwoTone, Close, Description, Edit, GraphicEq, Insights, LocalActivity, OpenInNew, ViewList, ViewModule } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Slider, Tooltip, Typography } from '@mui/material';
import { borders, Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import MainWrapperSideMenu from '../templates/MainWrapperSideMenu'
import Loading from '../ui/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
//import { NeuActiveQuizItemTemplate, NeuActivePollItemTemplate, NeuClassItemTemplate, NeuQuizItemTemplate, NeuPollItemTemplate, NeuReusableList, NeuStudySetItemTemplate, NeuSectionItemTemplate } from '../ui/NeuReusableItems';
import SectionSlots from '../sections/SectionSlots';
import { purple } from '@mui/material/colors';
import { useTheme } from '@emotion/react';
import LottiePlayer from '../ui/LottiePlayer';
//import CategoryCreate from '../categories/CategoryCreate';
import { Timestamp } from '@firebase/firestore';
import { timeDifference, timeDifferenceDays, timeDifferenceObj } from '../../lib/Functions';
import { NeuBox } from '../ui/NeuElements';

const SideMenuButton = (props) => {
  const { icon, value, title, display, setDisplay, lastButton, setCurrent, onClick } = props;
  const theme = useTheme();


  return (
    <Tooltip
      title={
        display[value]
          ?
          <Close
            onClick={() => setDisplay({ ...display, [value]: false })}
            sx={{
              fontSize: 16
            }}
          />
          :
          null
      }
      placement="right"
      sx={{
        cursor: 'pointer'
      }}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [, -16],
            },
          },
        ],
        sx: {
          "& .MuiTooltip-tooltip": {
            background: display[value] === true
              ? `linear-gradient(90deg, ${theme.palette.brandDark.nine}, ${theme.palette.brand.nine}bb)`
              : `linear-gradient(90deg, ${theme.palette.brandLight.nine}bb, ${theme.palette.brand.nine}bb)`,
            fontSize: 12,
            p: .5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 32px 32px 0',
            backdropFilter: 'blur(3px)'
          },
          "& .MuiTooltip-arrow": {
            color: 'primary.main',
          }
        }
      }}

    >
      <div>
        <Tooltip
          title={title}
          placement="left"
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [, -10],
                },
              },
            ],
            sx: {
              "& .MuiTooltip-tooltip": {
                background: display[value] === true
                  ? `linear-gradient(90deg, ${theme.palette.brandDark.nine}, ${theme.palette.brand.nine}bb)`
                  : `linear-gradient(90deg, ${theme.palette.brandLight.nine}bb, ${theme.palette.brand.nine}bb)`,
                fontSize: 18,
                px: 3,
                py: 1.25,
                borderRadius: '0 32px 32px 0',
                backdropFilter: 'blur(3px)'
              },
              "& .MuiTooltip-arrow": {
                color: 'primary.main',
              }
            }
          }}

        >

          <Box
            onClick={onClick}
            sx={{
              height: 50,
              width: { xs: '100%', sm: 50 },
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              '&&:hover': {
                background: display[value] === true ? theme.palette.brandDark.nine : `${theme.palette.brandLight.nine}bb`
              },
              background: display[value] === true ? theme.palette.brand.nine : 'transparent',
              transition: '.5s',
              zIndex: 20000
            }}
          >
            <Box
              sx={{
                transform: display === value ? 'scale(1.2)' : 'scale(1)',
                transition: '.4s',
                color: display[value] === true ? '#fff' : '#666',
              }}
            >
              {icon}
            </Box>
            
          </Box>
        </Tooltip>
        {
          lastButton
            ?
            null
            :
            <Divider sx={{ width: '100%', borderColor: '#fff' }} />
        }
      </div>
    </Tooltip>
  )
}

const GridItem = (props) => {
  const { children, header, viewType } = props;

  return (
    <Grid
      sx={{
      }}
      xs={12}
      sm={viewType === 'row' ? 12 : 6}
      md={viewType === 'row' ? 12 : 4}
    >
      <Grid
        sx={{
          mx: 1,
          mb: 2,
          height: viewType === 'row' ? 'inherit' : 200,
          borderRadius: 3,
          background: '#fff',
          overflow: 'clip'
        }}
      >
        <Grid
          sx={{
            background: '#fff',
            p: 2
          }}
        >
          <Typography
            sx={{
              fontWeight: 600
            }}
          >
            {header}
          </Typography>
        </Grid>
        <Grid
          sx={{
            px: 2
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Grid>

  )

}

const UserDashboardSideMenu = (props) => {
  const { user, closets, categories, articles, calendar, camera } = props;
  const [display, setDisplay] = useState(
    {
      recent: false,
      closets: false,
      categories: false,
      articles: false,
      calendar: false,
      camera: false
    }
  );
  const [current, setCurrent] = useState(null);
  const [viewType, setViewType] = useState('row');
  const iconSize = 32;

  const authContext = useAuth();

  const hashScroll = (hashId) => {
    const element = document.getElementById(hashId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }

  // Create a function to change display state
  const handleClick = (value) => {
    setDisplay(
      {
        ...display,
        [value]: true,
      }
    )
    setTimeout(() => {
      hashScroll(value);
    }, 100);
  }





  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <MainWrapperSideMenu
        stickyMenu
        sx={{
          mt: 10,
          position: 'relative'
        }}
      >
        <>
          <SideMenuButton
            id="recent"
            icon={<AccessTime sx={{ fontSize: iconSize }} />}
            value="recent"
            setDisplay={setDisplay}
            display={display}
            title="Recent"
            setCurrent={setCurrent}
            onClick={() => handleClick('recent')}
          />
          
          <SideMenuButton
            id="closets"
            icon={<CurtainsClosedTwoTone sx={{ fontSize: iconSize }} />}
            value="closets"
            setDisplay={setDisplay}
            display={display}
            title="Closets"
            setCurrent={setCurrent}
            onClick={() => handleClick('closets')}
          />
          <SideMenuButton
            id="categories"
            icon={<ChecklistTwoTone sx={{ fontSize: iconSize }} />}
            value="categories"
            setDisplay={setDisplay}
            display={display}
            title="Categories"
            setCurrent={setCurrent}
            onClick={() => handleClick('categories')}
          />
          <SideMenuButton
            id="articles"
            icon={<CheckroomTwoTone sx={{ fontSize: iconSize }} />}
            value="articles"
            setDisplay={setDisplay}
            display={display}
            title="Articles"
            setCurrent={setCurrent}
            onClick={() => handleClick('articles')}
          />
          <SideMenuButton
            id="calendar"
            icon={<CalendarViewMonthTwoTone sx={{ fontSize: iconSize }} />}
            value="calendar"
            setDisplay={setDisplay}
            display={display}
            title="Calendar"
            setCurrent={setCurrent}
            onClick={() => handleClick('calendar')}
          />
          <SideMenuButton
            id="camera"
            icon={<CameraAltTwoTone sx={{ fontSize: iconSize }} />}
            value="camera"
            setDisplay={setDisplay}
            display={display}
            title="Camera"
            setCurrent={setCurrent}
            onClick={() => handleClick('camera')}
          />
          
        </>

        <>
          <Grid
            container
          >

            {display.recent === true ?
              <RecentItems
                id="recent"
                recent={recent}
                closets={closets}
                categories={categories}
                articles={articles}
                calendar={calendar}
              />

              :
              null
            }
            {display.courses === true ?
              <NeuReusableList
                id="closets"
                title="Closets"
                button={
                  <Button
                    href="/create-closet"
                  >
                    Add Closet
                  </Button>
                }
              >
                {
                  closets?.map((closet, index) => (
                    <NeuClosetItemTemplate
                      closet={closet}
                      index={index}
                      authContext={authContext}
                    />
                  ))
                }
              </NeuReusableList>
              :
              null
            }
            {display.categories === true ?
              <NeuReusableList
                id="categories"
                title="Categories"
                button={
                  <>
                    <CategoryCreate
                      closets={closets}
                    />

                  </>

                }
              >
                {
                  categories?.map((category, index) => (
                    <NeuCategoryItemTemplate
                      category={category}
                      index={index}
                      authContext={authContext}
                    />
                  ))
                }
              </NeuReusableList>
              :
              null
            }
            {display.articles === true ?
              <NeuReusableList
                id="articles"
                title="Articles"
                button={
                  <Button
                    href="/create-article"
                  >
                    Add Article
                  </Button>
                }
              >
                {
                  articles?.map((article, index) => (
                    <NeuArticleItemTemplate
                      article={article}
                      index={index}
                      authContext={authContext}
                    />
                  ))
                }
              </NeuReusableList>
              :
              null
            }
            {display.calendar === true ?
              <NeuReusableList
                id="calendar"
                title="Calendar"
              >
                {
                  calendar?.map((calendar, index) => (
                    <NeuActiveCalendarItemTemplate
                      calendar={calendar}
                      index={index}
                      authContext={authContext}
                    />
                  ))
                }
                
              </NeuReusableList>
                :
                null
              }
              
              
            {!display.closets && !display.categories && !display.articles && !display.calendar && !display.recent ?
            
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '60vh',
                  width: '100%',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    mt: 18,
                    mb: 2,
                    fontWeight: 600
                  }}
                >
                  {`Hi ${authContext.account.firstName}!`}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  Welcome Back, we've been waiting for you!
                </Typography>
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    mt: { xs: -30, sm: -10, md: 0 },
                    width: { xs: '100%', md: '50%' },
                    height: { xs: '100%', md: '50%' },
                  }}
                >
                  <LottiePlayer
                    ratio="xMaxYMid meet"
                    data={fox}
                  />
                </Box>

              </Box>
              :
              null
            }
          </Grid>
        </>
      </MainWrapperSideMenu>
    </div>
  )
}

export default UserDashboardSideMenu;

const RecentItems = (props) => {
  const { closets, categories, articles, calendar, id } = props
  const [filteredClosets, setFilteredClosets] = useState(closets);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [filteredCalendar, setFilteredCalendar] = useState(calendar);
  const [days, setDays] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredClosets(closets);
    setFilteredCategories(categories);
    setFilteredArticles(articles);
    setFilteredCalendar(calendar);
  }, [closets, categories, articles, calendar])


  // ===========================================================================
  // FILTER BY DATE FUNCTION USING SLIDER IN DOM
  // ===========================================================================
  const filterByDate = (arr, days, set) => {
    if (arr?.length) {
      const newArr = [...arr];

      const filteredByDay = newArr.filter(x =>
        timeDifferenceObj(x.updatedAt.toDate()).days <= days
      )
      const updated = filteredByDay.map(item => ({ ...item, daysAgo: timeDifferenceObj(item.updatedAt.toDate()) }))

      set(updated);
    }
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  function valueLabelFormat(value) {
    const units = ['days', 'weeks', 'months'];

    let unitIndex = 0;
    let scaledValue = value;

    return `${scaledValue} days`;
  }



  const RecentModule = (props) => {
    const { arr, label, edit, open, icon } = props;

    const handleEdit = (id) => {
      navigate(`${edit}/${id}`)
    }

    const handleOpen = (id) => {
      navigate(`${open}/${id}`)
    }
    return (
      arr?.length
        ?
        <NeuBox
          container
          up
          sx={{
            width: '100%',
            mb: 4,
            p: 2,
            alignItems: 'flex-start'
          }}
        >
          <Grid
            sx={{
              height: '100%'
            }}
            md={6}
          >
            <Grid
              container
              sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  color: '#aaa',
                  mr: 1
                }}
              >
                {icon}
              </Box>
              <Typography
                variant="h4"
              >
                {label}
              </Typography>
            </Grid>

          </Grid>

          <Grid
            md={6}
          >
            <Grid
              container
              sx={{
                pt: 1,
                px: 2
              }}
            >
              <Typography>
                Recent
              </Typography>
            </Grid>

            {arr.slice(0, 3).map((item, index) => {
              const colorBg = label === 'Closets' ? item.colorBg : item.closets?.[0].colorBg;
              const colorFont = label === 'Closets' ? item.colorFont : item.closets?.[0].colorFont;
              return (
                <Grid
                  xs={12}
                >
                  <Grid
                    sx={{
                      boxShadow: '0 0 5px #00000050',
                      borderRadius: 3,
                      background: '#fff',
                      m: 1,
                      background: `${colorBg}20`,
                      overflow: 'clip',
                      height: 80,
                      transform: 'scale(.98)',
                      transition: '.3s',
                      '&&:hover': {
                        transform: 'scale(1)',
                        boxShadow: '3px 3px 10px #00000030',
                      }
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        background: colorBg ? colorBg : '#fff',
                        columnGap: 1,
                        px: 2,
                        py: .5,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Grid
                        sx={{
                          overflow: 'hidden',
                          width: 100,
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        xs
                      >
                        <Typography
                          sx={{
                            color: colorFont ? colorFont : '#666',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                        xs="auto"
                      >
                        <Box
                          sx={{
                            background: '#fff',
                            borderRadius: 2,
                            px: 2,
                            overflow: 'hidden',

                          }}
                        >
                          <Typography
                            sx={{
                              whiteSpace: 'nowrap',
                              textTransform: 'uppercase',
                              fontSize: 12,
                              fontWeight: 600
                            }}
                          >
                            {timeDifferenceObj(item.updatedAt.toDate()).days === 1
                              ?
                              `${timeDifferenceObj(item.updatedAt.toDate()).days} day`
                              :
                              timeDifferenceObj(item.updatedAt.toDate()).days === 0
                                ?
                                'Today'
                                :
                                `${timeDifferenceObj(item.updatedAt.toDate()).days} days`

                            }
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{
                      }}
                    >
                      <ActionPanel
                        colorBg={colorBg}
                        editClick={() => handleEdit(item.id)}
                        openClick={() => handleOpen(item.id)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>

        </NeuBox>

        :
        null
    )
  }

  return (
    <Grid
      container
      id={id}
    >
     
      <RecentModule
        label="Categories"
        icon={<ChecklistTwoTone sx={{ fontSize: 28 }} />}
        arr={filteredCategories}
        edit={`/category`}
        open={`/category`}
      />
      <RecentModule
        label="Articles"
        icon={<CheckroomTwoTone sx={{ fontSize: 28 }} />}
        arr={filteredArticles}
        edit={``}
        open={``}
      />
      <RecentModule
        label="Closets"
        icon={<CurtainsClosedTwoTone sx={{ fontSize: 28 }} />}
        arr={filteredClosets}
        edit={``}
        open={``}
      />
      <RecentModule
        label="Calendar"
        icon={<CalendarViewMonthTwoTone sx={{ fontSize: 28 }} />}
        arr={filteredCalendar}
        edit={``}
        open={``}
      />
    </Grid>
  )
}

const ContentView = (props) => {
  const { colorBg, contentType, number, numberPost } = props;

  return (
    <Grid
      container
      columnGap={2}
      sx={{
        my: 1,
        p: 1,
        borderRadius: 2,
        boxShadow: '0 0 5px #00000030',
        background: `${colorBg}50`
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          background: '#fff',
          borderRadius: 1.5
        }}
        xs={2}
      >
        <Typography
          sx={{
            color: '#000',
            fontWeight: 700
          }}
        >
          {number} {numberPost}
        </Typography>
      </Grid>
      <Grid
        xs={9}
      >
        <Typography
          sx={{
            color: '#000',

          }}
        >
          {contentType}
        </Typography>
      </Grid>
    </Grid>
  )
}

const ActionPanel = (props) => {
  const { colorBg, editClick, openClick } = props;

  return (
    <Grid
      container
      sx={{
        p: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid
        onClick={editClick}
        sx={{
          height: 30,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '.2s',
          cursor: 'pointer',
          '&&:hover': {
            background: `${colorBg}50`
          },
          '&&:active': {
            background: `${colorBg}aa`
          }
        }}
        xs={4}
      >
        <Edit />
      </Grid>
      <Grid
        onClick={openClick}
        sx={{
          height: 30,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '.2s',
          cursor: 'pointer',
          '&&:hover': {
            background: `${colorBg}50`
          },
          '&&:active': {
            background: `${colorBg}aa`
          }
        }}
        xs={4}
      >
        <OpenInNew />
      </Grid>
    </Grid>
  )

}