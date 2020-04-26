import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const getImageData = graphql`
  query MyQuery {
    allFile {
      edges {
        node {
          id
          name
          relativePath
        }
      }
    }
  }
`

const renderImages = images => {
  return images.map(({ node: { id, name, relativePath } }) => {
    return (
      <li key={id}>
        <span>name: {name} </span>
        <span>path: {relativePath}</span>
      </li>
    )
  })
}

const SecondPage = () => {
  const data = useStaticQuery(getImageData)
  const images = data.allFile.edges
  return <ul>{renderImages(images)}</ul>
}

export default SecondPage
