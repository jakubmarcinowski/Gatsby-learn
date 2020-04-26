import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

export default ({ data: { contentfulProduct }, location }) => {
  console.log(contentfulProduct)
  return (
    <Layout>
      <div>
        <p>{contentfulProduct.name}</p>
        <p>{contentfulProduct.price}</p>
        <p>{contentfulProduct.description}</p>
        <p>{contentfulProduct.createdAt}</p>
        <Img fluid={contentfulProduct.image.fluid} />
        <button
          className="snipcart-add-item"
          data-item-image={contentfulProduct.image.file.url}
          data-item-id={contentfulProduct.slug}
          data-item-price={contentfulProduct.price}
          data-item-url={location.pathname}
          data-item-name={contentfulProduct.name}
        >
          Add to cart
        </button>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      slug
      name
      price
      description
      createdAt(formatString: "YYYY DD")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`
