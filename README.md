we past the product with an id and wrap the productdetails in the children then we are using the useParams to get each products details page.
productlist is nested inside Products.js pages
Product in products folder is nested inside productlist on same folder
the helpers.js was use to filter the featuredProduct and pas to the context then use in the productList that was nested in side the home and was past as props

CLOUDINARY_NAME = "dwzdmge1t"
CLOUDINARY_KEY = "171741871989757"
CLOUDINARY_SECRET = "SBiCuwjYVQ_IuTeoZPOhYVwXmDY"

{
"provider": "cloudinary",
"providerOptions": {
"cloud_name": "dwzdmge1t",
"api_key": "171741871989757",
"api_secret": "SBiCuwjYVQ_IuTeoZPOhYVwXmDY"
}
}

"use strict";
const stripe = require("stripe")(
"sk_test_51HLCHcJHCt1bt1QTVWBAwPZ5uY1v3fM3xSYt35qIKZqL1i3yXXqDi50kCgwGDd29Tg8Etnd1dKDznImH0HycbmUW00S3oeJQQj"
);

/\*\*

- Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
- to customize this controller
  \*/

module.exports = {
create: async (ctx) => {
const { name, total, items, stripeTokenId } = ctx.request.body;
const { id } = ctx.state.user;

    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: "usd",
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
    });
    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id,
    });
    return order;

},
};
# phone-store
