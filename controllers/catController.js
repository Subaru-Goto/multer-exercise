import { tryCatch } from "../utils/tryCatch.js";
import { pool } from "../db/pool.js";

export const catController = tryCatch( async (req, res) => {
  if(!req.files) {res.send("<h2>Please upload a file</h2>");}

  let values = [];
  const insertColumns = req.files.map((file, index) => {
    let position = index * 2 + 1;
    values.push(file.originalname, file.path.replace("public", ""));
    return `($${position}, $${position + 1})`
  });

  const dynamicQuery = `
    INSERT INTO images (name, path)
    VALUES
    ${insertColumns.join(", ")}
    RETURNING *;
  `;
  const { rows: pics } = await pool.query(dynamicQuery, values);
    
  const imagePath = req.files.map(file => {
      return `<img src=${file.path.replace("public", "")} />` 
  })

  if (pics.length === 0)
   {return next({statusCode:404, message:"Failed to save files"})}
  else {
    res.send(`
      <div>
        <h2>Here's the cat pictures:</h2>
        ${imagePath.join("")}
      </div>`);
    }
  }
);