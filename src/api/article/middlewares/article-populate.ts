/**
 * `article-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  cover: {
    fields: ["url", "alternativeText"],
  },

  author: {
    populate: {
      avatar: {
        fields: ["url", "alternativeText"],
      },
    },
  },

  category: true,

  blocks: {
    on: {
      "shared.media": {
        populate: {
          file: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      "shared.quote": true,
      "shared.rich-text": true,
      "shared.seo": {
        populate: {
          shareImage: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      "shared.slider": {
        populate: {
          files: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In global-populate middleware.");
    ctx.query.populate = populate;
    await next();
  };
};
