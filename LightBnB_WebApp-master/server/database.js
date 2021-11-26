const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool, Client } = require('pg');

const config = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
}
const pool = new Pool(config);

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(` 
  SELECT * 
  FROM users
  WHERE users.email = $1
  `,[email])
  .then(result => {
    if(result.rowCount === 0) {
      return null
    }
    return result.rows[0]
  })
  .catch(err => console.log(err.message));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(` 
  SELECT * 
  FROM users
  WHERE users.id = $1;
  `,[id])
  .then(result => {
    if(result.rowCount === 0) {
      return null
    }
    return result.rows[0]
  })
  .catch(err => console.log(err.message));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const {name, email, password} = user;
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [name, email, password])
  .then(res =>  res.rows[0])
  .catch(err => console.log(err.message));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT  properties.*, reservations.*, AVG(property_reviews.rating) as average_rating
  FROM reservations
  LEFT JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON reservation_id = reservations.id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  LIMIT $2
  `, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => console.log('err', err))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  //owner
  if(options.owner_id){
    queryParams.push(options.owner_id);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }

  //min and max
  if(options.minimum_price_per_night){
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    queryString += `AND properties.cost_per_night >= $${queryParams.length} `;
  }
  if(options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
  }
  if(options.minimum_rating){
    queryParams.push(Number(options.minimum_rating));
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  }
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
 
  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const { owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms} = property;
 
  return pool.query(`
  INSERT INTO properties
  ( owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
    )
    VALUES 
    (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14
    )
    RETURNING *
  `, [ owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night * 100,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms])
    .then(res => {
      return  res.rows[0];
    }
     )
    .catch(err => console.log('err:', err));
}
exports.addProperty = addProperty;



