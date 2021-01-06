const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              templateKey
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const markdown = result.data.allMarkdownRemark.edges

    const artists = markdown.filter(
      markdown => markdown.node.frontmatter.templateKey === "artist"
    )

    const homePage = markdown.find(
      markdown => markdown.node.fields.slug === "/"
    )
    createPageTemplate(homePage, createPage, "homePage")

    artists.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${edge.node.frontmatter.templateKey}.js`
        ),
        context: {
          id,
        },
      })
    })
  })
}

const createPageTemplate = (edge, createPage, template) => {
  createPage({
    path: edge.node.fields.slug,
    component: path.resolve(path.resolve(`src/templates/${template}.js`)),
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
