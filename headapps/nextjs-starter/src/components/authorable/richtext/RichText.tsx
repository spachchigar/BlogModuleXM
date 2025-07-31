import { JSX } from 'react';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { PageContent } from '../../../../models/Feature.Blog Module.Model';
import { ComponentProps } from 'lib/component-props';
import { container } from 'assets/tailwindcss';

type RichTextProps = ComponentProps & PageContent.RichText;

export const Default = (props: RichTextProps): JSX.Element => {
  return (
    <div className={container()}>
      <div className="p-6">
        <RichText
          field={props.fields?.text}
          className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert"
        />
      </div>
    </div>
  );
};
