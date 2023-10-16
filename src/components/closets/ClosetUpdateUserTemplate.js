import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect} from 'react';
import { Alert, Box, Button, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { CustomInput } from '../../lib/Styles';
import { db } from '../../firebase';
import MainWrapper from '../templates/MainWrapper';
import { useAuth } from '../../context/authContext';
import { useTheme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategorySelectionMultipleTag } from '../ui/CategorySelectionMultipleTag';
import { useGetCategory, useGetCloset, useGetClosetsUserId, useClosetsUserId } from '../../hooks/mutations';
import ClosetUpdate from '../closets/ClosetUpdate';
import {
  Add,
  AddBox,
  AddToPhotos,
  Cancel,
  Check,
  CheckCircle,
  Close,
  CopyAll,
  DeleteForever,
  Download,
  DynamicFeed,
  Edit,
  ExpandMore,
  KeyboardArrowRight,
  Link,
  OpenInBrowser,
  OpenInNew,
  PlayForWork,
  RadioButtonUnchecked,
  Settings,
  Sync,
  Troubleshoot,
  Visibility
} from '@mui/icons-material';
import ReusableSearch from '../ui/ReusableSearch';
import ReusableModal from '../ui/ReusableModal';
import SettingsForm from '../ui/SettingsForm';
import { WarningOutlineSVG } from '../../assets/graphics';
import ReusableModalTooltip from '../ui/ReusableModalTooltip';
import { CategoryTag } from '../ui/Tags';
import CategorySelectionSingleTag from '../ui/CategorySelectionSingleTag';

const UserArticleSelect = (props) => {
  const { closet, setCloset, handleCloseAlert } = props;
  const [selectedArticles, setSelectedArticles] = useState(articles);
  const [selectedArticleIds, setSelectedArticleIds] = useState(articles.map(x => x.id));
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    if (selectedArticles.length !== articles.length) {
      setSelectAll(false)
    }
  }, [selectedArticleIds])

  // Select all of the articles or none of the articles
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedArticles([]);
      setSelectedArticleIds([]);
      setSelectAll(false);
    } else {
      setSelectedArticles(articles);
      setSelectedArticleIds(articles.map(x => x.id));
      setSelectAll(true);
    }
  }

  // Function every time an article is clicked (Adds or removes from the selectedArticles state)
  const handleArticleSelect = (article) => {
    const articleId = article.id;
    const currentArticleIds = [...selectedArticleIds];
    if (selectedArticleIds.includes(articleId)) {
      // Run if the current article is already selected (Remove from array)

      // Get the index of the item to remove from currentArticleIds (selectedArticleIds)
      const indexToRemove = currentArticleIds.indexOf(articleId);

      // Remove article item from selectedArticle and return array without that article
      const updatedArticles = selectedArticles.filter(x => x.id !== articleId);

      // Remove id item from currentArticleIds array (later set to selectedArticleIds state)
      currentArticleIds.splice(indexToRemove, 1);

      // Save new article and article id states
      setSelectedArticleIds(currentArticleIds);
      setSelectedArticles(updatedArticles);

    } else {
      currentArticleIds.push(articleId);
      setSelectedArticleIds(currentArticleIds);
      setSelectedArticles([...selectedArticles, article])
    }
  }

  // Function to add the specified articles to the closet array 
  const addArticles = () => {

    // Compare selected articles with existing articles to make sure no duplicates exist based on id and category.
    // Remove any selected articles that have the same id and category as the existing closet.articles array. 
    const comparedArray = selectedArticles.filter(sc => !closet.articles.some(c => c.id === sc.id && c.category === sc.category));

    // Combine the existing articles array with the newly selected articles
    const combinedArticlesArray = [...closet.articles, ...comparedArray];

    setCloset({
      ...closet,
      articles: combinedArticlesArray,
      closetId: null,
      closetTitle: null,
    })

    handleCloseAlert();
  }


  const [expand, setExpand] = useState({});

  return (
    <Grid
      container
      sx={{
      }}
    >
      <Button
        onClick={handleSelectAll}
        sx={{
          px:2.5,
          my:1
        }}
      >
        {
          selectedArticles.length === closet.articles.length
            ?
              <Box
                sx={{
                  display:'flex',
                  alignItems:'centr'
                }}
              >
                <CheckCircle />
                <Typography
                  sx={{
                    textTransform:'none',
                    color:'inherit',
                    ml:1
                  }}
                >
                  Deselect All
                </Typography>
              </Box>
            :
              <Box
                sx={{
                  display:'flex',
                  alignItems:'centr'
                }}
              >
                <RadioButtonUnchecked />
                <Typography
                  sx={{
                    textTransform:'none',
                    color:'inherit',
                    ml:1
                  }}
                >
                  Select All
                </Typography>
              </Box>
        }
      </Button>

      {closet.articles.map((article, index) => (
        <>
          <Grid
            container
            sx={{
              background:'#fff',
              justifyContent:'space-between',
              cursor:'pointer',
              boxShadow:'0 0 10px -5px #00000030',
              borderRadius:2,
              px:2,
              py:1,
              mb:2
            }}
          >
            <Grid
              container
              sx={{
                justifyContent:'space-between',
              }}
            >
              <Grid
                onClick={() => handleArticleSelect(article)}
                sx={{
                  display:'flex',
                  alignItems:'center',
                  width:'auto'
                }}
                xs
              >
                <Box
                  sx={{
                    display:'flex',
                    alignItems:'center',
                    mr:2
                  }}
                >
                  {
                    selectedArticleIds.includes(article.id)
                      ?
                        <CheckCircle
                          sx={{
                            fontSize:36,
                            color:'primary.main'
                          }}
                        />
                      :
                        <RadioButtonUnchecked
                          sx={{
                            fontSize:36,
                          }}
                        />
                  }
                </Box>

                <Typography>
                  {article.category}
                </Typography>
              </Grid>
              <Grid
                onClick={() => setExpand({...expand, [article.id]: !expand[article.id] ? true : false})}
                sx={{
                  display:'flex',
                  alignItems:'center'
                }}
                xs="auto"
              >
                <Typography>
                  {article.categoryList.length ? (article.categoryList.length === 1 ? `${article.categoryList.length} Category` : `${article.categoryList.length} Categories`) : '0 Categories'}
                </Typography>
                <ExpandMore
                  sx={{
                    transform: expand[card.id] ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition:'.2s'
                  }}
                />
              </Grid>
            </Grid>

            <Collapse
              in={expand[article.id]}
              onClick={() => handleArticleSelect(article)}
              sx={{
                width:'100%'
              }}
            >
              {
                article.categoryList.map((category, index) => (
                  <Box
                    sx={{
                      display:'flex',
                      alignItems:'center',
                      pl:6
                    }}
                  >
                    {
                      category
                        ?
                          <Check
                            sx={{
                              color:'primary.main'
                            }}
                          />
                        :
                          <Close
                            sx={{
                            }}
                          />
                    }
                    <Typography
                      sx={{
                        ml:2
                      }}
                    >{category.category}</Typography>
                  </Box>

                ))
              }
            </Collapse>
          </Grid>
        </>
      ))}

      <Grid
        container
        sx={{
          justifyContent:'flex-end',
          pb:2
        }}
      >
        <Button
          onClick={addArticles}
          variant="contained"
          disabled={!selectedArticles.length}
        >
          Import Selected
        </Button>
      </Grid>
    </Grid>
  )
}

