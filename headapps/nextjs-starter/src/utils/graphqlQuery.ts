import { gql } from 'graphql-request'

export const BLOGS_QUERY = gql`
    query ($first: Int, $after: String) {
        item(path: "{3B5ED475-61FE-4CBB-953C-0A2DC12A3342}", language: "en") {
            children(first: $first, after: $after) {
                total
                pageInfo {
                    endCursor
                    hasNext
                }
                results {
                    displayName
                    bannerImage: field(name: "bannerImage") {
                        ... on ImageField {
                            src
                            alt
                        }
                    }
                    title: field(name: "title") {
                        ... on TextField {
                            value
                        }
                    }
                    content: field(name: "content") {
                        ... on TextField {
                            value
                        }
                    }
                    publishDate: field(name: "publishDate") {
                        ... on DateField {
                            value
                        }
                    }
                    goToBlog: field(name: "goToBlog") {
                        ... on LinkField {
                            url
                            anchor
                            target
                            text
                        }
                    }
                    image: field(name: "cardImage") {
                        ... on ImageField {
                            alt
                            description
                            src
                        }
                    }
                }
            }
        }
         isArchived:field(name:"isArchived"){
          ... on CheckboxField{
            value
          }
        }
          author: field(name: "author") {
                ... on ItemField {
                    jsonValue
                }
            }
         goToBlog:field(name:"goToBlog"){
          ... on LinkField{
            url
            anchor
            target
            text
          }
        }
        cardImage:field(name:"cardImage"){
          ... on ImageField{
            alt
            description
            src
          }
        }
        }
      }
    }
`

export const BLOGS_SORT = gql`
    query BlogSearch(
        $sortOrder: OrderByDirection
        $blogFolderPath: String!
        $first: Int
        $after: String
    ) {
        search(
            where: {
                AND: [
                    { name: "_path", value: $blogFolderPath }
                    {
                        name: "_templates"
                        value: "{3CBF3CF6-40AB-4070-9610-84E9B8460FD1}"
                        operator: EQ
                    }
                    {
                        # New condition to exclude archived items
                        name: "isArchived"
                        value: "true" # Assuming the value for true is the string "true"
                        operator: NEQ # Not Equal to
                    }
                ]
            }
            orderBy: { name: "publishDate", direction: $sortOrder }
            first: $first
            after: $after
        ) {
            total
            pageInfo {
                endCursor
                hasNext
            }
            results {
                id
                displayName
                bannerImage: field(name: "bannerImage") {
                    ... on ImageField {
                        src
                        alt
                    }
                }

                title: field(name: "title") {
                    ... on TextField {
                        value
                    }
                }

                content: field(name: "content") {
                    ... on TextField {
                        value
                    }
                }

                publishDate: field(name: "publishDate") {
                    ... on DateField {
                        value
                    }
                }

                isFeatured: field(name: "isFeatured") {
                    ... on CheckboxField {
                        value
                    }
                }

                isArchived: field(name: "isArchived") {
                    ... on CheckboxField {
                        value
                    }
                }

                goToBlog: field(name: "goToBlog") {
                    ... on LinkField {
                        url
                        anchor
                        target
                        text
                    }
                }
                author: field(name: "author") {
                    ... on ItemField {
                        jsonValue
                    }
                }
                cardImage: field(name: "cardImage") {
                    ... on ImageField {
                        alt
                        description
                        src
                    }
                }
            }
        }
    }
`

export const BLOG_LIST = gql`
    query BlogSearch(
        $templateId: String
        $path: String
        $first: Int
        $after: String
        $archiveQuery: ItemSearchOperator = NEQ
        $sortOrder: OrderByDirection
    ) {
        search(
            where: {
                AND: [
                    { name: "_path", value: $path }
                    { name: "_templates", value: $templateId }
                    { name: "isArchived", value: "1", operator: $archiveQuery }
                ]
            }
            orderBy: { name: "publishDate", direction: $sortOrder }
            first: $first
            after: $after
        ) {
            total
            pageInfo {
                endCursor
                hasNext
            }
            results {
                cardImage: field(name: "cardImage") {
                    ... on ImageField {
                        src
                        alt
                    }
                }
                publishDate: field(name: "publishDate") {
                    ... on DateField {
                        value: formattedDateValue
                    }
                }
                blogTitle: field(name: "blogTitle") {
                    ... on TextField {
                        value
                    }
                }

                pageTitle: field(name: "Title") {
                    ... on TextField {
                        value
                    }
                }

                shortDescription: field(name: "shortDescription") {
                    ... on TextField {
                        value
                    }
                }

                goToBlog: url {
                    path
                }
            }
        }
    }
`

export const FEATURED_LIST = gql`
    query BlogSearch(
        $templateId: String
        $path: String
        $first: Int
        $after: String
    ) {
        search(
            where: {
                AND: [
                    { name: "_path", value: $path }
                    { name: "_templates", value: $templateId }
                    { name: "isFeatured", value: "1", operator: EQ }
                ]
            }
            first: $first
            after: $after
        ) {
            total
            pageInfo {
                endCursor
                hasNext
            }
            results {
                cardImage: field(name: "cardImage") {
                    ... on ImageField {
                        src
                        alt
                    }
                }

                blogTitle: field(name: "blogTitle") {
                    ... on TextField {
                        value
                    }
                }
                publishDate: field(name: "publishDate") {
                    ... on DateField {
                        value: formattedDateValue
                    }
                }
                pageTitle: field(name: "Title") {
                    ... on TextField {
                        value
                    }
                }

                shortDescription: field(name: "shortDescription") {
                    ... on TextField {
                        value
                    }
                }

                goToBlog: url {
                    path
                }
            }
        }
    }
`
