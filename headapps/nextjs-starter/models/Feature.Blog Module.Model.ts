
/**
 * <auto-generated>
 *     This code was generated by a tool.
 *
 *     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 * </auto-generated>
 */

// @ts-ignore 
import { Field, ImageField, FileField, LinkField, Item } from '@sitecore-jss/sitecore-jss-nextjs';
// @ts-ignore 
import { Authors as SampleFeatureAuthors } from "./Sample.Feature.model"
// @ts-ignore 
import { PageContent as SampleFeaturePageContent } from "./Sample.Feature.model"
// @ts-ignore 
import { HeroBanner as SampleFeatureHeroBanner } from "./Sample.Feature.model"
// @ts-ignore 
import { Navigation as SampleFeatureNavigation } from "./Sample.Feature.model"

export namespace Authors {

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Authors/Author Folder
    */
    export type AuthorFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Authors/Author Folder
    */
    export type AuthorFolderJson =  {
        

    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Authors/Authors
    */
    export type Authors =  {
        fields?: { 
            /**
            * Represents the age field (0190c914-f0a3-4cc4-ba16-12ab94bd03c8).
            */
            age?: Field<number>;

            /**
            * Represents the fullName field (d6a68585-8e4d-4826-8f78-67bc4c7a2dff).
            */
            fullName?: Field<string>;
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Authors/Authors
    */
    export type AuthorsJson =  {
        
            /**
            * Represents the age field (0190c914-f0a3-4cc4-ba16-12ab94bd03c8).
            */
            age?: {
                jsonValue: Field<number>
            };

            /**
            * Represents the fullName field (d6a68585-8e4d-4826-8f78-67bc4c7a2dff).
            */
            fullName?: {
                jsonValue: Field<string>
            };


    }
}
export namespace PageContent {

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Page Content/Blog List Folder
    */
    export type BlogListFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Page Content/Blog List Folder
    */
    export type BlogListFolderJson =  {
        

    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Page Content/Blog Title
    */
    export type BlogTitle =  {
        fields?: { 
            /**
            * Represents the author field (8966c8ab-4084-4b25-bea1-c65702256cdb).
            */
            author?: Item;

            /**
            * Represents the title field (feb97476-c410-4511-a519-bca8e53a6fb2).
            */
            title?: Field<string>;
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Page Content/Blog Title
    */
    export type BlogTitleJson =  {
        
            /**
            * Represents the author field (8966c8ab-4084-4b25-bea1-c65702256cdb).
            */
            author?: {
                jsonValue: Item
            };

            /**
            * Represents the title field (feb97476-c410-4511-a519-bca8e53a6fb2).
            */
            title?: {
                jsonValue: Field<string>
            };


    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Page Content/Blog Title Folder
    */
    export type BlogTitleFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Page Content/Blog Title Folder
    */
    export type BlogTitleFolderJson =  {
        

    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Page Content/BlogList
    */
    export type BlogList =  {
        fields?: { 
            /**
            * Represents the pageItemCount field (6bcfe4d9-8685-42c4-b2b1-86f11a3dcab9).
            */
            pageItemCount?: Field<number>;

            /**
            * Represents the title field (8fe76788-d180-4404-a16c-394ae349efc3).
            */
            title?: Field<string>;
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Page Content/BlogList
    */
    export type BlogListJson =  {
        
            /**
            * Represents the pageItemCount field (6bcfe4d9-8685-42c4-b2b1-86f11a3dcab9).
            */
            pageItemCount?: {
                jsonValue: Field<number>
            };

            /**
            * Represents the title field (8fe76788-d180-4404-a16c-394ae349efc3).
            */
            title?: {
                jsonValue: Field<string>
            };


    }
}
export namespace HeroBanner {

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Hero Banner/Hero Banner Folder
    */
    export type HeroBannerFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Hero Banner/Hero Banner Folder
    */
    export type HeroBannerFolderJson =  {
        

    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Hero Banner/HeroBanner
    */
    export type HeroBanner =  {
        fields?: { 
            /**
            * Represents the description field (361f1036-6caf-4676-814c-1e8af220abc7).
            */
            description?: Field<string>;

            /**
            * Represents the image field (d7655917-a518-4ca0-bf15-aa72a2fea23a).
            */
            image?: ImageField;

            /**
            * Represents the title field (5e952351-69bb-4b5a-9a35-e5d8fb56f017).
            */
            title?: Field<string>;
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Hero Banner/HeroBanner
    */
    export type HeroBannerJson =  {
        
            /**
            * Represents the description field (361f1036-6caf-4676-814c-1e8af220abc7).
            */
            description?: {
                jsonValue: Field<string>
            };

            /**
            * Represents the image field (d7655917-a518-4ca0-bf15-aa72a2fea23a).
            */
            image?: {
                jsonValue: ImageField
            };

            /**
            * Represents the title field (5e952351-69bb-4b5a-9a35-e5d8fb56f017).
            */
            title?: {
                jsonValue: Field<string>
            };


    }
}
export namespace Navigation {

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Navigation/NavLink
    */
    export type NavLink =  {
        fields?: { 
            /**
            * Represents the link field (3bb0d3ea-7a6d-41d5-b86e-3ff45b87730d).
            */
            link?: LinkField;

            /**
            * Represents the title field (ad4e1976-1c4c-480a-9db5-aab351ac0c78).
            */
            title?: Field<string>;
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Navigation/NavLink
    */
    export type NavLinkJson =  {
        
            /**
            * Represents the link field (3bb0d3ea-7a6d-41d5-b86e-3ff45b87730d).
            */
            link?: {
                jsonValue: LinkField
            };

            /**
            * Represents the title field (ad4e1976-1c4c-480a-9db5-aab351ac0c78).
            */
            title?: {
                jsonValue: Field<string>
            };


    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Navigation/NavMenu
    */
    export type NavMenu =  {
        fields?: { 
            /**
            * Represents the DrawerLogo field (d96120d5-047c-4031-a430-45438df90146).
            */
            DrawerLogo?: ImageField;

            /**
            * Represents the menu field (702a38b5-691c-42a0-aa6d-9538f14c0388).
            */
            menu?: Item[];
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Navigation/NavMenu
    */
    export type NavMenuJson =  {
        
            /**
            * Represents the DrawerLogo field (d96120d5-047c-4031-a430-45438df90146).
            */
            DrawerLogo?: {
                jsonValue: ImageField
            };

            /**
            * Represents the menu field (702a38b5-691c-42a0-aa6d-9538f14c0388).
            */
            menu?: {
                jsonValue: Item[]
            };


    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Navigation/Navigation Link Folder
    */
    export type NavigationLinkFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Navigation/Navigation Link Folder
    */
    export type NavigationLinkFolderJson =  {
        

    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Navigation/Navigation List Folder
    */
    export type NavigationListFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Navigation/Navigation List Folder
    */
    export type NavigationListFolderJson =  {
        

    }
}
export namespace PageContent {

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Page Content/RichText
    */
    export type RichText =  {
        fields?: { 
            /**
            * Represents the text field (5f29d2d2-1ff8-4c58-82d4-75249082719b).
            */
            text?: Field<string>;
        }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Page Content/RichText
    */
    export type RichTextJson =  {
        
            /**
            * Represents the text field (5f29d2d2-1ff8-4c58-82d4-75249082719b).
            */
            text?: {
                jsonValue: Field<string>
            };


    }

    /**
    * Represents the template /sitecore/templates/Feature/Blog Module/Page Content/RichText Folder
    */
    export type RichTextFolder =  {
        fields?: {         }

    }

    /**
    * Represents the GraphQL template /sitecore/templates/Feature/Blog Module/Page Content/RichText Folder
    */
    export type RichTextFolderJson =  {
        

    }
}


