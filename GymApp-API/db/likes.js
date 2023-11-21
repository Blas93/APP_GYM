const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const toggleLike = async (activityId, userId) => {
    let connection;

    try {
        connection = await getConnection();
      
        // Verificar si existe la actividad 
        const [activity] = await connection.query(
            'SELECT * FROM activities WHERE id = ?',
            [activityId]
        );
        if (!activity) {
            throw generateError('Publicación no encontrada', 404);
        }

        // Verificar si el usuario le dió like a esa actividad 
        const [[like]] = await connection.query(
            'SELECT * FROM likes WHERE user_id = ? AND activity_id = ?',
            [userId, activityId]
        );
        if (like) {
            //Si había like, lo borro 
            await connection.query(
            'DELETE FROM likes WHERE user_id = ? AND activity_id = ?',
            [userId, activityId]
            );
        } else {
            // Si no había like, lo creo
            await connection.query(
            'INSERT INTO likes (user_id, activity_id) VALUES (?, ?)',
            [userId, activityId]
            );
        }
  
        // Recupero el total de likes 
        const [[{ likes }]] = await connection.query(
            'SELECT COUNT(*) likes FROM likes WHERE activity_id = ?',
            [activityId]
        );
      return likes
    } finally {
      if (connection) connection.release();
    }  
}

module.exports = {
    toggleLike
}