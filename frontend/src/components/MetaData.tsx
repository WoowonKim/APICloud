import React from "react";
import { Helmet } from "react-helmet-async";
interface Props {
  title: string;
  description: string;
  name: string;
}

const MetaData = ({ title, description, name }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
};

export default MetaData;
