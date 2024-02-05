export const errorHandler = (err, req, res) => {
  console.log(err)
  const statusCode = err.statusCode || 500 ;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({error: message})
}   
