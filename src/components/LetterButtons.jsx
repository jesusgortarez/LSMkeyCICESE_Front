import React from 'react';
import { Button } from 'semantic-ui-react';

const LetterButtons = ({ letras, onSelectLetter }) => {
	return (
		<div className='letterButtons'>
			{letras.map((letra) => (
				<div key={letra}>
					<Button
						color='blue'
						size='medium'
						onClick={() => onSelectLetter(letra)}
					>
						{letra}
					</Button>
				</div>
			))}
		</div>
	);
};

export default LetterButtons;
