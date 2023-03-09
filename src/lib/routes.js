import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Dashboard from 'components/dashboard';
import Create from 'components/create/Create';
import Layout from 'components/layout';
import { createBrowserRouter } from 'react-router-dom';
import Announcement from 'components/create/Announcement';
import Comments from 'components/comments';
import Profile from 'components/profile';
import Users from 'components/users/Users';
import Article from 'components/single';
import Home from 'components/Home/Home';
import Community from 'components/single/Community';

export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';

export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';
export const USERS = '/protected/users';
export const PROFILE = '/protected/profile/:id';
export const CREATE = '/protected/create';
export const ANNOUNCE = '/protected/announce';
export const COMMENT = '/protected/comments/:id';
export const COMMUNITY = '/protected/community/:id';
export const SINGLEARTICLE = '/articles/:id';

export const router = createBrowserRouter([
	{ path: ROOT, element: <Home /> },
	{ path: LOGIN, element: <Login /> },
	{ path: REGISTER, element: <Register /> },
	{
		path: SINGLEARTICLE,
		element: <Article />,
	},
	{
		path: PROTECTED,
		element: <Layout />,
		children: [
			{
				path: DASHBOARD,
				element: <Dashboard />,
			},
			{
				path: USERS,
				element: <Users />,
			},
			{
				path: PROFILE,
				element: <Profile />,
			},
			{
				path: CREATE,
				element: <Create />,
			},
			{
				path: ANNOUNCE,
				element: <Announcement />,
			},
			{
				path: COMMENT,
				element: <Comments />,
			},
			{
				path: COMMUNITY,
				element: <Community />,
			},
		],
	},
]);