const UserClosetItem = (props) => {
  const { list, closet, setCloset } = props;
  const theme = useTheme();
  const navigate = useNavigate();


  // ========================================================
  // ACCORDION
  // ========================================================
  const [expand, setExpand] = useState(false);

  const handleSelectSet = () => {
    if (expand) {
      setExpand(false);

    } else {
      setExpand(true);
    }
  }

  // ========================================================
  // ITEM ACTION BUTTON
  // ========================================================
  const ItemButton = (props) => {
    const { icon, label, onClick } = props;

    switch (label) {
      case 'IMPORT':
        return (
          <Box
            onClick={onClick ? onClick : null}
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              alignItems:'center',
              width:40,
              height:40,
              p:.5,
              borderRadius:2,
              background:'transparent',
              cursor:'pointer',
              transition:'.4s',
              '&&:hover':{
                background: '#00000015'
              }
            }}
          >
            {icon}
            <Typography
              sx={{
                fontSize:12,
                lineHeight:1,
                fontWeight:600
              }}
            >
              {label}
            </Typography>
          </Box>
        )
    
      default:
        return (
          list ? null :
          <Box
            onClick={onClick ? onClick : null}
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              alignItems:'center',
              width:40,
              height:40,
              p:.5,
              borderRadius:2,
              background:'transparent',
              cursor:'pointer',
              transition:'.4s',
              '&&:hover':{
                background: '#00000015'
              }
            }}
          >
            {icon}
            <Typography
              sx={{
                fontSize:12,
                lineHeight:1,
                fontWeight:600
              }}
            >
              {label}
            </Typography>
          </Box>
        )
        }

  }

  // ========================================================
  // IMPORT ARTICLES DIALOG
  // ========================================================
  const [openAlert, setOpenAlert] = useState(false);

  // Close Dialog
  const handleCloseAlert = () => {
    setOpenAlert(false);
    handleCloseArticleSelection();
  };

  // ========================================================
  // MANUALLY SELECT ARTICLES SELECTION
  // ========================================================
  const [articleSelection, setArticleSelection] = useState(false);
  const [showAddArticles, setShowAddArticles] = useState(false);
  
  const handleOpenArticleSelection = () => {
    setArticleSelection(true);
    setCloset({
      ...closet,
      createType: 'select'
    })

  } 

  const handleCloseArticleSelection = () => {
    setArticleSelection(false);
  }

  const addArticleSelections = () => {
    if (!expand) {
      setExpand(true)
    }
    setShowAddArticles(true);
  }

  const handleCloseShowAddArticles = () => {
    setShowAddArticles(false);
  }


  // ========================================================
  // DELETE ARTICLE(S) FROM CLOSET ARTICLES ARRAY
  // ========================================================
  // ALERT FUNCTIONS
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [toDelete, setToDelete] = useState();

  const deleteArticles = async () => {
    const updatedArr = closet.articles.filter(article => article.id !== toDelete.id);
    console.log('updatedArr', updatedArr);

    setCloset({
      ...closet,
      articles:updatedArr
    })

    handleCloseDeleteAlert();

  }

  const handleDeleteAlert = (article) => {
    // Pass the article to delete into toDelete state
    setToDelete(article)

    // Open the confirmation Dialog
    setOpenDeleteAlert(true);
  };
  
  // Close Dialog
  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  // ========================================================
  // COPY, SELECT, OR LINK CLOSET ARTICLES FOR CLOSET
  // ========================================================
  const copyArticles = () => {
    setCloset({
      ...closet,
      articles:closet.articles,
      closetId: closet.id,
      closetTitle: closet.title,
      createType: 'copy'
    })

    handleCloseAlert();
  }

  const linkArticles = () => {
    setCloset({
      ...closet,
      articles:[],
      closetId: closet.id,
      closetTitle: closet.title,
      createType: 'link'
    })

    handleCloseAlert();
  }

  // Remove existing articles in closet articles array and existing closet id in closetId field.
  // This will result in showing all of the possible closets for the user to choose from.
  const removeArticles = () => {
    setCloset({
      ...closet,
      articles:[],
      closetId:null,
      closetTitle:null
    })
  }

  // Closet title and type display
  const ClosetTitle = () => {

    switch (closet.createType) {
      case 'select':
        return (
          <Box
            sx={{
              display:'flex',
              alignItems:'center'
            }}
          >
            <DynamicFeed />
            <Typography
              sx={{
                ml:2
              }}
            >
              Custom Article Selection
            </Typography>
          </Box>
        );

      case 'copy':
        return (
          <Box
            sx={{
              display:'flex',
              alignItems:'center'
            }}
          >
            <CopyAll />
            <Typography
              sx={{
                ml:2
              }}
            >
              {closet.closetTitle ? closet.closetTitle : null}
            </Typography>
          </Box>
        );

      case 'link':
        return (
          <Box
            sx={{
              display:'flex',
              alignItems:'center'
            }}
          >
            <Link />
            <Typography
              sx={{
                ml:2
              }}
            >
              {closet.closetTitle ? closet.closetTitle : null}
            </Typography>
          </Box>
        );
    
      default:
        return null;
    }

  }

  return (
    <Grid
      container
      sx={{
        background:'#fff',
        mb:1
      }}
    >
      <Box
        sx={{
          background: expand ? `${theme.palette.brand.five}20` : '#fff',
          boxShadow: '0 0 10px -5px #00000050',
          width:'100%',
          borderRadius:2,
          transition:'2s'
        }}
      >
        <Box
          sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            width:'calc(100% -24px)',
            px:4
          }}
        >
          <Box
            sx={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              width:'100%',
            }}
          >
            <Box
              onClick={handleSelectSet}
              sx={{
                display:'flex',
                width:'100%',
                cursor:'pointer',
                py:2
              }}
            >

              <Typography sx={{fontWeight:500}}>
                {closet.title ? closet.title : 'Untitled Set'}
              </Typography>
              {
                list
                  ?
                    null
                  :
                    <Box
                      sx={{
                        ml:4
                      }}
                    >
                      <ClosetTitle />
                    </Box>
              }
            </Box>
            <Box
              sx={{
                display:'flex'
              }}
            >
              {
                closet.createType === 'select'
                  ?
                    <>
                      {
                        showAddArticles
                          ?
                            <ItemButton
                              icon={<Close sx={{p:.25}} />}
                              label="DONE"
                              onClick={() => setShowAddArticles(false)} // This will set the showAddArticles state to false and close the Import Closet Articles display
                            />
                          :
                            <ItemButton
                              icon={<Add sx={{p:.25}} />}
                              label="ADD"
                              onClick={addArticleSelections} // This will open up the import closet option below the saved articles by setting the showAddArticles state to true
                            />
                      }
                      
                    </>
                  :
                    null
              }
              {
                closet.createType === 'copy'
                  ?
                    <>
                      <ItemButton
                        icon={<Visibility sx={{p:.25}} />}
                        label="VIEW"
                        onClick={() => navigate(`/closet/${closet.closetId}`)}
                      />
                    </>
                  :
                    null
              }
              {
                closet.createType === 'link'
                  ?
                    <>
                      <ItemButton
                        icon={<Visibility sx={{p:.25}} />}
                        label="VIEW"
                        onClick={() => navigate(`/closet/${closet.closetId}`)}
                      />
                    </>
                  :
                    null
              }
              {closet.articles?.length > 0 || closet.closetId
                ?
                  <ItemButton
                    icon={<Sync sx={{transform:'rotate(90deg)'}} />}
                    label="SWITCH"
                    onClick={removeArticles}
                  />
                : 
                  <ItemButton
                    icon={<Download sx={{transform:'rotate(90deg)'}} />}
                    label="IMPORT"
                    onClick={() => setOpenAlert(true)}
                  />

              }
            </Box>

          </Box>
        </Box>

        <Collapse
          in={expand}
        >
          {closet.articles.length
            ?
              <Box
                sx={{
                  width:'calc(100% -24px)',
                  px:3,
                  pb:2,
                  maxHeight:500,
                  overflow:'auto'
                }}
              >
                {
                  closet.articles?.map((article, index) => (
                    <Grid
                      container
                      sx={{
                        justifyContent:'space-between',
                        alignItems:'center',
                        background: '#fff',
                        boxShadow: expand ? '0 0 10px -5px #00000090' : '0 0 0 transparent',
                        transition:'2s',
                        borderRadius:2,
                        px:2,
                        py:1,
                        mb:1
                      }}
                    >
                      <Typography>
                        {article.category}
                      </Typography>
                      <Box
                        sx={{
                          display:'flex',
                          alignItems:'center'
                        }}
                      >
                        <Typography>
                          {article.categoryList.length ? (article.categoryList.length === 1 ? `${article.categoryList.length} Category` : `${article.categoryList.length} Categories`) : '0 Categories'}
                        </Typography>
                        <IconButton
                          onClick={() => handleDeleteAlert(article)}
                          sx={{
                            p:.5,
                            borderRadius:2,
                            ml:1
                          }}
                        >
                          <DeleteForever />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))
                }
                {
            
                }
              </Box>
            :
              null
          }
          <Collapse
            in={showAddArticles}
          >
            <UserClosetsToAdd
              closet={closet}
              setCloset={setCloset}
              handleClose={() => setShowAddArticles(false)}
            />
          </Collapse>

        </Collapse>
      </Box>

      {/* IMPORT CLOSET ALERT BOX*/}
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        PaperProps={{
          sx:{
            maxHeight: cardSelection ? '80vh' : 'auto'
          }
        }}
      >
        <DialogTitle>
          {articleSelection ? 'Select the articles to include in your closet' : 'How do you want to import the selected articles?'}
        </DialogTitle>
        {articleSelection
          ? // Select specific articles from a set when the select option is chosen
            <DialogContent>
              <UserArticleSelect
                closet={closet}
                setCloset={setCloset}
                handleCloseAlert={handleCloseAlert}
              />
            </DialogContent>
          
          : // Show the closet link / copy / select options
            <DialogContent>
              <Grid
                container
                sx={{
                  justifyContent:'space-around'
                }}
              >
                <Grid
                  container
                  onClick={linkArticles} // Run link articles function that links to the original closet articles array
                  sx={{
                    alignItems:'center',
                    mt:2,
                    px:2,
                    py:1,
                    borderRadius:4,
                    cursor:'pointer',
                    background: 'transparent',
                    transition:'.25s',
                    '&&:hover':{
                      background: '#eee'
                    }
                  }}
                >
                  <Grid
                    sx={{
                    }}
                    xs="auto"
                  >
                    <Link
                      sx={{
                        fontSize:48
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      pl:2
                    }}
                    xs
                  >
                    <Typography
                      sx={{
                        fontSize:20,
                        fontWeight:600
                      }}
                    >
                      Link to a closet
                    </Typography>
                    <Typography>
                      Keep the set dynamic and the closets will update when the original set is modified. 
                    </Typography>
                  </Grid>
                </Grid>
                    {/* <Alert severity='warning'>If you are using someone else's closet the articles may change without your knowledge.</Alert> */}

                <Divider variant="middle" sx={{width:'70%', my:1}} />

                <Grid
                  container
                  onClick={copyArticles} // Run link articles function that links to the original closet articles array
                  sx={{
                    alignItems:'center',
                    px:2,
                    py:1,
                    borderRadius:4,
                    cursor:'pointer',
                    background: 'transparent',
                    transition:'.25s',
                    '&&:hover':{
                      background: '#eee'
                    }
                  }}
                >
                  <Grid
                    sx={{
                    }}
                    xs="auto"
                  >
                    <CopyAll
                      sx={{
                        fontSize:48
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      pl:2
                    }}
                    xs
                  >
                    <Typography
                      sx={{
                        fontSize:20,
                        fontWeight:600
                      }}
                    >
                      Duplicate the closet
                    </Typography>

                    <Typography>
                      Duplicate the closet so that it is editable for your closet. Only you will have the ability to change the content of the articles.
                    </Typography>
                  </Grid>
                </Grid>

                <Divider variant="middle" sx={{width:'70%', my:1}} />

                <Grid
                  container
                  onClick={handleOpenArticleSelection} // Run link articles function that links to the original closet articles array
                  sx={{
                    alignItems:'center',
                    px:2,
                    py:1,
                    borderRadius:4,
                    cursor:'pointer',
                    background: 'transparent',
                    transition:'.25s',
                    '&&:hover':{
                      background: '#eee'
                    }
                  }}
                >
                  <Grid
                    sx={{
                    }}
                    xs="auto"
                  >
                    <DynamicFeed
                      sx={{
                        fontSize:48
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      pl:2
                    }}
                    xs
                  >
                    <Typography
                      sx={{
                        fontSize:20,
                        fontWeight:600
                      }}
                    >
                      Select Closet
                    </Typography>

                    <Typography>
                      Select specific closets you want. Perfect for creating a closet from a portion of another closet or sets.
                    </Typography>
                  </Grid>
                </Grid>

              </Grid>
            </DialogContent>
        }
      </Dialog>

      {/* DELETE ARTICLE ALERT */}
      <Dialog
        open={openDeleteAlert}
        onClose={handleCloseDeleteAlert}
      >
        <DialogTitle>
          {`Delete ${closet?.title ? closet.title : 'Untitled Closet'}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This cannot be undone. Make sure you are deleting the correct Closet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between" mx={2} mb={2}>
            <Button variant="outlined" onClick={handleCloseDeleteAlert}>Cancel</Button>
            <Button variant="contained" color="warning" onClick={deleteArticles} autoFocus>
              Delete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      
      
    </Grid>

  )

}

const UserClosets = (props) => {
  const { closet, setCloset, initCloset } = props;
  const [searchBy, setSearchBy] = useState('title');
  const [filteredSets, setFilteredSets] = useState();
  const userSets = useClosetsUserId();
  const articles = useGetArticles('userId');

  return (
    <Grid
      container
      sx={{
        background:'#fff',
        justifyContent:'flex-end',
        borderRadius:4,
        px:2,
        pb:1
      }}
    >
      <Grid
        container
        sx={{
          justifyContent:'space-between',
          py:2
        }}
      >
        <Typography
          sx={{
            p:2,
            fontSize:24,
            fontWeight:600,
            mb:1
          }}
        >
          {`Import Closet(s)`}
        </Typography>

        <Box
          sx={{
            display:'flex',
            alignItems:'center'
          }}
        >
          <ReusableSearch
            content={userSets}
            setContent={setFilteredSets}
            useSearch="title"
            placeholder="Closet Set Name"
          />
          <IconButton
            id="close-button"
            onClick={() => {
              setCloset({
                ...closet,
                articles:initCloset.articles
              })
            }}
            sx={{
              color:'#888',
              opacity: 1,
              p:.5,
              transform:'rotate(0deg)',
              transition:'.15s',
              '&&:hover':{
                transform:'rotate(90deg)'
              }
            }}  
          >
            <Close sx={{fontSize:36}} />
          </IconButton>
        </Box>
      </Grid>
      
      {
        filteredSets?.map((set, index) => (
          <UserClosetItem
            list
            closet={[set, closet]}
            setCloset={setCloset}
          />
        ))
      }
    </Grid>
  );
}

const UserClosetsToAdd = (props) => {
  const { closet, setCloset, handleClose } = props;
  const [searchBy, setSearchBy] = useState('title');
  const [filteredSets, setFilteredSets] = useState();
  const [expand, setExpand] = useState({});

  const theme = useTheme();
  const userSets = useGetClosetsUserId();
  const articles = useGetArticles('userId');

  const handleExpand = (id) => {
    if (expand[id]) {
      setExpand({[id]: false}) // Use if we only want one closet to open at a time
    } else {
      setExpand({[id]: true}) // Use if we only want one closet to open at a time
    }
  }

  return (
    <Grid
      container
      sx={{
        px:4,
        pb:1
      }}
    >
      <Grid
        container
        sx={{
          justifyContent:'space-between',
          py:2
        }}
      >
        <Typography
          sx={{
            py:2,
            fontSize:24,
            fontWeight:600,
          }}
        >
          {`Import Closet Articles`}
        </Typography>

        <Box
          sx={{
            display:'flex',
            alignItems:'center'
          }}
        >
          <ReusableSearch
            content={userSets}
            setContent={setFilteredSets}
            useSearch="title"
            placeholder="Search Closet Name"
          />
          <IconButton
            id="close-button"
            onClick={handleClose}
            sx={{
              color:'#888',
              opacity: 1,
              p:.5,
              transform:'rotate(0deg)',
              transition:'.15s',
              '&&:hover':{
                transform:'rotate(90deg)'
              }
            }}  
          >
            <Close sx={{fontSize:36}} />
          </IconButton>
        </Box>
      </Grid>
      
      {
        filteredSets?.map((set, index) => {

          return(
            <>
              <Grid
                container
                sx={{
                  background: expand[set.id] ? `#ffffff20` : '#fff',
                  mb:1,
                  boxShadow: '0 0 10px -5px #00000050',
                  width:'100%',
                  borderRadius:2,
                  overflow:'clip',
                  transition:'2s'
                }}
              >
                <Grid
                  container
                  onClick={() => handleExpand(set.id)}
                  sx={{
                    background:'#fff',
                    px:2,
                    py:1,
                    cursor:'pointer'
                  }}
                >
                  <Typography>
                    {set.title}
                  </Typography>
                  <Typography>
                    {set.articles?.length}
                  </Typography>
                </Grid>
                <Collapse
                  in={expand[set.id]}
                  sx={{
                    px:2,
                    width:'100%'
                  }}
                >
                  <UserArticleSelect
                    closet={[set, closet]}
                    setCloset={setCloset}
                    handleCloseAlert={() => handleExpand(set.id)}
                  />
                </Collapse>
              </Grid>
            </>
          )
        })
      }
    </Grid>
  );
}

