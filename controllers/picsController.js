import { pool } from "../db/pool.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getAllPics = tryCatch( async (req, res, next) => {
  const queryText = `
    SELECT *
    FROM images;`;
  const { rows: images } = await pool.query(queryText);
  if(images.length === 0) {
    return next({statusCode:404, message:"Failed to get images."});
  } else {
    const display = images.map(image => {
      return `<img src=${image.path} alt=${image.name}/>`;
    })
    res.status(200).send(`
      <h2>Uploaded images</h2>
      ${display.join('')}
    `);
  }
});