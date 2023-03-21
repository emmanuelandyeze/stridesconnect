import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'lib/routes';
import './style.css';

import 'medium-editor/dist/css/themes/default.css';

function App() {
	return (
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