const ClickBox = (props) => {
  const { onClick, useField, closet, theme, message} = props;

  return (
    <Grid
      sx={{
        px:1
      }}
      xs={12}
      md={6}
      lg={4}
    >

      <Box
        onClick={onClick}
        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          borderRadius:2,
          p:2,
          cursor:'pointer',
          background: closet[useField] ? `${theme.palette.primary.main}30` : `${theme.palette.brand.two}30`
        }}
      >
        {closet[useField]
          ?
            <CheckCircle
              sx={{
                fontSize:48,
                color: closet[useField] ? `${theme.palette.primary.main}` : `${theme.palette.brand.two}`
              }}
            />
          :
            <Cancel
              sx={{
                fontSize:48,
                color: closet[useField] ? `${theme.palette.primary.main}` : `${theme.palette.brand.two}`
              }}
            />
        }

        <Typography>
          {message}
        </Typography>
      </Box>

    </Grid>
  )
}
const Header = (props) => {
  const { children, isMobile } = props;
  
  return (
    <div
      style={{
        flex: '0 1 auto',
        background:'#fff',
        padding: isMobile ? '8px 16px' : '16px 32px',
      }}
    >
      {children}
    </div>
  )
}

const ClosetUpdateUserTemplate = (props) => {
  const { articles, initCloset } = props;
  const { closetId } = useParams();
  const [closet, setCloset] = useState({
    title: '',
    articles:[],
    category: [],
    tags: [],
    useRepeatCorrect: false
  });
  const [focus, setFocus] = useState();
  const [warningCards, setWarningCards] = useState([]);

  const authContext = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {defaultMatches: true})
  const navigate = useNavigate();

  // ===========================================================================
  // USE EFFECT FUNCTIONS
  // ===========================================================================

  useEffect(() => {
    if (initCloset) {
      setCloset(initCloset)
    }
  }, [initCloset])

  // // Run verification function(s) each time closet updates
  useEffect(() => {
    checkWarningsExist();
  }, [closet])



  // ===========================================================================
  // CHECK NECESSARY STATES BEFORE SAVING
  // ===========================================================================

  // Check if each any articles have 'warnings' like no category entered
  const checkWarningsExist = () => {
    const newCloset = {...closet};

    const noArticlesWarning = newCloset.articles.length ? null : {id: 'article', label:'No Articles Imported', warning:`You need articles or else your closet remains empty`};
    const noTitleWarning = newCloset.title.length ? null : {id: 'title', label:'No Title', warning:'You need a title before you can save your closet'};

    const allWarnings = [
      noArticlesWarning,
      noTitleWarning,
    ];
    console.log('allWarnings', allWarnings);

    const existingWarnings = allWarnings.filter(x => x);
    console.log('existingWarnings', existingWarnings);

    setWarningCards(existingWarnings);
  }

  // ===========================================================================
  // EDIT BUTTON(S)
  // ===========================================================================
  const [editTitle, setEditTitle] = useState(false);

  // Focus the title input if editTitle is set to true
  useEffect(() => {
    if (editTitle) {
      document.getElementById("title").focus();
    }
  }, [editTitle])

  // ===========================================================================
  // DATABASE API FUNCTIONS
  // ===========================================================================

  // Update closet on db
  const updateCloset = async () => {

    // Capture the new closet id for navigation purposes
    let newClosetId = closetId ? closetId : null

    // Update existing closet doc
    if (closetId) {
      try {
        const closetRef = doc(db, 'closets', closetId);
        const closetPayload = {
          ...closet,
          userId: authContext.account.id,
          userFirst: authContext.account.firstName,
          userLast: authContext.account.lastName,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
  
        const updatedCloset = await setDoc(closetRef, closetPayload, {merge:true});
  
        authContext.handleAlert(`The ${closet.title} closet has been updated`);
  
  
      } catch (error) {
        console.log('Error on updating closet', error);
      }
    } 
    
    // Create closet doc if initCloset state does not exist already
    else {
      try {
        const closetRef = collection(db, 'closets');
        const closetPayload = {
          ...closet,
          userId: authContext.account.id,
          userFirst: authContext.account.firstName,
          userLast: authContext.account.lastName,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
  
        const newCloset = await addDoc(closetRef, closetPayload);
        newClosetId = newCloset.id;
        authContext.handleAlert(`The ${closet.title} closet has been created`);
  
      } catch (error) {
        console.log('Error on creating closet', error);
      }
    }

    // Execute once the document has been updated or created
    if (authContext.account.settings.buttons.closetUpdate.navigate === 'content') {
      navigate(`/closets/${newClosetId}`);
    } else if (authContext.account.settings.buttons.closetUpdate.navigate === 'dashboard') {
      console.log('dashboard')
      navigate(`/home`)
    } else if (authContext.account.settings.buttons.closetUpdate.navigate === 'none') {
      console.log('none')
      navigate(`/update-closet/${newClosetId}`);
    }
  }

  // ===========================================================================
  // FORMIK FUNCTIONS
  // ===========================================================================
  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Enter a title'),
  })

  const onSubmit = () => {
    updateCloset();
    console.log('Form has been submitted');
  }

  // Buttons for the User Panel
  const BoxButton = ({ children, title }) => {

    return (
      <Tooltip
        title={title}
        placement="left"
        PopperProps={{
          sx: {
            "& .MuiTooltip-tooltip": {
              fontSize:18,
              px:3,
              py:1
            },
            "& .MuiTooltip-arrow": {
              color: 'primary.main',
            }
          }
        }}
  
      >
        <Box
          sx={{
            p:1,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:2,
            background:'transparent',
            cursor:'pointer',
            transition:'.3s',
            '&&:hover':{
              background:'#ddd'
            }
          }}
        >
          {children}
        </Box>
      </Tooltip>

    )
  }


  return (
    <Grid
      sx={{
        pt:5,
        pb:12
      }}
    >
      <Formik
        initialValues={closet}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({errors, touched}) => (
          <Form
            style={{
              width:'100%'
            }}
          >

            {/* HEADER */}
            <Header
                isMobile={isMobile}
              >
                <Grid
                  container
                  sx={{
                    alignItems:'center'
                  }}
                >
                  <Grid
                    sx={{

                    }}
                    xs={6}
                    sm={6}
                  >
                    {/* CLOSET TITLE INPUT */}
                    <Grid
                      container
                      sx={{
                        alignItems:'center'
                      }}
                    >
                      <Field
                        as={TextField}
                        id="title"
                        disabled={!editTitle}
                        onClick={() => setEditTitle(true)}
                        onBlur={() => setEditTitle(false)}
                        autoFocus
                        fullWidth
                        helperText={<ErrorMessage name="title" />}
                        value={closet?.title}
                        onChange={ (e) => setCloset({...closet, title: e.target.value}) }
                        variant="standard"
                        inputProps={{
                          sx:{
                            fontSize:{xs:18, md:24},
                            fontWeight:500,
                            p:0,
                            m:0
                          }
                        }}
                        InputProps={{
                          disableUnderline: true
                        }}
                        sx={{
                          borderRadius:2,
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            try {
                              e.preventDefault();
                              setEditTitle(false);
                            }
                            catch (x) { e.returnValue = false; }

                          }
                        }}
                        placeholder="Name your closet"
                        name="title"
                      />
                    </Grid>

                  </Grid>

                  <Grid
                    sx={{
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'flex-end'
                    }}
                    xs={6}
                    sm={6}
                  >
                    <Grid
                      container
                      columnGap={{xs:1, md:2}}
                      sx={{
                        justifyContent:'flex-end'
                      }}

                    >
                      {/* WARNING OR UPDATE CLOSET BUTTON */}
                      <Grid
                        sx={{
                          display:'flex',
                          justifyContent:'flex-end',
                          alignItems:'center'
                        }}
                        sm
                      >
                        {
                          warningCards.length
                            ?
                              isMobile
                                ?
                                  <WarningOutlineSVG
                                    fillColor={theme.palette.brand.two}
                                    strokeWidth={20}
                                    width={35}
                                    style={{
                                      padding:'0 16px'
                                    }}
                                  />
                                :
                                  <Grid
                                    sx={{
                                      display:'flex',
                                      justifyContent:'center',
                                      alignItems:'center',
                                      maxWidth:375,
                                      height:'100%',
                                      borderRadius:2,
                                      px:2
                                    }}
                                  >
                                    <WarningOutlineSVG
                                      fillColor={theme.palette.brand.two}
                                      strokeWidth={20}
                                      width={20}
                                      height={20}
                                    />

                                    <ReusableModalTooltip clickToClose>
                                      <Button
                                        sx={{
                                          fontWeight:500,
                                          lineHeight:1
                                        }}
                                      >
                                        {warningCards.length === 1
                                          ? `${warningCards.length} card is incomplete`
                                          : `${warningCards.length} cards are incomplete`}
                                      </Button>

                                        <Grid
                                          container
                                          sx={{
                                            background:'#F6F6F6'
                                          }}
                                        >
                                          <Grid
                                            container
                                            sx={{
                                              py:1,
                                              px:2,
                                              background:'#fff'
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                fontWeight:600
                                              }}
                                            >
                                              Fix any issues with your closet before saving
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            container
                                            sx={{
                                              px:2,
                                              py:4
                                            }}
                                          >

                                            {warningCards.map((item, index) => {

                                              return (
                                                <Grid
                                                  key={item.id}
                                                  container
                                                  sx={{
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    mb:1,
                                                    p:2,
                                                    borderRadius:2,
                                                    boxShadow:'0 0 5px #00000030',
                                                    background:'#fff'
                                                  }}
                                                >
                                                      <Box
                                                        sx={{
                                                          display:'flex',
                                                          alignItems:'center',
                                                          width:'100%'        
                                                        }}
                                                      >
                                                        <WarningOutlineSVG
                                                          fillColor={theme.palette.brand.two}
                                                          strokeWidth={20}
                                                          width={16}
                                                          ratio="xMaxYMin"
                                                          style={{
                                                            padding: '0 8px 0 0'
                                                          }}
                                                        />
                                                        <Typography
                                                          sx={{
                                                            lineHeight:1
                                                          }}
                                                        >
                                                          {item.label}
                                                        </Typography>
                                                      </Box>

                                                </Grid>
                                              )
                                            })}
                                          </Grid>
                                        </Grid>
                                    </ReusableModalTooltip>
                                </Grid>
                            :
                              isMobile
                                ?
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{
                                      height:36,
                                    }}
                                  >
                                    Save
                                  </Button>
                                :
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                      px:4
                                    }}
                                  >
                                    Save
                                  </Button>
                        }
                      </Grid>

                      {/* SETTINGS AND VIEW BUTTONS */}
                      <Grid
                      >
                        {
                          isMobile
                            ?
                            <>
                            </>
                            :
                              <>
                                <ReusableModalTooltip tooltipTitle="Action Panel" tooltipBg="#666" color="tone.dark" arrow offset={.1}>
                                  <Button
                                    variant="contained"
                                    color="tone"
                                    fullWidth
                                    sx={{
                                      py:2,
                                      height:20,
                                      width:20,
                                      mx:.5
                                    }}
                                  >
                                    <PlayForWork sx={{fontSize:30, transform:'rotate(-90deg)'}} />
                                  </Button>
                                  
                                  <ClosetEdit
                                    closet={closet}
                                    articles={articles}
                                    handleAddSingleCategory={handleAddSingleCategory}
                                    handleRemoveSingleCategory={handleRemoveSingleCategory}
                                    theme={theme}
                                  />
                                </ReusableModalTooltip>
                              </>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Header>

    <MainWrapper
      sx={{
        mt:10,
        position:'relative'
      }}
    >
            { // Only load the UserClosets if the closet has been saved
              closetId
                ?
                  closet.articles?.length || closet.closetId
                    ? // If a closet has alread been saved to the closets
                      <Grid
                        container
                        sx={{
                          
                        }}
                      >
                          <UserClosetItem
                            closet={{
                              title:`Closet Articles`,
                              articles: closet.articles
                            }}
                            setCloset={setCloset}
                          />
                      </Grid>
                    : // If no closet is being used yet
                      <Grid
                        container
                        sx={{
                        }}
                      >
                        <UserClosets
                          closet={closet}
                          setCloset={setCloset}
                          initCloset={initCloset}
                        />
                      </Grid>
                :
                  null           
            }

    </MainWrapper>
          </Form>
        )}
      </Formik>

    </Grid>
  );
}

