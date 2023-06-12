export const LOCAL_HOST: string = 'http://192.168.1.178:1108'

//API for all products
export const ALL_PRODUCTS = `${LOCAL_HOST}/products`;
export const ADVERTISEMENTS =  `${LOCAL_HOST}/advertisements`;
export const VENDORS =  `${LOCAL_HOST}/vendors`;

//API for filtering the products based on price and rating.
export const FILTERS =  `${LOCAL_HOST}/products/filters`;

//API for Email subscribe
export const SIGNUP_FOOTER =  `${LOCAL_HOST}/subscribe`;

//API for user Authentication
export const USER_REGISTRATION = `${LOCAL_HOST}/register`
export const USER_LOGIN = `${LOCAL_HOST}/login`;
export const USER_LOGOUT = `${LOCAL_HOST}/logout`;

//API for user Cart products
export const CART_PRODUCTS = `${LOCAL_HOST}/products/cart`;
export const REMOVE_CART = `${LOCAL_HOST}/products/cart/remove`;
export const ADD_TO_CART = `${LOCAL_HOST}/products/cart`;

//API for Favorites Products
export const FAVORITE_PRODUCTS = `${LOCAL_HOST}/products/favorite`;
export const ADD_TO_FAVORITE = `${LOCAL_HOST}/products/favorite`;
export const REMOVE_FAVORITE = `${LOCAL_HOST}/products/favorite/remove`;

// API for reviews
export const ADD_REVIEW = `${LOCAL_HOST}/products/review`;

//API for user Address 

export const ADDRESS_LIST = `${LOCAL_HOST}/address`;
export const ADD_ADDRESS = `${LOCAL_HOST}/address/add`;
export const REMOVE_ADDRESS = `${LOCAL_HOST}/address/remove`;

