import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';

import { render } from '@testing-library/react';
import { vi, expect } from 'vitest'



const { spyOn } = vi;

spyOn( window, 'fetch' ).mockImplementation( () => {
  return Promise.resolve( new Response( '{"data": "mocked response"}', {
    status: 200,
    headers: {
      'Content-type': 'application/json'
    }
  } ) );
} );

export const customRender = ( ui: ReactNode ) =>
  render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        {ui}
      </I18nextProvider>
    </BrowserRouter>
  )

export const mockupEmptyFunction = () => {
  // Do nothing
}

export const testRender = ( Ui: React.FC, title: string ) => {
  test( title, () => {
    const { container } = customRender( <Ui /> );
    expect( container ).toMatchSnapshot();
  }
  );
}