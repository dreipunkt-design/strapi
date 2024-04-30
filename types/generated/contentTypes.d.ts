import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewNew extends Schema.CollectionType {
  collectionName: 'news';
  info: {
    singularName: 'new';
    pluralName: 'news';
    displayName: 'New';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    datum: Attribute.Date;
    titel: Attribute.String;
    info: Attribute.Text;
    image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::new.new', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::new.new', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPageAgencyPageAgency extends Schema.SingleType {
  collectionName: 'page_agencies';
  info: {
    singularName: 'page-agency';
    pluralName: 'page-agencies';
    displayName: 'PageAgency';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seo: Attribute.Component<'shared.seo'>;
    hero: Attribute.Component<'shared.information-hero'>;
    image: Attribute.Component<'project.image-fullscreen'>;
    information: Attribute.Component<'shared.information-image', true>;
    services: Attribute.Component<'shared.services', true>;
    clients: Attribute.Component<'shared.clients', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-agency.page-agency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-agency.page-agency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageHomePageHome extends Schema.SingleType {
  collectionName: 'page_homes';
  info: {
    singularName: 'page-home';
    pluralName: 'page-homes';
    displayName: 'PageHome';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seo: Attribute.Component<'shared.seo'>;
    projects: Attribute.DynamicZone<
      ['teasers.teasers-single-column', 'teasers.teasers-two-columns']
    >;
    hero: Attribute.Component<'shared.hero'>;
    about_quote: Attribute.Component<'shared.information'>;
    service_quote: Attribute.Component<'shared.information'>;
    services: Attribute.Component<'shared.teaser-service', true>;
    agentur: Attribute.Component<'project.image-fullscreen'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-home.page-home',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-home.page-home',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageServicesPageServices extends Schema.SingleType {
  collectionName: 'page_servicess';
  info: {
    singularName: 'page-services';
    pluralName: 'page-servicess';
    displayName: 'PageServices';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-services.page-services',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-services.page-services',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageWorkPageWork extends Schema.SingleType {
  collectionName: 'page_works';
  info: {
    singularName: 'page-work';
    pluralName: 'page-works';
    displayName: 'PageWork';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seo: Attribute.Component<'shared.seo'>;
    projects: Attribute.DynamicZone<
      ['teasers.teasers-single-column', 'teasers.teasers-two-columns']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-work.page-work',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-work.page-work',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    slug: Attribute.UID<'api::project.project', 'title'>;
    mainimage: Attribute.Media;
    web: Attribute.String;
    logo: Attribute.Media;
    thumb: Attribute.Media;
    services: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::service.service'
    >;
    mainimagePhone: Attribute.Media;
    sort: Attribute.Integer;
    format: Attribute.Enumeration<['quer', 'hoch']>;
    position: Attribute.Enumeration<['links', 'rechts']>;
    size: Attribute.Enumeration<
      ['gross', 'grossMehrzeilig', 'mittel', 'mittelMehrZeilig', 'klein']
    >;
    margin: Attribute.Enumeration<['ja', 'nein']>;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectAlfixProjectAlfix extends Schema.SingleType {
  collectionName: 'project_alfixes';
  info: {
    singularName: 'project-alfix';
    pluralName: 'project-alfixes';
    displayName: 'ProjectAlfix';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-alfix.project-alfix',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-alfix.project-alfix',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectArtDeLuxProjectArtDeLux extends Schema.SingleType {
  collectionName: 'project_art_de_luxes';
  info: {
    singularName: 'project-art-de-lux';
    pluralName: 'project-art-de-luxes';
    displayName: 'ProjectArtDeLux';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-art-de-lux.project-art-de-lux',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-art-de-lux.project-art-de-lux',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectBehzadiPartnerArchitektenBdaProjectBehzadiPartnerArchitektenBda
  extends Schema.SingleType {
  collectionName: 'project_behzadi_partner_architekten_bdas';
  info: {
    singularName: 'project-behzadi-partner-architekten-bda';
    pluralName: 'project-behzadi-partner-architekten-bdas';
    displayName: 'ProjectBehzadiPartnerArchitektenBda';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-behzadi-partner-architekten-bda.project-behzadi-partner-architekten-bda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-behzadi-partner-architekten-bda.project-behzadi-partner-architekten-bda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectCaplogXProjectCaplogX extends Schema.SingleType {
  collectionName: 'project_caplog_xes';
  info: {
    singularName: 'project-caplog-x';
    pluralName: 'project-caplog-xes';
    displayName: 'ProjectCaplogX';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-caplog-x.project-caplog-x',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-caplog-x.project-caplog-x',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectColliersProjectColliers extends Schema.SingleType {
  collectionName: 'project_collierss';
  info: {
    singularName: 'project-colliers';
    pluralName: 'project-collierss';
    displayName: 'ProjectColliers';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-colliers.project-colliers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-colliers.project-colliers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectDieMeeranerProjectDieMeeraner
  extends Schema.SingleType {
  collectionName: 'project_die_meeraners';
  info: {
    singularName: 'project-die-meeraner';
    pluralName: 'project-die-meeraners';
    displayName: 'ProjectDieMeeraner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-die-meeraner.project-die-meeraner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-die-meeraner.project-die-meeraner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectEditionPetersProjectEditionPeters
  extends Schema.SingleType {
  collectionName: 'project_edition_peterss';
  info: {
    singularName: 'project-edition-peters';
    pluralName: 'project-edition-peterss';
    displayName: 'ProjectEditionPeters';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-edition-peters.project-edition-peters',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-edition-peters.project-edition-peters',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectGeorgFischerProjectGeorgFischer
  extends Schema.SingleType {
  collectionName: 'project_georg_fischers';
  info: {
    singularName: 'project-georg-fischer';
    pluralName: 'project-georg-fischers';
    displayName: 'ProjectGeorgFischer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-georg-fischer.project-georg-fischer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-georg-fischer.project-georg-fischer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectGrkGruppeProjectGrkGruppe extends Schema.SingleType {
  collectionName: 'project_grk_gruppes';
  info: {
    singularName: 'project-grk-gruppe';
    pluralName: 'project-grk-gruppes';
    displayName: 'ProjectGrkGruppe';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-grk-gruppe.project-grk-gruppe',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-grk-gruppe.project-grk-gruppe',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectGumpertProjectGumpert extends Schema.SingleType {
  collectionName: 'project_gumperts';
  info: {
    singularName: 'project-gumpert';
    pluralName: 'project-gumperts';
    displayName: 'ProjectGumpert';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-gumpert.project-gumpert',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-gumpert.project-gumpert',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectHansHeinzeProjectHansHeinze
  extends Schema.SingleType {
  collectionName: 'project_hans_heinzes';
  info: {
    singularName: 'project-hans-heinze';
    pluralName: 'project-hans-heinzes';
    displayName: 'ProjectHansHeinze';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-hans-heinze.project-hans-heinze',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-hans-heinze.project-hans-heinze',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectHeckertSolarProjectHeckertSolar
  extends Schema.SingleType {
  collectionName: 'project_heckert_solars';
  info: {
    singularName: 'project-heckert-solar';
    pluralName: 'project-heckert-solars';
    displayName: 'ProjectHeckertSolar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-heckert-solar.project-heckert-solar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-heckert-solar.project-heckert-solar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectHotelHiemannProjectHotelHiemann
  extends Schema.SingleType {
  collectionName: 'project_hotel_hiemanns';
  info: {
    singularName: 'project-hotel-hiemann';
    pluralName: 'project-hotel-hiemanns';
    displayName: 'ProjectHotelHiemann';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-hotel-hiemann.project-hotel-hiemann',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-hotel-hiemann.project-hotel-hiemann',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectInterieursalonProjectInterieursalon
  extends Schema.SingleType {
  collectionName: 'project_interieursalons';
  info: {
    singularName: 'project-interieursalon';
    pluralName: 'project-interieursalons';
    displayName: 'ProjectInterieursalon';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-interieursalon.project-interieursalon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-interieursalon.project-interieursalon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectKlmArchitektenProjectKlmArchitekten
  extends Schema.SingleType {
  collectionName: 'project_klm_architektens';
  info: {
    singularName: 'project-klm-architekten';
    pluralName: 'project-klm-architektens';
    displayName: 'ProjectKlmArchitekten';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-klm-architekten.project-klm-architekten',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-klm-architekten.project-klm-architekten',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectMitsubishiHitachiPowerSystemsProjectMitsubishiHitachiPowerSystems
  extends Schema.SingleType {
  collectionName: 'project_mitsubishi_hitachi_power_systemss';
  info: {
    singularName: 'project-mitsubishi-hitachi-power-systems';
    pluralName: 'project-mitsubishi-hitachi-power-systemss';
    displayName: 'ProjectMitsubishiHitachiPowerSystems';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-mitsubishi-hitachi-power-systems.project-mitsubishi-hitachi-power-systems',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-mitsubishi-hitachi-power-systems.project-mitsubishi-hitachi-power-systems',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectMoreveProjectMoreve extends Schema.SingleType {
  collectionName: 'project_moreves';
  info: {
    singularName: 'project-moreve';
    pluralName: 'project-moreves';
    displayName: 'ProjectMoreve';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-moreve.project-moreve',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-moreve.project-moreve',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectOncosachsPharmaProjectOncosachsPharma
  extends Schema.SingleType {
  collectionName: 'project_oncosachs_pharmas';
  info: {
    singularName: 'project-oncosachs-pharma';
    pluralName: 'project-oncosachs-pharmas';
    displayName: 'ProjectOncosachsPharma';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-oncosachs-pharma.project-oncosachs-pharma',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-oncosachs-pharma.project-oncosachs-pharma',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectOpheoSolutionsProjectOpheoSolutions
  extends Schema.SingleType {
  collectionName: 'project_opheo_solutionss';
  info: {
    singularName: 'project-opheo-solutions';
    pluralName: 'project-opheo-solutionss';
    displayName: 'ProjectOpheoSolutions';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-opheo-solutions.project-opheo-solutions',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-opheo-solutions.project-opheo-solutions',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectPrimaerImmobilienProjectPrimaerImmobilien
  extends Schema.SingleType {
  collectionName: 'project_primaer_immobiliens';
  info: {
    singularName: 'project-primaer-immobilien';
    pluralName: 'project-primaer-immobiliens';
    displayName: 'ProjectPrimaerImmobilien';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-primaer-immobilien.project-primaer-immobilien',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-primaer-immobilien.project-primaer-immobilien',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectRevierkampfProjectRevierkampf
  extends Schema.SingleType {
  collectionName: 'project_revierkampfs';
  info: {
    singularName: 'project-revierkampf';
    pluralName: 'project-revierkampfs';
    displayName: 'ProjectRevierkampf';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-revierkampf.project-revierkampf',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-revierkampf.project-revierkampf',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectRiverparkLassalleProjectRiverparkLassalle
  extends Schema.SingleType {
  collectionName: 'project_riverpark_lassalles';
  info: {
    singularName: 'project-riverpark-lassalle';
    pluralName: 'project-riverpark-lassalles';
    displayName: 'ProjectRiverparkLassalle';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.project-information',
        'project.media-full-width'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-riverpark-lassalle.project-riverpark-lassalle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-riverpark-lassalle.project-riverpark-lassalle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectSlfProjectSlf extends Schema.SingleType {
  collectionName: 'project_slves';
  info: {
    singularName: 'project-slf';
    pluralName: 'project-slves';
    displayName: 'ProjectSlf';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-slf.project-slf',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-slf.project-slf',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectSlfFraureuthProjectSlfFraureuth
  extends Schema.SingleType {
  collectionName: 'project_slf_fraureuths';
  info: {
    singularName: 'project-slf-fraureuth';
    pluralName: 'project-slf-fraureuths';
    displayName: 'ProjectSlfFraureuth';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-slf-fraureuth.project-slf-fraureuth',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-slf-fraureuth.project-slf-fraureuth',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectUlrichOptikProjectUlrichOptik
  extends Schema.SingleType {
  collectionName: 'project_ulrich_optiks';
  info: {
    singularName: 'project-ulrich-optik';
    pluralName: 'project-ulrich-optiks';
    displayName: 'ProjectUlrichOptik';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-ulrich-optik.project-ulrich-optik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-ulrich-optik.project-ulrich-optik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectWasmeierImmobilienProjectWasmeierImmobilien
  extends Schema.SingleType {
  collectionName: 'project_wasmeier_immobiliens';
  info: {
    singularName: 'project-wasmeier-immobilien';
    pluralName: 'project-wasmeier-immobiliens';
    displayName: 'ProjectWasmeierImmobilien';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    title: Attribute.String;
    details: Attribute.DynamicZone<
      [
        'project.images-single-columns',
        'project.images-two-columns',
        'project.statement',
        'project.image-fullscreen',
        'project.media-full-width',
        'project.project-information'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-wasmeier-immobilien.project-wasmeier-immobilien',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-wasmeier-immobilien.project-wasmeier-immobilien',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    projects: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::project.project'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::new.new': ApiNewNew;
      'api::page-agency.page-agency': ApiPageAgencyPageAgency;
      'api::page-home.page-home': ApiPageHomePageHome;
      'api::page-services.page-services': ApiPageServicesPageServices;
      'api::page-work.page-work': ApiPageWorkPageWork;
      'api::project.project': ApiProjectProject;
      'api::project-alfix.project-alfix': ApiProjectAlfixProjectAlfix;
      'api::project-art-de-lux.project-art-de-lux': ApiProjectArtDeLuxProjectArtDeLux;
      'api::project-behzadi-partner-architekten-bda.project-behzadi-partner-architekten-bda': ApiProjectBehzadiPartnerArchitektenBdaProjectBehzadiPartnerArchitektenBda;
      'api::project-caplog-x.project-caplog-x': ApiProjectCaplogXProjectCaplogX;
      'api::project-colliers.project-colliers': ApiProjectColliersProjectColliers;
      'api::project-die-meeraner.project-die-meeraner': ApiProjectDieMeeranerProjectDieMeeraner;
      'api::project-edition-peters.project-edition-peters': ApiProjectEditionPetersProjectEditionPeters;
      'api::project-georg-fischer.project-georg-fischer': ApiProjectGeorgFischerProjectGeorgFischer;
      'api::project-grk-gruppe.project-grk-gruppe': ApiProjectGrkGruppeProjectGrkGruppe;
      'api::project-gumpert.project-gumpert': ApiProjectGumpertProjectGumpert;
      'api::project-hans-heinze.project-hans-heinze': ApiProjectHansHeinzeProjectHansHeinze;
      'api::project-heckert-solar.project-heckert-solar': ApiProjectHeckertSolarProjectHeckertSolar;
      'api::project-hotel-hiemann.project-hotel-hiemann': ApiProjectHotelHiemannProjectHotelHiemann;
      'api::project-interieursalon.project-interieursalon': ApiProjectInterieursalonProjectInterieursalon;
      'api::project-klm-architekten.project-klm-architekten': ApiProjectKlmArchitektenProjectKlmArchitekten;
      'api::project-mitsubishi-hitachi-power-systems.project-mitsubishi-hitachi-power-systems': ApiProjectMitsubishiHitachiPowerSystemsProjectMitsubishiHitachiPowerSystems;
      'api::project-moreve.project-moreve': ApiProjectMoreveProjectMoreve;
      'api::project-oncosachs-pharma.project-oncosachs-pharma': ApiProjectOncosachsPharmaProjectOncosachsPharma;
      'api::project-opheo-solutions.project-opheo-solutions': ApiProjectOpheoSolutionsProjectOpheoSolutions;
      'api::project-primaer-immobilien.project-primaer-immobilien': ApiProjectPrimaerImmobilienProjectPrimaerImmobilien;
      'api::project-revierkampf.project-revierkampf': ApiProjectRevierkampfProjectRevierkampf;
      'api::project-riverpark-lassalle.project-riverpark-lassalle': ApiProjectRiverparkLassalleProjectRiverparkLassalle;
      'api::project-slf.project-slf': ApiProjectSlfProjectSlf;
      'api::project-slf-fraureuth.project-slf-fraureuth': ApiProjectSlfFraureuthProjectSlfFraureuth;
      'api::project-ulrich-optik.project-ulrich-optik': ApiProjectUlrichOptikProjectUlrichOptik;
      'api::project-wasmeier-immobilien.project-wasmeier-immobilien': ApiProjectWasmeierImmobilienProjectWasmeierImmobilien;
      'api::service.service': ApiServiceService;
    }
  }
}
