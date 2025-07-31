import { JSX } from 'react';

import { PageContent } from '../../../../models/Feature.Blog Module.Model';
import { ComponentProps, ComponentWithContextProps } from 'lib/component-props';
import { DateField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { format } from 'date-fns';
import { container } from 'assets/tailwindcss';
import { FieldValue } from 'src/utils/blogListType';
type BlogTitleProps = ComponentProps & PageContent.BlogTitle & ComponentWithContextProps;

export const formatDate = (date?: Date | null): string =>
  date ? format(date, 'MMMM dd, yyyy') : '';
export const Default = (props: BlogTitleProps): JSX.Element => {
  const publishDate = props.sitecoreContext.route?.fields?.publishDate as FieldValue<string>;

  return (
    <div className={`flex flex-col ${container()} my-5 bg-gray-500 text-white`}>
      <div className="p-6">
        <div className="text-start text-2xl font-bold md:text-4xl">
          <Text field={props.fields?.title} />
        </div>
        <div className="flex justify-start gap-x-5 text-sm md:text-lg">
          <span className="font-bold">
            <Text field={props.fields?.author?.fields.fullName as TextField} />
          </span>

          <span className="font-bold">
            {publishDate && <DateField field={publishDate} render={(date) => formatDate(date)} />}
          </span>
        </div>
      </div>
    </div>
  );
};
