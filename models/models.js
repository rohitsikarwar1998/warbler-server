// ========== user model ===============//

exports.userTable = `CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY key auto_increment, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    create_at TIMESTAMP DEFAULT now(), 
    password VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL UNIQUE, 
    profileImageUrl VARCHAR(255) DEFAULT 'https://i.stack.imgur.com/34AD2.jpg'
 )`;


// =====================================//

exports.blogTable = `
CREATE TABLE IF NOT EXISTS blogs(
    id INT PRIMARY key auto_increment, 
    text TEXT NOT NULL, 
    user_id INT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP, 
    FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

exports.commentTable=`
CREATE TABLE comments (
  id INT auto_increment PRIMARY key, 
  user_id INT, 
  blog_id INT, 
  text VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP, 
  FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE, 
  FOREIGN key(blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);`;

exports.savedblogsTable=`
CREATE TABLE savedblogs (
  user_id INT, 
  blog_id INT, 
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE, 
  FOREIGN key(blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);`;

exports.likes=`
CREATE TABLE likes (
  user_id INT, 
  blog_id INT,  
  FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE, 
  FOREIGN key(blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);
`;

exports.followers=`
CREATE TABLE followers (
  followee_id INT NOT NULL, 
  follower_id INT NOT NULL, 
  PRIMARY key(followee_id, follower_id), 
  FOREIGN key(followee_id) REFERENCES users(id) ON DELETE CASCADE, 
  FOREIGN key(follower_id) REFERENCES users(id) ON DELETE CASCADE
);`;