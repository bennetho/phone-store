import url from './URL';

export function flattenProducts(data) {
  return data.map((item) => {
    // console.log(item);
    //cloud
    let image = (item.image && item.image[0].url) || null;
    // localno deploy

    // let image = `${url}${item.image[0].url}`;
    return { ...item, image };
  });
}

//-------------------- helper functions-------------//
export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}

//----------------------paginate or page-------------//
export function paginate(products) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  //his will mute the state
  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0,itemsPerPage);
  // });

  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  //our code
  return newProducts;
}
