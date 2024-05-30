import { connect, connection } from 'mongoose';

export const mongoose = {
  run: async () => {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }
      return await connect(uri);
    } catch (error) {
      console.error(error);
    }
  },

  stop: async () => {
    try {
      return await connection.destroy();
    } catch (error) {
      console.error(error);
    }
  },
};
