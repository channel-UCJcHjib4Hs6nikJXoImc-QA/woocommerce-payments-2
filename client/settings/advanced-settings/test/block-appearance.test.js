/** @format **/

/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import BlockAppearance from '../block-appearance';

describe( 'BlockAppearance', () => {
	it( 'focuses on the "custom font" input when the checkbox is checked', () => {
		render( <BlockAppearance /> );

		expect(
			screen.queryByLabelText( 'Custom font URL' )
		).not.toBeInTheDocument();

		userEvent.click( screen.getByText( 'Use a custom font' ) );
		userEvent.tab();

		expect( screen.getByLabelText( 'Custom font URL' ) ).toHaveFocus();

		userEvent.click( screen.getByText( 'Use a custom font' ) );

		expect(
			screen.queryByLabelText( 'Custom font URL' )
		).not.toBeInTheDocument();
	} );

	it( 'focuses on the "Additional CSS styling" input when the checkbox is checked', () => {
		render( <BlockAppearance /> );

		expect(
			screen.queryByLabelText( 'Additional CSS styling' )
		).not.toBeInTheDocument();

		userEvent.click( screen.getByText( 'Add CSS styling' ) );
		userEvent.tab();

		expect(
			screen.getByLabelText( 'Additional CSS styling' )
		).toHaveFocus();

		userEvent.click( screen.getByText( 'Add CSS styling' ) );

		expect(
			screen.queryByLabelText( 'Additional CSS styling' )
		).not.toBeInTheDocument();
	} );

	it( 'persists the "Additional CSS styling" and "custom font" input values when the checkbox is toggled', () => {
		render( <BlockAppearance /> );

		// make the text inputs visible
		userEvent.click( screen.getByText( 'Add CSS styling' ) );
		userEvent.click( screen.getByText( 'Use a custom font' ) );

		userEvent.type(
			screen.getByLabelText( 'Custom font URL' ),
			'https://fonts.googleapis.com/css?family=Source+Sans+Pro'
		);
		userEvent.type(
			screen.getByLabelText( 'Additional CSS styling' ),
			'.some-selector { color: blue; }'
		);

		// make the text inputs not visible
		userEvent.click( screen.getByText( 'Add CSS styling' ) );
		userEvent.click( screen.getByText( 'Use a custom font' ) );

		// make the text inputs visible again
		userEvent.click( screen.getByText( 'Add CSS styling' ) );
		userEvent.click( screen.getByText( 'Use a custom font' ) );

		// they should have some values entered
		expect( screen.getByLabelText( 'Custom font URL' ).value ).toBe(
			'https://fonts.googleapis.com/css?family=Source+Sans+Pro'
		);
		expect( screen.getByLabelText( 'Additional CSS styling' ).value ).toBe(
			'.some-selector { color: blue; }'
		);
	} );
} );
