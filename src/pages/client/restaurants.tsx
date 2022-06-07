import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { RestaurantsPageQuery, RestaurantsPageQueryVariables } from "../../graphql/generated";

const RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage(current => current + 1)
  const onPrevPageClick = () => setPage(current => current - 1)
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    navigate({
      pathname: '/search',
      search: `?term=${searchTerm}`
    })
  }
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSearchSubmit)} className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input {...register('searchTerm', { required: true, min: 3 })} type="Search" placeholder="Search Restaurants..." className="input w-3/4 md:w-3/12 rounded border-0" />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around mx-auto max-w-xs">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100 cursor-pointer"
                    style={{ backgroundImage: `url(${category.coverImg})` }}>
                  </div>
                  <span className="mt-1 text-sm text-center font-medium cursor-pointer">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16">
            {data?.restaurants.results?.map(restaurant => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button onClick={onPrevPageClick} className="focus:outline-none font-medium text-2xl">
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button onClick={onNextPageClick} className="focus:outline-none font-medium text-2xl">&rarr;</button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
};