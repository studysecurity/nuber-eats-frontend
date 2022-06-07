import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { CategoryQuery, CategoryQueryVariables } from '../../graphql/generated';

const CATEGORY_QUERY = gql`
  query category(
    $input: CategoryInput!
  ) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`

export const Category = () => {
  const params = useParams<{ slug: string }>();
  const { data, loading } = useQuery<
    CategoryQuery,
    CategoryQueryVariables
  >(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug: params.slug ?? ''
      }
    }
  })
  // console.log(data)

  return (
    <h1>Category</h1>
  )
}