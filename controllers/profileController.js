import { pool } from "../db/pool.js";
import { tryCatch } from "../utils/tryCatch.js";

export const uploadProfilePic = tryCatch(
  async (req, res, next) => {
    if(!req.file) {res.send("<h2>Please upload a file</h2>");}

    const name = req.file.originalname;
    const path = req.file.path.replace("public", "");

    const queryText = `
      INSERT INTO images (name, path)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const { rows: pic } = await pool.query(queryText, [name, path]);
    
    if (pic.length === 0) {
      return next({statusCode: 404, message:"failed to save data"});
    } else {
      res.status(200).send(`
      <div>  
        <h2>Here's the picture:</h2>
        <img
          src= ${req.file.path.replace("public", "")}
          alt="Profile Picture"
        />
      </div>`);
    };
  }
);