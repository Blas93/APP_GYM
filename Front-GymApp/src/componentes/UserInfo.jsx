import React from 'react';

export const UserInfo = ({ user }) => {
  return (
    <div>
      {user ? (
        <>
          <h2>{user.nombre}</h2>
          <p id='nombre'><span>Nombre:</span> {user.user_name}</p>
          <p id='email'><span>Email:</span> {user.email}</p>
          {/* Agrega más información del usuario según tus necesidades */}
        </>
      ) : (
        <p>No hay información de usuario disponible</p>
      )}
    </div>
  );
};