export default ClosetUpdateUserTemplate;

const ClosetEdit = (props) => {
  const { closet, handleAddSingleCategory, handleRemoveSingleCategory, theme } = props;
  const [twirl, setTwirl] = useState('nada');

  return (
    <Grid
      container
      sx={{
        p:4,
        background:'#f6f6f6',
        justifyContent:'center'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb:.5,
          width:'100%',
          textAlign:'center'
        }}
      >
        Action Panel
      </Typography>
      <Typography
        sx={{
          mb:2,
          fontSize:16,
          fontWeight:400,
          fontStyle:'italic',
          lineHeight:1.1,
          textAlign:'center',
          color:'#999',
          maxWidth:350
        }}
      >
        Take action to modify or add something to your new amazing closet.
      </Typography>
      <ClosetEditItem
        name="Change Category"
        currentValue={<CategoryTag category={closet.categories?.[0]} />}
        twirl={twirl}
        setTwirl={setTwirl}
      >
        <Grid
          container
        >
          <Grid
            sx={{
              display:'flex',
              alignItems:'center',
              borderRadius:2,
            }}
          >
            <Grid
              container
              sx={{
                justifyContent:'center',
                py:3
              }}
            >
              <Grid
                container
                sx={{
                  justifyContent:'center',
                  mb:2
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    width:'100%',
                    textAlign:'center'
                  }}
                >
                  Select A Category
                </Typography>
                <Typography
                  sx={{
                    fontSize:16,
                    maxWidth:240,
                    textAlign:'center',
                    lineHeight:1.2,
                    color:'#999'
                  }}
                >
                  Changes will take effect after you save the closet
                </Typography>
              </Grid>
              {categories?.map((category, index) => (
                <CategorySelectionSingleTag
                  category={category}
                  selected={false}
                  theme={theme}
                  handleAddCategory={handleAddSingleCategory}
                  handleRemoveCategory={handleRemoveSingleCategory}
                />
              ))}
            </Grid>


          </Grid>
        </Grid>
      </ClosetEditItem>

    </Grid>
  )
}

