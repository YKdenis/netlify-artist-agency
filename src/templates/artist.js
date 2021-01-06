import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./styles/artistStyles"

const ArtistTemplate = ({
  data: {
    markdownRemark: { frontmatter: artist },
  },
}) => {
  return (
    <Layout>
      <SEO title="Artist" />
      <Wrapper>
        <div className="artist-container">
          <div className="artist-image">
            <Image
              fluid={artist.profile.image.childImageSharp.fluid}
              alt={artist.profile.alt}
            />
          </div>
          <div className="artist-info">
            <h2>
              {artist.firstName} {artist.lastName}
            </h2>
            {artist.artistName ? (
              <h3>
                <span>{artist.artistName} -</span> <span>{artist.locale}</span>
              </h3>
            ) : (
              <h3>{artist.locale}</h3>
            )}
            <p className="description">{artist.description}</p>
            <p className="info">
              <strong>Email:</strong> {artist.email}
            </p>
            <p className="info">
              <strong>Phone:</strong> {artist.phone}
            </p>
            <p className="info">
              <strong>Height:</strong> {artist.height}
            </p>
            <p className="info">
              <strong>Shoe size:</strong> {artist.shoeSize}
            </p>
          </div>
        </div>
        <div className="artist-pictures">
          {artist.gallery.map((picture, i) => (
            <div key={i} className="artist-picture">
              <Image
                fluid={picture.picture.childImageSharp.fluid}
                alt={picture.alt}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default ArtistTemplate

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        artistName
        email
        description
        firstName
        gallery {
          picture {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
        height
        lastName
        locale
        phone
        shoeSize
        templateKey
        profile {
          alt
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
