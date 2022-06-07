import React from 'react'
import { render, screen } from '@testing-library/react'
import { Restaurant } from '../restaurant'
import { BrowserRouter } from 'react-router-dom'

describe('<Restaurant />', () => {
  it('renders OK with props', () => {
    const restaurantProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImg: "lala"
    }
    const { container: { firstChild } } = render(
      <BrowserRouter>
        <Restaurant {...restaurantProps} />
      </BrowserRouter>
    )
    screen.getByText(restaurantProps.name)
    screen.getByText(restaurantProps.categoryName)
    expect(firstChild).toHaveAttribute('href', `/restaurants/${restaurantProps.id}`)
  })
})