const ClosetEditItem = (props) => {
  const { children, name, currentValue, twirl, setTwirl } = props;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (twirl === name) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [twirl])

  const handleClick = () => {
    if (twirl) {
      if (twirl === name) {
        setTwirl('nada');
      } else {
        setTwirl(name);
      }
    } else {
      setEdit(!edit);
    }
  }

  return (
    <Grid
      container
      sx={{
        background:'#fff',
        boxShadow:'0 0 5px #00000030',
        px:2,
        borderRadius:2,
        mt:1
      }}
    >
      <Grid
        onClick={handleClick}
        container
        sx={{
          justifyContent:'space-between',
          alignItems:'center',
          p:1
        }}
      >
        <Grid
          sm={5}
        >
          <Typography
            sx={{
              fontWeight:500
            }}
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          sm={6}
        >
          <Typography>
            {currentValue}
          </Typography>
        </Grid>
        <Grid
          sm={1}
        >
          <>
            <Box
              sx={{
                position:'relative',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                p:1,
                cursor:'pointer',
                transform: edit ? 'rotate(90deg)' : 'rotate(0deg)',
                transition:'.4s'
              }}
            >
              <PlayForWork
                sx={{
                  position:'absolute',
                  fontSize:34,
                  opacity: edit ? 0 : 1,
                  transform:'rotate(-90deg)',
                  transition:'.2s'
                }}
              />
              <KeyboardArrowRight
                sx={{
                  position:'absolute',
                  fontSize:30,
                  opacity: edit ? 1 : 0,
                  transition:'.2s'
                }}
              />
            </Box>
          </>
        </Grid>
      </Grid>
      <Collapse
        in={edit}
        sx={{
          width:'100%'
        }}
      >
        <Grid
          sx={{
            p:2,
            borderTop:'1px solid #ccc'
          }}
        >
          {children}
        </Grid>
      </Collapse>
    </Grid>
  )
}
