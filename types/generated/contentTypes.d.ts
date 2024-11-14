import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
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
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
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
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
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
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
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
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiAccoladeAccolade extends Schema.CollectionType {
  collectionName: 'accolades';
  info: {
    displayName: 'Accolade';
    pluralName: 'accolades';
    singularName: 'accolade';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::accolade.accolade',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::accolade.accolade',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnnualGenerationAnnualGeneration
  extends Schema.CollectionType {
  collectionName: 'annual_generations';
  info: {
    description: '';
    displayName: 'AnnualGeneration';
    pluralName: 'annual-generations';
    singularName: 'annual-generation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::annual-generation.annual-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Annual Generation Report'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::annual-generation.annual-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Year: Attribute.String & Attribute.Required;
  };
}

export interface ApiCircularCircular extends Schema.CollectionType {
  collectionName: 'circulars';
  info: {
    displayName: 'Circular';
    pluralName: 'circulars';
    singularName: 'circular';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CircularDt: Attribute.Date & Attribute.Required;
    CircularNo: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::circular.circular',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::circular.circular',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCpRuleCpRule extends Schema.CollectionType {
  collectionName: 'cp_rules';
  info: {
    description: '';
    displayName: 'CpRule';
    pluralName: 'cp-rules';
    singularName: 'cp-rule';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cp-rule.cp-rule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Dated: Attribute.Date & Attribute.Required;
    File: Attribute.Media<'files'> & Attribute.Required;
    File1: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::cp-rule.cp-rule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDailyGenerationDailyGeneration
  extends Schema.CollectionType {
  collectionName: 'daily_generations';
  info: {
    displayName: 'DailyGeneration';
    pluralName: 'daily-generations';
    singularName: 'daily-generation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::daily-generation.daily-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Dated: Attribute.Date & Attribute.Required;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Daily Generation Report'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::daily-generation.daily-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDisposalRuleDisposalRule extends Schema.CollectionType {
  collectionName: 'disposal_rules';
  info: {
    description: '';
    displayName: 'DisposalRule';
    pluralName: 'disposal-rules';
    singularName: 'disposal-rule';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::disposal-rule.disposal-rule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Dated: Attribute.Date & Attribute.Required;
    File: Attribute.Media<'files'> & Attribute.Required;
    File1: Attribute.Media<'files'> & Attribute.Private;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::disposal-rule.disposal-rule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDopRuleDopRule extends Schema.CollectionType {
  collectionName: 'dop_rules';
  info: {
    description: '';
    displayName: 'DopRules';
    pluralName: 'dop-rules';
    singularName: 'dop-rule';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dop-rule.dop-rule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Dated: Attribute.Date & Attribute.Required;
    File: Attribute.Media<'files'> & Attribute.Required;
    File1: Attribute.Media<'files'>;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dop-rule.dop-rule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiErpErp extends Schema.CollectionType {
  collectionName: 'erps';
  info: {
    displayName: 'ERP';
    pluralName: 'erps';
    singularName: 'erp';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::erp.erp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    Module: Attribute.Enumeration<['DMS', 'FICO', 'FLM', 'HCM', 'MM', 'SD']> &
      Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::erp.erp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFormForm extends Schema.CollectionType {
  collectionName: 'forms';
  info: {
    displayName: 'Form';
    pluralName: 'forms';
    singularName: 'form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::form.form', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::form.form', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiIncrementIncrement extends Schema.CollectionType {
  collectionName: 'increments';
  info: {
    description: '';
    displayName: 'Increment';
    pluralName: 'increments';
    singularName: 'increment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::increment.increment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Annual Increment @3% in their respective scale of pay'>;
    File: Attribute.Media<'files'> & Attribute.Required;
    Grade: Attribute.String & Attribute.Required;
    OrderDt: Attribute.Date & Attribute.Required;
    OrderNo: Attribute.Integer & Attribute.Required;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::increment.increment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIsoIso extends Schema.CollectionType {
  collectionName: 'isos';
  info: {
    description: '';
    displayName: 'ISO';
    pluralName: 'isos';
    singularName: 'iso';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::iso.iso', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::iso.iso', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiItPolicyItPolicy extends Schema.CollectionType {
  collectionName: 'it_policies';
  info: {
    description: '';
    displayName: 'ITPolicy';
    pluralName: 'it-policies';
    singularName: 'it-policy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category: Attribute.Enumeration<['IT ', 'Website', 'Security']> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::it-policy.it-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::it-policy.it-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMonthlyGenerationMonthlyGeneration
  extends Schema.CollectionType {
  collectionName: 'monthly_generations';
  info: {
    description: '';
    displayName: 'MonthlyGeneration';
    pluralName: 'monthly-generations';
    singularName: 'monthly-generation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::monthly-generation.monthly-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    Month: Attribute.Enumeration<
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    > &
      Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Monthly Generation Report'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::monthly-generation.monthly-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Year: Attribute.String & Attribute.Required;
  };
}

export interface ApiPromotionPromotion extends Schema.CollectionType {
  collectionName: 'promotions';
  info: {
    description: '';
    displayName: 'Promotion';
    pluralName: 'promotions';
    singularName: 'promotion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promotion.promotion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Dated: Attribute.Date & Attribute.Required;
    File: Attribute.Media<'files'> & Attribute.Required;
    Grade: Attribute.Enumeration<
      [
        'W0-W1',
        'W1-W2',
        'W2-W3',
        'W3-W5',
        'W5-W6',
        'W6-W8',
        'W8-S1',
        'S1-S2',
        'S2-S3',
        'S3-E1',
        'E1-E2',
        'E2-E3',
        'E3-E4',
        'E4-E5',
        'E5-E6',
        'E6-E7',
        'E7-E8',
        'E8-E9',
        'Existing Grade'
      ]
    > &
      Attribute.Required;
    OrderNo: Attribute.Integer & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Remarks: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Transfer and posting order uploaded'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::promotion.promotion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuarterlyGenerationQuarterlyGeneration
  extends Schema.CollectionType {
  collectionName: 'quarterly_generations';
  info: {
    description: '';
    displayName: 'QuarterlyGeneration';
    pluralName: 'quarterly-generations';
    singularName: 'quarterly-generation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quarterly-generation.quarterly-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Quarter: Attribute.Enumeration<
      ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec']
    > &
      Attribute.Required;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Quarterly Generation Report'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::quarterly-generation.quarterly-generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Year: Attribute.String & Attribute.Required;
  };
}

export interface ApiScaleBenefitScaleBenefit extends Schema.CollectionType {
  collectionName: 'scale_benefits';
  info: {
    description: '';
    displayName: 'ScaleBenefit';
    pluralName: 'scale-benefits';
    singularName: 'scale-benefit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::scale-benefit.scale-benefit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Allowed the benefit of scale of next higher grade'>;
    File: Attribute.Media<'files'>;
    Grade: Attribute.String & Attribute.Required;
    OrderDt: Attribute.Date & Attribute.Required;
    OrderNo: Attribute.Integer & Attribute.Required;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::scale-benefit.scale-benefit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSenioritySeniority extends Schema.CollectionType {
  collectionName: 'seniorities';
  info: {
    displayName: 'Seniority';
    pluralName: 'seniorities';
    singularName: 'seniority';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seniority.seniority',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    File: Attribute.Media<'files'> & Attribute.Required;
    OrderDt: Attribute.Date & Attribute.Required;
    OrderNo: Attribute.String & Attribute.Required;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::seniority.seniority',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTrainingTraining extends Schema.CollectionType {
  collectionName: 'trainings';
  info: {
    description: '';
    displayName: 'Training';
    pluralName: 'trainings';
    singularName: 'training';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::training.training',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File: Attribute.Media<'files'> & Attribute.Required;
    OrderDt: Attribute.Date & Attribute.Required;
    OrderNo: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique &
      Attribute.DefaultTo<0>;
    publishedAt: Attribute.DateTime;
    TDate: Attribute.String & Attribute.Required;
    Title: Attribute.Text & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::training.training',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTransferTransfer extends Schema.CollectionType {
  collectionName: 'transfers';
  info: {
    description: '';
    displayName: 'Transfer';
    pluralName: 'transfers';
    singularName: 'transfer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::transfer.transfer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Attribute.DefaultTo<'Click on the link below to download transfer and posting order.'>;
    File: Attribute.Media<'files', true> & Attribute.Required;
    OrderDt: Attribute.Date & Attribute.Required;
    OrderNo: Attribute.String & Attribute.Required;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::transfer.transfer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUpdateUpdate extends Schema.CollectionType {
  collectionName: 'updates';
  info: {
    description: '';
    displayName: 'Update';
    pluralName: 'updates';
    singularName: 'update';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::update.update',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Dated: Attribute.Date & Attribute.Required;
    File: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Title: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Name of the Related Parties of NEEPCO as per Companies Act, 2013'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::update.update',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVigilanceVigilance extends Schema.CollectionType {
  collectionName: 'vigilances';
  info: {
    description: '';
    displayName: 'Vigilance';
    pluralName: 'vigilances';
    singularName: 'vigilance';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vigilance.vigilance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    File1: Attribute.Media<'files'> & Attribute.Required;
    File2: Attribute.Media<'files'> & Attribute.Required;
    publishedAt: Attribute.DateTime;
    Qtr: Attribute.Enumeration<['March', 'June', 'September', 'December']> &
      Attribute.Required;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Vigilance Clearance Report'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::vigilance.vigilance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Year: Attribute.String & Attribute.Required;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
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
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
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
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
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
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
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
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
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
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
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
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
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
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
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
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
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
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    dob: Attribute.Date & Attribute.Required;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String & Attribute.Required;
    lastname: Attribute.String & Attribute.Required;
    otp: Attribute.Integer & Attribute.Private;
    otpExpiry: Attribute.DateTime & Attribute.Private;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::accolade.accolade': ApiAccoladeAccolade;
      'api::annual-generation.annual-generation': ApiAnnualGenerationAnnualGeneration;
      'api::circular.circular': ApiCircularCircular;
      'api::cp-rule.cp-rule': ApiCpRuleCpRule;
      'api::daily-generation.daily-generation': ApiDailyGenerationDailyGeneration;
      'api::disposal-rule.disposal-rule': ApiDisposalRuleDisposalRule;
      'api::dop-rule.dop-rule': ApiDopRuleDopRule;
      'api::erp.erp': ApiErpErp;
      'api::form.form': ApiFormForm;
      'api::increment.increment': ApiIncrementIncrement;
      'api::iso.iso': ApiIsoIso;
      'api::it-policy.it-policy': ApiItPolicyItPolicy;
      'api::monthly-generation.monthly-generation': ApiMonthlyGenerationMonthlyGeneration;
      'api::promotion.promotion': ApiPromotionPromotion;
      'api::quarterly-generation.quarterly-generation': ApiQuarterlyGenerationQuarterlyGeneration;
      'api::scale-benefit.scale-benefit': ApiScaleBenefitScaleBenefit;
      'api::seniority.seniority': ApiSenioritySeniority;
      'api::training.training': ApiTrainingTraining;
      'api::transfer.transfer': ApiTransferTransfer;
      'api::update.update': ApiUpdateUpdate;
      'api::vigilance.vigilance': ApiVigilanceVigilance;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
