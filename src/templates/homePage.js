import React from "react"
import { graphql } from "gatsby"
import { COLORS } from "../constants"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Artist,
} from "./styles/pageStyles"

const HomePage = ({ data }) => {
  const {
    frontmatter: {
      header: {
        title,
        description: headerDescription,
        picture: { image, alt },
      },
      description,
      featuredArtists: featuredArtistSlugs,
    },
  } = data.markdownRemark

  // Dirty way of getting the featured artists
  const featuredArtists = data.allMarkdownRemark.edges.map(
    ({ node }) =>
      featuredArtistSlugs.includes(node.fields.slug.replace(/\//g, "")) && {
        artist: node.frontmatter,
        slug: node.fields.slug,
      }
  )

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={image.childImageSharp.fluid} alt={alt} />
          <div className="inner-div">
            <p className="header-title">{title}</p>
            <p className="header-description">{headerDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{description}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="artists">
          <h2>Featured Artists</h2>
          <div className="artist-items">
            {featuredArtists.map(({ artist, slug }) => (
              <Artist key={slug} to={`${slug}`}>
                <Image
                  fluid={artist.profile.image.childImageSharp.fluid}
                  alt={artist.profile.alt}
                />
                <div className="artist-info">
                  <p>
                    {artist.firstName} {artist.lastName}
                  </p>
                  <p>{artist.artistName}</p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomePageTemplate {
    markdownRemark(fields: { slug: { eq: "/" } }) {
      frontmatter {
        header {
          description
          picture {
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
        description
        featuredArtists
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "artist" } } }
    ) {
      edges {
        node {
          frontmatter {
            templateKey
            artistName
            lastName
            firstName
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
          fields {
            slug
          }
        }
      }
    }
  }
`

export default HomePage
