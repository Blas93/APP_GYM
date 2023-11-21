//const { query } = require('express');
const { getConnection } = require('./db');

const createActivities = async (
  name,
  description,
  image,
  typology,
  muscleGroup
) => {
  let connection;

  try {
    connection = await getConnection();
    const [newActivities] = await connection.query(
      `
    INSERT INTO activities (activity_name, description, image, typology, muscle_group) VALUES(?,?,?,?,?)
    `,
      [name, description, image, typology, muscleGroup]
    );
    return newActivities.insertId;
  } finally {
    if(connection) connection.release();
  }
};

const getActivities = async (queryParams, user_id) => {
  let connection;

  try {
    const { typology, muscle_group } = queryParams;
    connection = await getConnection();

    let sqlQuery = `SELECT a.*, 
      CASE WHEN l.user_id = ? THEN true ELSE false END AS liked,
      COUNT(l.activity_id) AS totalLikes
      FROM activities a 
      LEFT JOIN likes l ON a.id = l.activity_id AND l.user_id = ?`;
    const values = [user_id, user_id];
    let clause = 'WHERE';

    if (typology) {
      sqlQuery += ` ${clause} typology LIKE ?`;
      values.push(`%${typology}%`);
      clause = 'AND';
    }

    if (muscle_group) {
      sqlQuery += ` ${clause} muscle_group LIKE ?`;
      values.push(`%${muscle_group}%`);
    }

    sqlQuery += ' GROUP BY a.id ORDER BY a.created_at DESC'

    const [activities] = await connection.query(sqlQuery, values);

    return activities;
  } finally {
    if (connection) connection.release();
  }
};

const getActivityById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [resultActivity] = await connection.query(
      `
      SELECT a.*, COUNT(l.id) likes FROM activities a LEFT JOIN likes l ON a.id = l.activity_id WHERE a.id = ? ;
      `,
      [id]
    );
    return resultActivity[0];
  } finally {
    if (connection) connection.release();
  }
};

const getActivityFavoriteListByUser = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [resultActivity] = await connection.query(
      `
      SELECT a.* FROM activities a LEFT JOIN likes l ON a.id = l.activity_id WHERE l.user_id = ? ;
      `,
      [id]
    );
    return resultActivity;
  } finally {
    if (connection) connection.release();
  } 
}

const deleteById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [resultDelete] = await connection.query(
      `
      DELETE FROM activities WHERE id = ? 
      `,
      [id]
    );
    return resultDelete;
  } finally {
   if (connection) connection.release();
  }
};

const modifyActivity = async ({
  id,
  activity_name,
  description,
  image,
  typology,
  muscle_group}
) => {
  let connection;

  try {
    connection = await getConnection();
    console.log(id);
    const [modifyActivity] = await connection.query(
      `
    UPDATE activities SET activity_name = ?, description = ?, image = ?, typology = ?, muscle_group = ? WHERE id = ?
    `,
      [activity_name, description, image, typology, muscle_group, id]
    );
    return modifyActivity;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  modifyActivity,
  deleteById,
  getActivityById,
  getActivityFavoriteListByUser,
  createActivities,
  getActivities,
};
