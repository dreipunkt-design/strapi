import type { Schema, Attribute } from '@strapi/strapi';

export interface ProjectImageFullscreen extends Schema.Component {
  collectionName: 'components_shared_image_fullscreens';
  info: {
    displayName: 'image_fullscreen';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
  };
}

export interface ProjectImagesSingleColumns extends Schema.Component {
  collectionName: 'components_project_images_single_columns';
  info: {
    displayName: 'images_single_columns';
    description: '';
  };
  attributes: {
    center: Attribute.Media;
  };
}

export interface ProjectImagesTwoColumns extends Schema.Component {
  collectionName: 'components_project_images_two_columns';
  info: {
    displayName: 'images_two_columns';
  };
  attributes: {
    left: Attribute.Media & Attribute.Required;
    right: Attribute.Media & Attribute.Required;
  };
}

export interface ProjectMediaFullWidth extends Schema.Component {
  collectionName: 'components_project_media_full_widths';
  info: {
    displayName: 'media_full_width';
  };
  attributes: {
    media: Attribute.Media;
  };
}

export interface ProjectProjectInformation extends Schema.Component {
  collectionName: 'components_project_project_informations';
  info: {
    displayName: 'Information';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    information: Attribute.Text;
  };
}

export interface ProjectStatement extends Schema.Component {
  collectionName: 'components_project_statements';
  info: {
    displayName: 'statement';
  };
  attributes: {
    text: Attribute.Text;
  };
}

export interface SharedClients extends Schema.Component {
  collectionName: 'components_shared_clients';
  info: {
    displayName: 'clients';
  };
  attributes: {
    list: Attribute.Text;
  };
}

export interface SharedHero extends Schema.Component {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    media: Attribute.Media;
    line1: Attribute.String;
    line2: Attribute.String;
    line3: Attribute.String;
  };
}

export interface SharedInformationHero extends Schema.Component {
  collectionName: 'components_shared_information_heroes';
  info: {
    displayName: 'InformationHero';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
  };
}

export interface SharedInformationImage extends Schema.Component {
  collectionName: 'components_shared_information_images';
  info: {
    displayName: 'InformationImage';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    description: Attribute.Text;
    image: Attribute.Media;
    ImagePos: Attribute.Enumeration<['left', 'right']>;
  };
}

export interface SharedInformation extends Schema.Component {
  collectionName: 'components_shared_information';
  info: {
    displayName: 'information';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    icon: Attribute.Media;
    link: Attribute.String;
    link_label: Attribute.String;
    mode: Attribute.Enumeration<['Standard', 'Scrub']>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
  };
}

export interface SharedServices extends Schema.Component {
  collectionName: 'components_shared_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    icon: Attribute.Media;
    title: Attribute.String;
    text: Attribute.Text;
  };
}

export interface SharedTeaserService extends Schema.Component {
  collectionName: 'components_shared_teaser_services';
  info: {
    displayName: 'TeaserService';
  };
  attributes: {
    title: Attribute.String;
    service: Attribute.String;
    image: Attribute.Media;
    referenz: Attribute.String;
    link: Attribute.String;
    link_label: Attribute.String;
    text: Attribute.Text;
  };
}

export interface TeasersTeasersColumn extends Schema.Component {
  collectionName: 'components_teasers_teasers_columns';
  info: {
    displayName: 'teasers_column';
    description: '';
  };
  attributes: {
    project: Attribute.Relation<
      'teasers.teasers-column',
      'oneToOne',
      'api::project.project'
    >;
  };
}

export interface TeasersTeasersSingleColumn extends Schema.Component {
  collectionName: 'components_teasers_teasers_single_columns';
  info: {
    displayName: 'teasers_single_column';
    description: '';
  };
  attributes: {
    center: Attribute.Component<'teasers.teasers-column', true>;
    large: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface TeasersTeasersTwoColumns extends Schema.Component {
  collectionName: 'components_teasers_teasers_two_columns';
  info: {
    displayName: 'teasers_two_columns';
  };
  attributes: {
    left: Attribute.Component<'teasers.teasers-column', true>;
    right: Attribute.Component<'teasers.teasers-column', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'project.image-fullscreen': ProjectImageFullscreen;
      'project.images-single-columns': ProjectImagesSingleColumns;
      'project.images-two-columns': ProjectImagesTwoColumns;
      'project.media-full-width': ProjectMediaFullWidth;
      'project.project-information': ProjectProjectInformation;
      'project.statement': ProjectStatement;
      'shared.clients': SharedClients;
      'shared.hero': SharedHero;
      'shared.information-hero': SharedInformationHero;
      'shared.information-image': SharedInformationImage;
      'shared.information': SharedInformation;
      'shared.seo': SharedSeo;
      'shared.services': SharedServices;
      'shared.teaser-service': SharedTeaserService;
      'teasers.teasers-column': TeasersTeasersColumn;
      'teasers.teasers-single-column': TeasersTeasersSingleColumn;
      'teasers.teasers-two-columns': TeasersTeasersTwoColumns;
    }
  }
}
