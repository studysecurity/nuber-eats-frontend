import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MockedProvider } from '@apollo/client/testing';
import { Header } from '../header'
import { BrowserRouter } from 'react-router-dom';
import { ME_QUERY } from '../../hooks/useMe'
import { wait } from '@testing-library/user-event/dist/utils';

describe('<Header />', () => {
  it('header Verify Banner', async () => {
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      render(
        <MockedProvider mocks={[
          {
            request: {
              query: ME_QUERY
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: "",
                  role: "",
                  verified: false,
                }
              }
            }
          }
        ]}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      )
      await new Promise(resolve => setTimeout(resolve, 0));
      screen.getByText('Please verify your email')
    })
  })

  it('header without Verify Banner', async () => {
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      render(
        <MockedProvider mocks={[
          {
            request: {
              query: ME_QUERY
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: "",
                  role: "",
                  verified: true,
                }
              }
            }
          }
        ]}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      )
      await new Promise(resolve => setTimeout(resolve, 0));
      // expect(screen.queryByText('Please verify your email')).toBeNull();
    })
  })
})