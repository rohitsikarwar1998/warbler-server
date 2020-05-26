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

exports.messageTable = `
CREATE TABLE IF NOT EXISTS blogs(
    id INT PRIMARY key auto_increment, 
    text TEXT NOT NULL, 
    user_id INT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP, 
    FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;