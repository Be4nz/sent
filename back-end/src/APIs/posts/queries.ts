const getAllPosts = `SELECT * FROM posts`;

const getPostById = `SELECT * FROM posts WHERE id = ?`;

const addPost = `INSERT INTO posts (text) VALUES (?)`;

export default { getAllPosts, getPostById, addPost };
