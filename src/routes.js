import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const HomePage = Loadable(lazy(() => import('./pages/HomePage')));
const LandingPage = Loadable(lazy(() => import('./pages/LandingPage')));
const LoginPage = Loadable(lazy(() => import('./pages/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('./pages/RegisterPage')));

const ClosetUpdatePage = Loadable(lazy(() => import('./pages/ClosetUpdatePage')));
const CategoryUpdatePage = Loadable(lazy(() => import('./pages/CategoryUpdatePage')));
const ArticleUpdatePage = Loadable(lazy(() => import('./pages/ArticleUpdatePage')));
const ArticleDetailsPage = Loadable(lazy(() => import('./pages/ArticleDetailsPage')));
const CalendarUpdatePage = Loadable(lazy(() => import('./pages/CalendarUpdatePage')));
const CalendarDetailsPage = Loadable(lazy(() => import('./pages/CalendarDetailsPage')));

const ClosetPage = Loadable(lazy(() => import('./pages/ClosetPage')));
const ClosetsPage = Loadable(lazy(() => import('./pages/ClosetsPage')));
const CategoryPage = Loadable(lazy(() => import('./pages/CategoryPage')));
const CategoriesPage = Loadable(lazy(() => import('./pages/CategoriesPage')));
const ArticlePage = Loadable(lazy(() => import('./pages/ArticlePage')));
const ArticlesPage = Loadable(lazy(() => import('./pages/ArticlesPage')));
const CalendarPage = Loadable(lazy(() => import('./pages/CalendarPage')));
const CameraPage = Loadable(lazy(() => import('./pages/CameraPage')));
const FeedbackPanelPage = Loadable(lazy(() => import('./pages/FeedbackPanelPage')));
const SupportPage = Loadable(lazy(() => import('./pages/SupportPage')));

const UserPage = Loadable(lazy(() => import('./pages/UserPage')));

export const userRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/home', element: <HomePage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <RegisterPage /> },
  { path: 'support', element: <SupportPage /> },
  { path: 'users/:userId', element: <UserPage />},
  { path: 'create-closet', element: <ClosetUpdatePage /> },
  { path: 'update-closet/:closetId', element: <ClosetUpdatePage /> },
  { path: 'create-calendar', element: <CalendarUpdatePage /> },
  { path: 'update-calendar/:calendarId', element: <CalendarUpdatePage /> },
  { path: 'create-category', element: <CategoryUpdatePage /> },
  { path: 'update-category/:categoryId', element: <CategoryUpdatePage /> },
  { path: 'create-article', element: <ArticleUpdatePage /> },
  { path: 'update-article/:articleId', element: <ArticleUpdatePage /> },
  { path: 'article-details/:articleId', element: <ArticleDetailsPage /> },
  { path: 'article/:articleId', element: <ArticlePage />},
  { path: 'create-poll', element: <PollUpdatePage /> },
  { path: 'closet/:closetId', element: <ClosetPage />},
  { path: 'closets', element: <ClosetsPage />},
  { path: 'category', element: <CategoryPage />},
  { path: 'categories', element: <CategoriesPage />},
  { path: 'articles', element: <ArticlesPage />},
  { path: 'calendar', element: <CalendarPage />},
  { path: 'calendar-details/:calendarId', element: <CalendarDetailsPage /> },
  { path: 'camera', element: <CameraPage />},
  { path: 'feedback', element: <FeedbackPanelPage />},
  { path: 'notes', element: <LogNotesPage />},
  {
    path: '/*', element: <LandingPage />
  }
];
